# Netherrack docs site

The source for Netherrack's documentation site, meant to be served by GitHub Pages.
Plain HTML, CSS and JS - no build step, no framework, no dependencies.

## Deploying

1. Push this folder's contents to a repository (or a `docs/` folder, or a `gh-pages`
   branch - whichever GitHub Pages is set to serve from).
2. In the repository's **Settings -> Pages**, point it at that location.
3. That's it. `.nojekyll` tells GitHub Pages to serve the files as they are, without
   running them through Jekyll first.

## Editing

Each page is a plain `.html` file (`index.html`, `installation.html`, `commands.html`,
...). There's no templating: update the file directly, in a text editor.

- `assets/css/style.css` - all of the site's styling, including both themes.
- `assets/js/site.js` - the theme toggle, "On this page" list, heading links and the
  code-block copy buttons. The site works with this disabled too.
- `assets/img/` - the logo (light and dark) and favicon.

## Updating for a new Netherrack release

A few things are worth checking whenever Netherrack's defaults or commands change:

- `DOCS_VERSION` - the version these docs describe, shown in the footer.
- `configuration.html` - the `server.properties` and `netherrack.yml` tables, and the
  flat-preset list.
- `commands.html` - the command table and permission levels.
- `status.html` - the implemented/not-implemented lists, kept in step with the
  checklist in the project's own README.
