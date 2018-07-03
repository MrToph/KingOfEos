
## Setup
Follow tutorial: https://developers.eos.io/eosio-nodeos/docs/local-single-node-testnet
* config files are in `~/.local/share/eosio/nodeos/config`
* need to enable plugins, change http-server-address to 0.0.0.0:8888, allow CORS by setting `access-control-allow-origin = *` 

To be able to connect to `eosd` http server, we need to set in `config.ini`:
`http-server-address = 0.0.0.0:8888`
`access-control-allow-orign = *`

## Start eosd
```
cd ${EOS_PROGRAMS}/eosd && ./eosd --resync
```

## Account
kingPublic: 'EOS7X7aAHF9jpdYsH1vmquBYiNztJ37uJyHeqNjziR3tuRCJ9GYnc'
kingPrivate: '5JCiYeEEbM9dN59cuLHgnfd5S4ScVfPya6q1bXSaNK3JuYexqjy'
eosio.token 'EOS7nrgAQjNxsybYpQouYAT86MwsDbwNBGrnVcqT13EaqKhsAMbQb'
eosio.token '5JAiG6QimdH4CMgs5MyW3ikCgkgxxSxvT9ya6Rn2GGbdzrCvcXN'

## Bios
Setup bios on `eosio`:
cleos set contract eosio build/contracts/eosio.bios -p eosio

## Distribute funds

cleos create account eosio eosio.token  EOS7nrgAQjNxsybYpQouYAT86MwsDbwNBGrnVcqT13EaqKhsAMbQb EOS7nrgAQjNxsybYpQouYAT86MwsDbwNBGrnVcqT13EaqKhsAMbQb
cleos create account eosio kingofeos  EOS7X7aAHF9jpdYsH1vmquBYiNztJ37uJyHeqNjziR3tuRCJ9GYnc EOS7X7aAHF9jpdYsH1vmquBYiNztJ37uJyHeqNjziR3tuRCJ9GYnc
cleos set contract eosio.token build/contracts/eosio.token -p eosio.token
cleos push action eosio.token create '[ "eosio", "1000000000.0000 SYS", 0, 0, 0]' -p eosio.token
cleos push action eosio.token issue '[ "eosio", "100000.0000 SYS", "memo" ]' -p eosio
cleos push action eosio.token transfer '[ "eosio", "kingofeos", "50000.0001 SYS", "memo" ]' -p eosio
cleos get currency balance eosio.token kingofeos EOS

## Build Smart Contract
```
eosiocpp -o KingOfEOS.wast KingOfEOS.cpp
eosiocpp -g KingOfEOS.abi KingOfEOS.hpp
${EOSIO_INSTALL_DIR}/build/tools/eosiocpp -o /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.wast /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.cpp
${EOSIO_INSTALL_DIR}/build/tools/eosiocpp -o /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.abi /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.hpp

cleos set contract kingofeos ../contract KingOfEOS.wast KingOfEOS.abi -p kingofeos
```


## Invoke Claim by hand
```
cleos push action eosio.token transfer '[ "eosio", "kingofeos", "50000.0001 EOS", "memo" ]' -p eosio
cleos push action kingofeos end '["kingofeos"]' -p kingofeos
cleos get table kingofeos kingofeos claims
```

# Schema
## Actions
```cpp
claim(accont_name name, string displayName, string image, string song) /* EOS price */
endRound()
```

## Database
```cpp
Key: <round,kingOrder>
(accont_name name, string displayName, string image, string song, uint_64t coronationBlockNumber)

// Check if game already exists
    game existing_game;
    bool game_exists = Games::get(c.challenger, existing_game, c.host);
    eosio_assert(game_exists == false, "game already exists");

    
    game game_to_create(c.challenger, c.host);
    Games::store(game_to_create, c.host);
```

## Scatter Test Demo
http://www.demos.scatter-eos.com/#/shopping
Account Name: 11d4fgjfdg41 
Private Key: 5HufxFYe8F1E3Mmsv3K49fDu9KrgkuBgi327djubYRqxAKW4A2x
Public Key: EOS6tDRLn52ov2iG6Lu5SfmoRxKnsBPUEwx6pSpyhc4WWTcYNcRJW

# Notes
1. _The_ EOS token will be hosted in `eosio.token`: https://github.com/EOSIO/eos/pull/2448
1. action(
+            permission_level{ from, N(active) },
+            N(eosio.token), N(transfer),
+            std::make_tuple(from, _self, quantity, std::string(""))
+         ).send();