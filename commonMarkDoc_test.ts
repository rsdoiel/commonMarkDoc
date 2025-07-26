/**
 * commonMarkDoc_test.js - this is a test program for commonMarkDoc.js
 */

import { assertEquals } from "@std/assert";
import { CommonMarkDoc } from "./commonMarkDoc.js";

Deno.test('test CommonMarkDoc parse and stringity', () => {
    const cmark = new CommonMarkDoc();
    const helloworldText = `---
title: Hello World
---

# This is a simple CommonMark Document

Hello World!!!

`;
    try {
        cmark.parse(helloworldText);
    } catch (error) {
        console.error(error);
    }
    assertEquals(helloworldText.trim(), cmark.stringify());
});