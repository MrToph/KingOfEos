const fs = require(`fs`)
const { eos } = require(`./config`)

const contractDir = `./`
const wasm = fs.readFileSync(`${contractDir}/KingOfEOS.wasm`)
const abi = fs.readFileSync(`${contractDir}/KingOfEOS.abi`)

// Publish contract to the blockchain
// Wallet with private key needs to be unlocked in eosc
const codePromise = eos.setcode(`kingofeos`, 0, 0, wasm)
const abiPromise = eos.setabi(`kingofeos`, JSON.parse(abi))

Promise.all([codePromise, abiPromise])
    .then(`successfully delpoyed`)
    .catch(console.log)
