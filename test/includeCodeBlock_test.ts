/**
 * includeCodeBlock_test.ts - this is a test program for the includeCodeBlock.js module.
 */

import { assertEquals } from "@std/assert";

import { includeCodeBlock } from "../includeCodeBlock.ts";

Deno.test('test includeCodeBlock function', () => {
    const helloworldText = `

This is Hello World, included as CommonMark text.

@include-code-block test/helloworld.md Markdown

And now include helloworld2.md. It'll be the second \`@include-code-block\` FILENAME LANGAUGE.

@include-code-block test/helloworld2.md Markdown
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