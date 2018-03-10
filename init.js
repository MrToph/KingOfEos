const { eos, kingPublic } = require('./config')

eos.newaccount({
  creator: 'inita',
  name: 'kingofeos',
  owner: kingPublic,
  active: kingPublic,
  recovery: 'inita',
  deposit: '1 EOS'
})

console.log(`Deployed with public key ${kingPublic}`)