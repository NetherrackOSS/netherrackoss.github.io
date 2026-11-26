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

Each page is a plain `.html` file (`index.html`, `installation.html`, `plugins.html`,
`commands.html`, ...). There's no templating: update the file directly, in a text editor.

- `assets/css/style.css` - all of the site's styling, including both themes.
- `assets/js/site.js` - the theme toggle, "On this page" list, heading links and the
  code-block copy buttons. The site works with this disabled too.
- `assets/img/` - the logo (light and dark) and favicon.

## Updating for a new Netherrack release

A few things are worth checking whenever Netherrack's defaults, commands or API change:

- The footer on **every** page - the version these docs describe (currently `v0.6.0-beta`).
  There is no `DOCS_VERSION` variable; each footer is hard-coded.
- `configuration.html` - the `server.properties` and `netherrack.yml` tables, the
  `players/` file section and the flat-preset list.
- `commands.html` - the command table, permission levels and the example `/version` output.
- `plugins.html` - the Maven coordinates, `api-version`, event table and plugin feature list.
- `status.html` - the implemented/not-implemented lists, known limitations and untested
  areas, kept in step with the project's own README and release notes.
- The `Plugins` navigation item and the previous/next pager links on each page.
