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
