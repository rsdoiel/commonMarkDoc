/**
 * 
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
 */
import * as yaml from "@std/yaml";
import { parse as parseArgs } from "@std/flags";

import { licenseText, releaseDate, releaseHash, version } from "./version.ts";
import { fmtHelp, helpText } from "./helptext.ts";

import { extractTags, mergeTags } from "./src/extractTags.ts";
import { includeCodeBlock } from "./src/includeCodeBlock.ts";
import { includeTextBlock } from "./src/includeTextBlock.ts";
import { CommonMarkDoc } from "./src/commonMarkDoc.ts";

// Export the main CommonMarkDoc object
export { CommonMarkDoc } from "./src/commonMarkDoc.ts";


// main implements a light weight CommonMark processor
// called `cmarkprocess`. It demonstrates the features of the
// CommonMarkDoc module.
async function main() {
  const appName = "cmarkprocess";
  const args = parseArgs(Deno.args, {
    boolean: ["help", "version", "license"],
    alias: {
      h: "help",
      v: "version",
      l: "license",
    },
  });

  if (args.help) {
    console.log(fmtHelp(helpText, appName, version, releaseDate, releaseHash));
    Deno.exit(0);
  }

  if (args.version) {
    console.log(`${appName} ${version} ${releaseHash}`);
    Deno.exit(0);
  }

  if (args.license) {
    console.log(licenseText);
    Deno.exit(0);
  }

  const cmark = new CommonMarkDoc();
  const filePath = args._[0] as string;
  let text: string = "";
  if (args._.length === 0) {
    const decoder = new TextDecoder();
    for await (const chunk of Deno.stdin.readable) {
      text += decoder.decode(chunk);
    }
  } else {
    text = await Deno.readTextFile(filePath);
  }
  cmark.parse(text);
  try {
    await cmark.process();
  } catch (error) {
    console.error(`ERROR (${filePath}): ${error}`);
    Deno.exit(1);
  }
  const output = cmark.stringify();
  console.log(output);
}

if (import.meta.main) {
  await main();
}
