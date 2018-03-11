const Eos = require('eosjs') // Eos = require('./src')
const {ecc} = Eos.modules
const binaryen = require('binaryen')

const initaPrivate = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'

// New deterministic key for the kingofeos account.  Only use a simple
// seedPrivate in production if you want to give away money.
const kingPrivate = ecc.seedPrivate('kingofeos')
const kingPublic = ecc.privateToPublic(kingPrivate)

const keyProvider = [initaPrivate, kingPrivate]

const eos = Eos.Localnet({keyProvider, binaryen, httpEndpoint: 'http://127.0.0.1:8888',})

module.exports = {
    eos,
    kingPrivate,
    kingPublic,
}