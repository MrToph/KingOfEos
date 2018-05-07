const Eos = require('eosjs') // Eos = require('./src')
const {ecc} = Eos.modules
const binaryen = require('binaryen')
const map = require('lodash/map')
const mapValues = require('lodash/mapValues')

const eosioPrivateKey = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'

// New deterministic key for the kingofeos account.  Only use a simple
// seedPrivate in production if you want to give away money.
const kingPrivate = "5JCiYeEEbM9dN59cuLHgnfd5S4ScVfPya6q1bXSaNK3JuYexqjy" // ecc.seedPrivate('kingofeos')
const kingPublic = ecc.privateToPublic(kingPrivate)


const keys = mapValues({
    kingofeos: ecc.seedPrivate('kingofeos'),
    test1: ecc.seedPrivate('test1'),
}, privateKey => [privateKey, ecc.privateToPublic(privateKey)])

const keyProvider = [eosioPrivateKey, ...map(keys, ([privateKey]) => privateKey)]
console.log(keys)
const eos = Eos.Localnet({keyProvider, binaryen, httpEndpoint: 'http://127.0.0.1:8888',})

module.exports = {
    eos,
    keys,
}