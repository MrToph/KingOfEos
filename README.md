##

# Build Smart Contract
```
eoscpp -o KingOfEOS/contract/KingOfEOS.wast KingOfEOS/contract/KingOfEOS.cpp
eoscpp -o KingOfEOS/contract/KingOfEOS.abi KingOfEOS/contract/KingOfEOS.hpp
```

# Schema
## Actions
```cpp
claim(accont_name name, string displayName, string image, string song) /* EOS price */
endRound()
```

## Database
```cpp
Key: <round,throneNumber>
(accont_name name, string displayName, string image, string song, uint_64t coronationBlockNumber)

// Check if game already exists
    game existing_game;
    bool game_exists = Games::get(c.challenger, existing_game, c.host);
    eosio_assert(game_exists == false, "game already exists");

    
    game game_to_create(c.challenger, c.host);
    Games::store(game_to_create, c.host);
```
