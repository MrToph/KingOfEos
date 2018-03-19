const { eos, keys } = require('./config')

async function init() {
  // await eos.newaccount({
  //   creator: 'inita',
  //   name: 'kingofeos',
  //   owner: keys.kingofeos[1],
  //   active: keys.kingofeos[1],
  //   recovery: 'inita',
  //   deposit: '10000 EOS'
  // })
  await eos.newaccount({
    creator: 'inita',
    name: 'test1',
    owner: keys.test1[1],
    active: keys.test1[1],
    recovery: 'inita',
    deposit: '10000 EOS'
  })
  await eos.transfer({from: 'inita', to: 'kingofeos', amount: 1E8, memo: 'test;test;hello'})
  await eos.transfer({from: 'inita', to: 'test1', amount: 1E8, memo: 'test;test;hello'})
}

init()

console.log(`Deployed kingofeos with public key ${keys.kingofeos[1]}`)