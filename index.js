const fs = require('fs')
const Eos = require('eosjs') // Eos = require('./src')
let {ecc} = Eos.modules

initaPrivate = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'

// New deterministic key for the kingofeos account.  Only use a simple
// seedPrivate in production if you want to give away money.
kingPrivate = ecc.seedPrivate('kingofeos')
kingPublic = ecc.privateToPublic(kingPrivate)

keyProvider = [initaPrivate, kingPrivate]

//  Requires a large library, separate from the eosjs bundle
// $ npm install binaryen
binaryen = require('binaryen')

eos = Eos.Localnet({keyProvider, binaryen, httpEndpoint: 'http://127.0.0.1:8888',})

// eos.newaccount({
//   creator: 'inita',
//   name: 'kingofeos',
//   owner: kingPublic,
//   active: kingPublic,
//   recovery: 'inita',
//   deposit: '1 EOS'
// })

contractDir = `contract`
wast = fs.readFileSync(`${contractDir}/KingOfEOS.wast`)
abi = fs.readFileSync(`${contractDir}/KingOfEOS.abi`)

// Publish contract to the blockchain
// eos.setcode('kingofeos', 0, 0, wast, abi)

// eos.contract(code<string>, [options], [callback])
eos.contract('kingofeos').then(kingofeos => {
  // Transfer is one of the actions in kingofeos.abi 
  kingofeos.transfer('kingofeos', 'inita', 100)
})
.catch(err => console.log(err))