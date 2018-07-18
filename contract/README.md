# Setup
Copy the `.env.template` to `.env` and add your private key there and edit your contract name.
Run `npm install` to install all dependencies.

There's a `npm run init` script that should only be run on your local testnet to create accounts.

To deploy to the network specified in `.env`, run:
```
npm run deploy
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