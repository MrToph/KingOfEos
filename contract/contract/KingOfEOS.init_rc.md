# CONTRACT FOR KingOfEOS::init

## ACTION NAME: init

### Parameters
Input parameters:

* `name` (account_name)

Implied parameters: 

* `account_name` (name of the party invoking and signing the contract)

### Intent
INTENT. The intention of the author and the invoker of this contract is to initialize the contract.
It sets up the initial round of the game.
This action should only ever be called once by the owner of the contract in the life time of this contract.
It shall have no other effect.

### Term
TERM. This Contract expires at the conclusion of code execution.
