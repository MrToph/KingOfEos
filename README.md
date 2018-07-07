## TODO:


Initial Release:
* [x] Setup Redux and API calls + mock data
* [x] Recursive Castle
* [x] Render High quality Image for Flag default image on castle
* [x] Offset rules and add some icons?
* [x] Implement Claim Modal with `eosc` option
* [x] Add eosjs integration and remove mock data
* [x] Add Display Name to Canvas
* [x] Implement image upload serverless function to S3.
        Needed to get around WebGL texture CORS restrictions.
        https://www.netlify.com/blog/2016/11/17/serverless-file-uploads/
        Alternatively try using EOS IPFS?
* [x] Removed soundcloud link
* [x] Sanitize Modal fields
* [x] Implement Scatter Integration in Modal
* [x] Bug 36.6441 is claim price in c++ but in web it's 36.6442
* [ ] Smart contract should send money back to the previous king
* [x] Wrong "days left" time is displayed on website
* [ ] Empty images instead of default are displayed in current-kingdom

Upcoming:
* Hall Of Fame: d3js circles representing previous winners. bubble chart? Rendering when visible and then force layout positions them.
* Add option to go to canvas of previous kingdoms
