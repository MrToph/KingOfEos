## Styling Semantic UI
1. Change `src/theme.config` to use your theme name instead of `default` for the specific category you are about to change.
1. Make the change in `src/themes/<yourThemeName>`
1. `npm run build`
1. Link it in lerna package with `lerna bootstrap`

> Note: Colors must be overwritten in `default` theme `site.variables` for some reason
