/**
 * includeCodeBlock.js is a package implementing the `@include-code-block` extension to
 * CommonMark markup.
 */

/**
 * includeCodeBlock takes a text string and replaces the code blocks
 * based on the file path included in the line and the langauge name
 * The generate code block uses the `~~~` sequence to delimit the block
 * with the language name provided in the opening delimiter.
 *
 * @param {*} text (string) to be transformed
 * @returns the transformed text as a string
 */
export function includeCodeBlock(text) {
  // Find the include-code-block directive in the page. 
  const insertBlockRegExp = /@include-code-block\s+([^\s]+)(?:\s+(\w+))?/g;

  // Insert the code blocks
  return text.replace(insertBlockRegExp, replaceCodeBlock);
}

// replaceCodeBlock does that actual replacement work with the result
// of the matched RegExp.
function replaceCodeBlock(_fullMatch, filePath, language = "") {
  const fileContent = Deno.readTextFileSync(filePath);
  if (fileContent) {
    return "~~~" + language + "\n" + fileContent + "\n~~~";
  } else {
    console.error(`Error inserting block from ${filePath}`);
    return `@include-code-block ${filePath} ${language}`;
  }
}

if (import.meta.main) {
    const text = includeCodeBlock(`HelloWorld with include-code-block

@include-code-block helloworld.md Markdown

`); 
  console.log(text);
}
