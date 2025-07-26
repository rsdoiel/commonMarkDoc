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
 * extractTags_test.ts is a test of the extractTags module.
 */
import { assertEquals } from "@std/assert";
import { extractTags, mergeTags } from "../src/extractTags.ts";

const text = `This is some text with empbedded #hashtags and @tags`;

Deno.test(`test basic example`, () => {
    // Example usage:
    const text = "This is a sample text with #hash.tags and @mentions like #TypeScript and @user_123.";
    const hashTags = extractTags(text, "#");
    const mentions = extractTags(text, "@");
    const expectedHashTags = ["#hash.tags", "#TypeScript"];
    const expectedMentions = ["@mentions", "@user_123"]; 
    for (const tag of expectedHashTags) {
        assertEquals(hashTags.includes(tag), true, 
            `expected "${tag}" in ${JSON.stringify(hashTags)}, got false`);
    }
    for (const tag of expectedMentions) {
        assertEquals(mentions.includes(tag), true,
            `expected "${tag}" in ${JSON.stringify(mentions)}, got false`);
    }

    console.log("HashTags:", hashTags); // Output: ["#hash.tags", "#TypeScript"]
    console.log("Mentions:", mentions); // Output: ["@mentions", "@user_123"]
});

Deno.test('test extractTags() for hashTags', () => {
    const a: string[] = extractTags(text, '#');
    let l = a.length;
    assertEquals(l, 1, `expected length 1, got ${l} -> ${JSON.stringify(a)}`);
    assertEquals(a.includes('#hashtags'), true, `expected hashTags to include '#hashTags',got false -> ${JSON.stringify(a)}`);
});

Deno.test('test extractTags() for @Tags', () => {
    const a: string[] = extractTags(text,'@');
    let l = a.length;
    assertEquals(l, 1, `expected length 1, got ${l} -> ${JSON.stringify(a)}`);
    assertEquals(a.includes('@tags'), true, `expected atTags to include '@tags',got false -> ${JSON.stringify(a)}`);
});

Deno.test('test mergeTags()', () => {
  // Example usage:
  const tags1 = ["#hash.tags", "#TypeScript"];
  const tags2 = ["@mentions", "@user_123"];
  const tags3 = ["#TypeScript", "@user_456"];

  const tags = mergeTags(tags1, tags2, tags3);
  const expectedTags =  ["#hash.tags", "#TypeScript", "@mentions", "@user_123", "@user_456"];
  const l = tags.length;
  assertEquals(l, expectedTags.length,
    `expected length ${l} to be ${expectedTags.length} for ${JSON.stringify(tags)}`);
  for (const tag of expectedTags) {
    assertEquals(tags.includes(tag), true,
    `expected to find "${tag}" in ${JSON.stringify(tags)}`);
  }

  console.log(tags); // Output: ["#hash.tags", "#TypeScript", "@mentions", "@user_123", "@user_456"]
});
