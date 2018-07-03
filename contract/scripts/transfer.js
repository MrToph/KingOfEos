const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;
//you need little improvisation
const now = Date.now()
shell.exec(`cleos push action eosio.token transfer '[ \"eosio\", \"kingofeos\", \"1.3500 SYS\", \"first;10ba038e-48da-487b-96e8-8d3b99b6d18a;${now}\" ]' -p eosio`)