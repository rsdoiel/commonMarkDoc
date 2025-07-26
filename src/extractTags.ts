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
 */
// Extract tags. By default it extracts HashTags. You may provide
// another prefix like '@' to extract @Tags.
export function extractTags(text: string, prefix: string = "#"): string[] {
  // Regular expression to match tags based on the prefix, including alphanumeric,
  // periods, and underscores.
  const regex = new RegExp(`${prefix}[\\w.]+`, "g");
  //const regex = new RegExp(`${prefix}[\\w.]+?(?=\\s|$|[^\\w.])`, 'g');
  const tags = text.match(regex);
  if (tags === null) {
    return [];
  }
  // Further process the tags to remove any trailing periods
  return tags.map((tag) => tag.replace(/\.$/, ""));
}

export function mergeTags(...tagLists: string[][]): string[] {
  // Use a Set to automatically handle uniqueness
  const uniqueTags = new Set<string>();

  // Iterate over each list of tags
  tagLists.forEach((tagList) => {
    // Add each tag to the Set
    tagList.forEach((tag) => uniqueTags.add(tag));
  });

  // Convert the Set back to an array and return it
  return Array.from(uniqueTags);
}
