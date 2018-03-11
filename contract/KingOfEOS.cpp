/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <KingOfEOS.hpp>

using namespace eosio;
namespace kingofeos {
    /**
   * @brief Apply create action
   * @param create - action to be applied
   */
  void apply_claim(const claim& c) {
    eosio::require_auth(c.name);

    uint64_t kingdomOrder = 0;
    uint8_t kingOrder = 0;
    uint64_t blockNumber = 12345;
    claim_record claim_to_create(kingdomOrder, kingOrder, blockNumber, c);
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
