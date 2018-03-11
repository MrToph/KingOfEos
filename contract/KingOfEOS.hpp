/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eoslib/eos.hpp>
#include <eoslib/db.hpp>
#include <eoslib/string.hpp>

namespace kingofeos {
    //@abi action sell
    struct PACKED( claim ) {
        // TODO: Move to eosio::string in dawn-3
        account_name name;
        eosio::name displayName;
        eosio::name image;
        eosio::name song;
    };

    struct PACKED(claim_record) {
        claim_record() {};
        claim_record(uint64_t kingdomOrder, uint8_t kingOrder, uint64_t blockNumber, claim claim)
            :kingdomOrder(kingdomOrder), kingOrder(kingOrder), blockNumber(blockNumber), claim(claim) {};
        uint64_t kingdomOrder; // this also acts as key of the table
        uint8_t kingOrder;
        uint64_t blockNumber;
        claim claim;
    };
  /**
   * @brief table to store list of games
   */ 
  using Claims = eosio::table<N(kingofeos),N(kingofeos),N(claims),claim_record,uint64_t>;
}