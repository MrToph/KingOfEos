/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eoslib/eos.hpp>
#include <eoslib/db.hpp>
#include <eoslib/string.hpp>

namespace kingofeos {
    //@abi action sell
    struct claim {
        account_name name;
        eosio::string displayName;
        eosio::string image;
        eosio::string song;
    };

   struct claim_record : public claim { uint8_t fill_or_kill = false; };
}