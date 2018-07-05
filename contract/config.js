const Eos = require(`eosjs`)
const { ecc } = Eos.modules
const binaryen = require(`binaryen`)
const map = require(`lodash/map`)
const mapValues = require(`lodash/mapValues`)
const dotenv = require(`dotenv`)

dotenv.config({ path: process.env.NODE_ENV === `production` ? `.production.env` : `.dev.env` })

// used in dev only
const eosioPrivateKey = `5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3`

let kingPrivate
if (process.env.NODE_ENV === `production`) {
    kingPrivate = process.env.CONTRACT_PRIVATE_KEY
} else {
    // New deterministic key for the kingofeos account.
    // Do NOT use this in production
    kingPrivate = ecc.seedPrivate(process.env.CONTRACT_ACCOUNT)
}

const keys = mapValues(
    {
        [process.env.CONTRACT_ACCOUNT]: kingPrivate,
        test2: ecc.seedPrivate(`test1`),
    },
    privateKey => [privateKey, ecc.privateToPublic(privateKey)],
)
console.log(keys)
const keyProvider = [eosioPrivateKey, ...map(keys, ([privateKey]) => privateKey)]
const logger = { error: null }
// eslint-disable-next-line new-cap
const eos = Eos({ keyProvider, binaryen, logger, httpEndpoint: process.env.EOS_HTTP_ENDPOINT })

module.exports = {
    eos,
    keys,
}
