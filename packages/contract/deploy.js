const fs = require("fs");
const { eos } = require("./config");

const contractDir = `./`;
const wast = fs.readFileSync(`KingOfEOS.wast`);
const abi = fs.readFileSync(`KingOfEOS.abi`);

// Publish contract to the blockchain
// Wallet with private key needs to be unlocked in eosc
eos.setcode("kingofeos", 0, 0, wast, abi).catch(console.log);
