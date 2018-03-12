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
        claim_record(uint64_t kingdomKingIndex, uint64_t blockNumber, claim claim)
            :kingdomKingIndex(kingdomKingIndex),blockNumber(blockNumber), claim(claim) {};
        // upper 56 bits contain kingdom order, lower 8 bits contain kingOrder
        uint64_t kingdomKingIndex; // this also acts as key of the table
        uint64_t blockNumber;
        claim claim;
    };
  /**
   * @brief table to store list of games
   */ 
  using Claims = eosio::table<N(kingofeos),N(kingofeos),N(claims),claim_record,uint64_t>;
}