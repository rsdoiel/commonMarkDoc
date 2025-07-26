
// Extract tags. By default it extracts HashTags. You may provide
// another prefix like '@' to extract @Tags.
export function extractTags(text: string, prefix: string = '#'): Set<string> {
  // Regular expression to match tags with the specified prefix
  const tagRegex: RegExp = new RegExp(`(?:${prefix})([a-zA-Z0-9._]+)`, 'g');
  const tags: Set<string> = new Set();
  let match: object | null = tagRegex.exec(text);

  // Iterate over all matches
  while (match !== null) {
    // Add the matched tag with its prefix to the Set
    tags.add(`${prefix}${match[1]}`);
  }

  // Convert the Set to an Array before returning
  return tags;
}
