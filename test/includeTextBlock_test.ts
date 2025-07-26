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
 * includeTextBlock_test.ts - this is a test program for the includeTextBlock.js module.
 */

import { assertEquals } from "@std/assert";

import { includeTextBlock } from "../src/includeTextBlock.ts";

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
