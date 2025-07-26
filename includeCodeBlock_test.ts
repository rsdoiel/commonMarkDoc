/**
 * includeCodeBlock_test.js - this is a test program for the includeCodeBlock.js module.
 */

import { assertEquals } from "@std/assert";

import { includeCodeBlock } from "./includeCodeBlock.js";

Deno.test('test includeCodeBlock function', () => {
    const helloworldText = `

This is Hello World, included as CommonMark text.

@include-code-block helloworld.md Markdown

And now include helloworld2.md. It'll be the second \`@include-code-block\` FILENAME LANGAUGE.

@include-code-block helloworld2.md Markdown
`;
    const expected = `

This is Hello World, included as CommonMark text.

~~~Markdown
---
title: Hello World!
---

# This is a simple CommonMark text

Hello World!!!!!!

~~~

And now include helloworld2.md. It'll be the second \`@include-code-block\` FILENAME LANGAUGE.

~~~Markdown

# Second Markdown file.

Hello again!!!!

~~~
`
    const result = includeCodeBlock(helloworldText);
    console.log(result);
    assertEquals(expected,result.replace(/\r/g, ''));
});