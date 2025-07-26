/**
 * commonMarkDoc.ts exports a class called CommonMarkDoc used to work with CommonMark documents.
 * It includes a CommonMark processor that will support additional features we need. It includes a main
 * function so it can be used as a standalone processor.
 */
import * as yaml from "@std/yaml";
import { parseArgs } from "@std/flags/parseArgs";

import { version, releaseDate, releaseHash, licenseText } from "./version.ts";
import { helpText } from "./helptext.ts";

import { extractTags} from "./extractTags.ts";
import { markdownLinkToHTML } from "./markdownLinkToHTML.ts";
import { includeCodeBlock } from "./includeCodeBlock.ts";
import { includeTextBlock } from "./includeTextBlock.ts";

export class CommonMarkDoc {
  frontMatter: Record<string,unknown> = {};
  content: string = "";

  // Parse a CommonMark or Markdown document into content and front matter
  parse(text:string) {
    const frontMatterRegex = /^---([\s\S]+?)---/;
    const match = text.match(frontMatterRegex);

    if (match) {
      this.frontMatter = yaml.parse(match[1]);
      this.content = text.slice(match[0].length).trim();
    } else {
      this.frontMatter = {};
      this.content = text;
    }
  }

  // Return this object as a CommonMark document with front matter and content.
  stringify(): string {
    if (Object.keys(this.frontMatter).length > 0) {
      return `---
${yaml.stringify(this.frontMatter)}---

${this.content}`;
    }
    return this.content;
  }

  // Process uses the existing CommonMark object to create a new one transforming the front matter
  // and content accordingly. E.g. handling HashTags, @Tags, `@include-code-block`.
  //
  // NOTE: This function uses a synchonous read to include content for code blocks. If have a slow disk
  // access or lots of included code blocks this will raise the execution time of this method.
  //
  // If a code block can't be read it will leave the `@include-code-block` text in place.
  async process() {
    // Clone a copy of this object.
    const cmark: CommonMarkDoc = new Object(this) as CommonMarkDoc;

    // Handle included text blocks
    cmark.content = includeTextBlock(cmark.content);

    // Extract any HashTags from content
    const hashTags: Set<string> = extractTags(cmark.content, "#");
    const atTags: Set<string> = extractTags(cmark.content, "@");

    // Process our HashTags adding them to our keywords list
    if (
      cmark.frontMatter.hashTags === undefined ||
      cmark.frontMatter.hashTags === null
    ) {
      cmark.frontMatter.hashTags = Set<string>;
    }
    cmark.frontMatter.hashTags = {...cmark.frontMatter.hashTags as Set<string>, ...hashTags};

    // Process our @Tags and add them to an AtTag list.
    if (
      cmark.frontMatter.atTags === undefined ||
      cmark.frontMatter.atTags === null
    ) {
      cmark.frontMatter.atTags = Set<string>;
    }
    cmark.frontMatter.atTags = {...cmark.frontMatter.atTags as Set<string>, ...atTags};

    // Handle include code blocks
    cmark.content = includeCodeBlock(cmark.content);
    
    // We can now return the revised object.
    return cmark;
  }
}

async function main() {
    const appName = 'cmarkprocess';
    const args = parseArgs(Deno.args, {
      boolean: [ "help", "version", "license"],
      alias: {
        h: "help",
        v: "version",
        l: "license",
      }
    });

    if (args.help) {
      console.log(fmtHelp(helpText, appName, version, releaseDate, releaseHash));
      Deno.exit(0);
    }

    if (args.version) {
      console.log(`${appName} ${version} ${releaseHash}`);
      Deno.exit(0);
    }

    if (args.lecense) {
      console.log(licenseText);
      Deno.exit(0);
    }

    if (args.length !== 1) {
        console.log(`USAGE: ${appName} COMMONMARK_FILE
    
    This program will process an CommonMark document interpreting 
    the following additional markup.

    - HashTags are identified and added to the front matter
    - @Tags are identified and added to the front matter
    - Text blocks can be included with the \`@include-text-block FILENAME\` syntax
    - Code blocks can be included wiht the \`@include-code-block FILENAME LANGUAGE\` syntax
    - Links to Markdown documents are transformed to links to HTML documents with the same basename

    Options:

    -h, --help
    : display help

    -l, --license
    : display license

    -v, --version
    : display version

`);
        Deno.exit(1);
    }
    const cmark = new CommonMarkDoc();
    const text = await Deno.readTextFile(args[0]);
    cmark.parse(text);
    await cmark.process();
    console.log(cmark.stringify());
}

if (import.meta.main) {
    await main();
}