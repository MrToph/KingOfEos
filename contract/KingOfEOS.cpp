/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <KingOfEOS.hpp>

using namespace eosio;
namespace kingofeos {
    inline uint64_t makeIndex(uint64_t kingdomOrder, uint8_t kingOrder) {
      return (kingdomOrder << 8) | kingOrder;
   }

   inline uint64_t indexToLastKingdomOrder(uint64_t kingdomKingIndex) {
      return kingdomKingIndex >> 8;
   }

   inline uint8_t indexToLastKingOrder(uint64_t kingdomKingIndex) {
      return kingdomKingIndex & 0xFF;
   }


    /**
   * @brief Apply create action
   * @param create - action to be applied
   */
  void apply_claim(const claim& c) {
    eosio::require_auth(c.name);

    claim_record lastClaim;
    bool success = Claims::back(lastClaim);
    assert(success, "no claims exist");
    uint64_t lastKingdomOrder = indexToLastKingdomOrder(lastClaim.kingdomKingIndex);
    uint8_t lastKingOrder = indexToLastKingOrder(lastClaim.kingdomKingIndex);

    uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
    uint64_t blockNumber = 12345;
    eosio::print( "KingdomKingIndex:", kingdomKingIndex );
    claim_record claim_to_create(kingdomKingIndex, blockNumber, c);
    Claims::store(claim_to_create);
  }
}
/**
 *  The init() and apply() methods must have C calling convention so that the blockchain can lookup and
 *  call these methods.
 */
extern "C" {

    /**
     *  This method is called once when the contract is published or updated.
     */
    void init()  {
       eosio::print( "Init World!\n" );
    }

    /// The apply method implements the dispatch of events to this contract
    void apply( uint64_t code, uint64_t action ) {
        if( code == N(kingofeos) ) {
            if( action == N(claim) ) {
                eosio::print( "Claim ", "from" );
                auto message = current_message<kingofeos::claim>();
                kingofeos::apply_claim(message);
            }
        }
    }

} // extern "C"
