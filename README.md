# QuLang Documentation

Reference documentation for QuLang, a policy language for choosing
cryptographic algorithms.

The content is placeholder only for now. Pages will be filled in as the
language is finalised.

View the page at: https://bartek-pawlik.github.io/QuLang-Documentation/

## Why QuLang

Most apps name their cryptographic algorithms directly in their code, such as
RSA for signatures. When an algorithm stops being safe, every app that uses it
has to be found and changed. RSA and the other public-key algorithms in wide
use today can be broken by a large enough quantum computer, so this change is
coming for almost every app.

QuLang moves that choice out of the app. The app says what a key is for, and a
QuLang policy picks the algorithm. Before a policy is used, the `qu` tool
checks it for gaps (requests no algorithm can satisfy), conflicts (rules that
leave nothing when they apply together) and downgrades (a new version of a
policy picking a weaker algorithm).

QuLang is in early development, and its source code is not public yet.

## Layout

```
index.html          Overview
language/           Language section (one page per keyword)
catalogue/          Algorithm catalogue (to be generated from the catalogue file)
errors/             Compiler errors and checker findings
commands/           The qu command-line tool
index-all.html      A–Z index
help.html           How the documentation is organised
assets/style.css    Shared styles (light and dark)
assets/search.js    Search box and table filters
assets/logo.svg     The "Qu" icon
```

The site is plain HTML and CSS with no build step, so GitHub Pages serves it
as it is. To view it locally, open `index.html` in a browser.
