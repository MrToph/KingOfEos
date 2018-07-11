const fs = require(`fs`)
const path = require(`path`)
const { eos } = require(`./config`)

const contractDir = `./contract`
const wasm = fs.readFileSync(path.join(contractDir, `KingOfEOS.wasm`))
const abi = fs.readFileSync(path.join(contractDir, `KingOfEOS.abi`))

// Publish contract to the blockchain
const codePromise = eos.setcode(process.env.CONTRACT_ACCOUNT, 0, 0, wasm)
const abiPromise = eos.setabi(process.env.CONTRACT_ACCOUNT, JSON.parse(abi))

Promise.all([codePromise, abiPromise])
    .then(`successfully delpoyed`)
    .catch(console.log)
