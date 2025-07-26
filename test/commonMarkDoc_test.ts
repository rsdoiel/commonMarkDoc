/**
 * commonMarkDoc_test.ts - this is a test program for commonMarkDoc.ts
 */

import { assertEquals } from "@std/assert";
import { CommonMarkDoc } from "../commonMarkDoc.ts";

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
