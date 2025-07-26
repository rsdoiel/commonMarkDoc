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
 * commonMarkDoc_test.ts - this is a test program for commonMarkDoc.ts
 */

import { assertEquals } from "@std/assert";
import { CommonMarkDoc } from "../src/commonMarkDoc.ts";

const helloworldText = `---
title: Hello World
---

# This is a simple CommonMark Document

Hello World!!! @somebody.org #HelloWorld

@include-text-block test/helloworld3.md

@include-code-block extractTags.ts JavaScript

`;

Deno.test("test CommonMarkDoc parse and stringify", () => {
  const cmark = new CommonMarkDoc();
  cmark.parse(helloworldText);
  assertEquals(helloworldText.trim(), cmark.stringify());
});

Deno.test("test CommonMarkDoc process", () => {
  const cmark = new CommonMarkDoc();
  cmark.parse(helloworldText);
  let ok: boolean = true;
  let msg: string = "";
  try {
    cmark.process();
  } catch (error) {
    console.error(error);
    ok = false;
    msg = `process failed: ${error}`;
  }
  assertEquals(ok, true, msg);
});
