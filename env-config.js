// taken from https://github.com/zeit/next.js/blob/canary/examples/with-universal-configuration/env-config.js
require(`dotenv`).config()

const isProduction = process.env.NODE_ENV === `production`
console.log(`Injecting production variables. nextjs might still set NODE_ENV to "development".`)

// Because a babel plugin is used the output is cached in node_modules/.cache by babel-loader.
// When modifying the configuration you will have to manually clear this cache to make changes visible
const keys = [`EOS_NETWORK_PROTOCOL`, `EOS_NETWORK_HOST`, `EOS_NETWORK_PORT`, `EOS_NETWORK_CHAINID`]
const exportsObject = keys.reduce((acc, key) =>
    Object.assign({}, acc, { [`process.env.${key}`]: isProduction ? process.env[key] : undefined }),
)

module.exports = exportsObject
