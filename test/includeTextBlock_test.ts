/**
 * includeTextBlock_test.ts - this is a test program for the includeTextBlock.js module.
 */

import { assertEquals } from "@std/assert";

import { includeTextBlock } from "../includeTextBlock.ts";

Deno.test('test includeTextBlock function', () => {
    const helloworldText = `

This is Hello World, included as CommonMark text.

@include-text-block test/helloworld.md Markdown

And now include helloworld2.md. It'll be the second \`@include-text-block\` FILENAME LANGAUGE.

@include-text-block test/helloworld2.md Markdown
`;
    const expected = `

This is Hello World, included as CommonMark text.

---
title: Hello World!
---

# This is a simple CommonMark text

Hello World!!!!!!


And now include helloworld2.md. It'll be the second \`@include-text-block\` FILENAME LANGAUGE.


# Second Markdown file.

Hello again!!!!

`
    const result = includeTextBlock(helloworldText);
    console.log(result);
    assertEquals(expected,result.replace(/\r/g, ''));
});