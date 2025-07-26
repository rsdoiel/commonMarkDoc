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
 * includeTextBlock.ts is a package implementing the `@include-text-block` extension to
 * CommonMark markup.
 */

/**
 * includeTextBlock takes a text string and replaces the code blocks
 * based on the file path included in the line and the langauge name
 * The generate code block uses the `~~~` sequence to delimit the block
 * with the language name provided in the opening delimiter.
 *
 * @param text:string to be transformed
 * @returns the transformed text as a string
 */
export function includeTextBlock(text: string): string {
  // Find the include-text-block directive in the page.
  const insertBlockRegExp:RegExp = /@include-text-block\s+([^\s]+)(?:\s+(\w+))?/g;

  // Insert the code blocks
  return text.replace(insertBlockRegExp, replaceTextBlock);
}

// replaceTextBlock does that actual replacement work with the result
// of the matched RegExp.
function replaceTextBlock(_fullMatch: string, filePath:string):string {
  let fileContent:string = '';
  try {
    fileContent = Deno.readTextFileSync(filePath);
  } catch (error) {
    console.error(`Error inserting block from ${filePath}, ${error}`);
  }
  if (fileContent) {
    return fileContent;
  } else {
    return `@include-text-block ${filePath}`;
  }
}
