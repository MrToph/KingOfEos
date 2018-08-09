# Setup
Copy the `.env.template` to `.env` and add your private key there and edit your contract name.
Run `npm install` to install all dependencies.

There's a `npm run init` script that should only be run on your local testnet to create accounts.

To deploy to the network specified in `.env`, run:
```
npm run deploy
```

You need to set `eosio.code` permission in order to send inline transfers from the contract:

```
cleos set account permission kingofeos active '{"threshold": 1,"keys": [{"key": "EOS5...","weight": 1}],"accounts": [{"permission":{"actor":"kingofeos","permission":"eosio.code"},"weight":1}]}' owner -p kingofeos
```

## Testing the smart contract
You can run the following scripts to push actions to your deployed smart contract without using cleos:

```
npm run @transfer
npm run @init
npm run @end
```

Inspecting the contract's table can be done by:
```
npm run dump_tables
```