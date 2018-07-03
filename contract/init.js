const { eos, keys } = require('./config')

async function init() {
  await eos.newaccount({
    creator: 'eosio',
    name: 'kingofeos',
    owner: keys.kingofeos[1],
    active: keys.kingofeos[1],
    recovery: 'eosio',
    deposit: '10000 EOS'
  })
  // await eos.newaccount({
  //   creator: 'eosio',
  //   name: 'test1',
  //   owner: keys.test1[1],
  //   active: keys.test1[1],
  //   recovery: 'eosio',
  // }, { broadcast: true })
  // await eos.transfer({from: 'eosio', to: 'kingofeos', amount: 1E8, memo: 'test;test;hello'})
  // await eos.transfer({from: 'eosio', to: 'test1', amount: 1E8, memo: 'test;test;hello'})
}

init()
