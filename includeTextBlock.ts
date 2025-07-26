/**
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
  const insertBlockRegExp = /@include-text-block\s+([^\s]+)(?:\s+(\w+))?/g;

  // Insert the code blocks
  return text.replace(insertBlockRegExp, replaceTextBlock);
}

// replaceTextBlock does that actual replacement work with the result
// of the matched RegExp.
function replaceTextBlock(_fullMatch, filePath):string {
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
