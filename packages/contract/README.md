#
## Start eosd
```
cd ${EOS_PROGRAMS}/eosd && ./eosd --resync
```

## Unlock wallet
```
eosc wallet open -n default && eosc wallet unlock -n default <<< 'PW5JByCQRB6fE11xXE1j3EfCx3G8h3x693pwhSrE3V9KK2aobewLG'
```
## Build Smart Contract
```
eoscpp -o contract/KingOfEOS.wast contract/KingOfEOS.cpp
eoscpp -o contract/KingOfEOS.abi contract/KingOfEOS.hpp
${EOSIO_INSTALL_DIR}/build/tools/eoscpp -o /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.wast /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.cpp
${EOSIO_INSTALL_DIR}/build/tools/eoscpp -o /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.abi /mnt/d/eos-dev/KingOfEOS/contract/KingOfEOS.hpp

eosc set contract kingofeos contract/KingOfEOS.wast contract/KingOfEOS.abi
```

kingPublic: 'EOS7X7aAHF9jpdYsH1vmquBYiNztJ37uJyHeqNjziR3tuRCJ9GYnc'
kingPrivate: '5JCiYeEEbM9dN59cuLHgnfd5S4ScVfPya6q1bXSaNK3JuYexqjy'

## Invoke Claim by hand
```
eosc push message kingofeos claim '{"name":"kingofeos","displayName":"kingkong","image":"image123","song":"song123"}' --scope kingofeos --permission kingofeos@active
eosc push message kingofeos end '{}' --scope kingofeos --permission kingofeos@active
eosc get table kingofeos kingofeos claims
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
