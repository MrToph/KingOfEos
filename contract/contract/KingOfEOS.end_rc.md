# CONTRACT FOR KingOfEOS::end

## ACTION NAME: end

### Parameters
Input parameters:

* `name` (account_name)

Implied parameters: 

* `account_name` (name of the party invoking and signing the contract)

### Intent
INTENT. The intention of the author and the invoker of this contract is to start finish the current round (kingdom) of the game and start a new round (kingdom).
The last person having transfered funds to this contract is claimed the _winner_ of the round.
A new round of the game starts with the initial king being this contract's account.
Especially, the winner of the old round is not entitled to any funds being paid out in the new round.
This action should only be called at earliest 7 (seven) days after the last `eosio.token::transfer` action which transfered funds to this contract.
This action should be callable from any EOS account without requiring authorization.
It shall have no other effect.

### Term
TERM. This Contract expires at the conclusion of code execution.
