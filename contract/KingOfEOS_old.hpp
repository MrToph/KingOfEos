/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/eos.hpp>
#include <eosiolib/db.hpp>
#include <eosiolib/token.hpp>

namespace kingofeos {
    //@abi action sell
    struct PACKED( claim ) {
        claim() {};
        claim(account_name name): name(name) {};
        claim(account_name name, eosio::name displayName, eosio::name image, eosio::name song)
            : name(name), displayName(displayName), image(image), song(song) {};
        // TODO: Move to eosio::string in dawn-3
        account_name name;
        eosio::name displayName;
        eosio::name image;
        eosio::name song;
    };

    struct PACKED(claim_record) {
        claim_record() {};
        claim_record(uint64_t kingdomKingIndex, time claimTime, claim claim)
            :kingdomKingIndex(kingdomKingIndex),claimTime(claimTime), claim(claim) {};
        // upper 56 bits contain kingdom order, lower 8 bits contain kingOrder
        uint64_t kingdomKingIndex; // this also acts as key of the table
        time claimTime;
        claim claim;
    };

    //@abi action sell
    struct PACKED( end ) {
        end() {};
    };
  /**
   * @brief table to store list of games
   */ 
  using Claims = eosio::table<N(kingofeos),N(kingofeos),N(claims),claim_record,uint64_t>;
}