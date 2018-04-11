## Development
```
npm install
lerna boostrap
```

### Website
```
cd packages/web
yarn dev
```

Initial Release:
* [x] Setup Redux and API calls + mock data
* [x] Recursive Castle
* [x] Render High quality Image for Flag default image on castle
* [x] Offset rules and add some icons?
* [ ] Implement Claim Modal with `eosc` option
* Add eosjs integration and remove mock data
* Make soundcloud work

Upcoming:
* Implement Scatter Integration in Modal
* Hall Of Fame: d3js circles representing previous winners. bubble chart? Rendering when visible and then force layout positions them.
* Add option to go to canvas of previous kingdoms

### EOS Contract
See `README.md` inside `packages/contract`
* Update to EOS Dawn 3