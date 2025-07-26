/**
 * commonMarkDoc is a Deno TypeScript module for working with CommonMark documents.
 * Copyright (C) 2025 R. S. Doiel
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * @contact: rsdoiel@gmail.com
 * @issues: https://github.com/rsdoiel/commonMarkDoc/issues
 * 
 * commonMarkDoc.ts exports a class called CommonMarkDoc used to work with CommonMark documents.
 * It includes a CommonMark processor that will support additional features we need. It includes a main
 * function so it can be used as a standalone processor.
 */
import * as yaml from "@std/yaml";
import { parse as parseArgs } from "@std/flags";

import { extractTags, mergeTags } from "./extractTags.ts";
import { includeCodeBlock } from "./includeCodeBlock.ts";
import { includeTextBlock } from "./includeTextBlock.ts";

export class CommonMarkDoc {
  frontMatter: Record<string, unknown> = {};
  content: string = "";

  // Parse a CommonMark or Markdown document into content and front matter
  parse(text: string) {
    const frontMatterRegex: RegExp = /^---([\s\S]+?)---/;
    const match: Array<string> | null = text.match(frontMatterRegex) as Array<
      string
    >;

    if (match) {
      this.frontMatter = yaml.parse(match[1]) as Record<string, unknown>;
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
  process() {
    // Clone a copy of this object.
    const cmark: CommonMarkDoc = new Object(this) as CommonMarkDoc;

    // Handle included text blocks
    cmark.content = includeTextBlock(cmark.content);

    // Extract any HashTags from content
    const hashTags: string[] = extractTags(cmark.content, "#");
    const atTags: string[] = extractTags(cmark.content, "@");

    // Process our HashTags adding them to our keywords list
    if (
      cmark.frontMatter.hashTags === undefined ||
      cmark.frontMatter.hashTags === null
    ) {
      cmark.frontMatter.hashTags = [];
    }
    cmark.frontMatter.hashTags = mergeTags(cmark.frontMatter.hashTags as string[], hashTags);

    // Process our @Tags and add them to an AtTag list.
    if (
      cmark.frontMatter.atTags === undefined ||
      cmark.frontMatter.atTags === null
    ) {
      cmark.frontMatter.atTags = [];
    }
    cmark.frontMatter.atTags = mergeTags(cmark.frontMatter.atTags as string[], atTags);

    // Handle include code blocks
    cmark.content = includeCodeBlock(cmark.content);

    // We can now return the revised object.
    return cmark;
  }
}

