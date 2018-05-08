const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;
//you need little improvisation
const now = Date.now()
shell.exec(`cleos push action eosio.token transfer '[ \"kingofeos\", \"kingofeos\", \"0.1234 EOS\", \"first;second;third${now}\" ]' -p kingofeos`)