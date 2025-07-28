%cmarkprocess(1) user manual | version 0.0.2 2e109d2
% R. S. Doiel
% 2025-07-28

# NAME

cmarkprocess

# SYNOPSIS

cmarkprocess [OPTIONS] COMMONMARK_FILE

# DESCRIPTION

cmarkprocess is a CommonMark processor. It accepts CommonMark and renders CommonMark
to standard out. It implements a series of tranforms operating both on the CommonMark
content and front matter that maybe included. The transforms are as follows

`@include-text-block` `FILENAME CLASSNAME`
: This willl include the contents of FILENAME in the output of the CommonMark document.

`@include-code-block` `FILENAME [LANGUAGE]`
: This will read in a source code file and create a CommonMark code block.

HashTags and `@Tags`
: The content of the CommonMark document will be scanned for these and they will
be added to the front matter as `hashTags` and `atTags`.

# OPTIONS

Options come as the last parameter(s) on the command line.

-h, --help
: display help

-v, --version
: display version

-l, --license
: display license

# EXAMPLES

Here's an example of a CommonMark document called `helloworld.md`. 

~~~Markdown
---
title: 3rd Hello World
---

# Third Markdown file.

Hello #again!!!! I hope you are a @person!!

~~~

We can process it with the following Deno command.

~~~shell
deno run --allow-read commonMarkDoc.js helloworld.md
~~~

The transformation will be written to standard out.

~~~Markdown

~~~


