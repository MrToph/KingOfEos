/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <KingOfEOS.hpp>
// the time after which a new round begins when no
// new king was crowned
// 1 week
#define MAX_CORONATION_TIME 60 * 60 * 24 * 7

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
  void apply_claim(const claim& newClaim) {
    eosio::require_auth(newClaim.name);

    claim_record lastClaim;
    bool success = Claims::back(lastClaim);
    assert(success, "no claims exist");
    uint64_t lastKingdomOrder = indexToLastKingdomOrder(lastClaim.kingdomKingIndex);
    uint8_t lastKingOrder = indexToLastKingOrder(lastClaim.kingdomKingIndex);

    uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
    // Returns the time in seconds from 1970 of the last accepted block
    time claimTime = now();
    eosio::print( "KingdomKingIndex:", kingdomKingIndex );
    claim_record claim_to_create(kingdomKingIndex, claimTime, newClaim);
    Claims::store(claim_to_create);
  }

    void apply_eos_transfer( const eosio::transfer& transfer ) {
        if( transfer.to == N(kingofeos) ) {
            claim_record lastClaim;
            bool success = Claims::back(lastClaim);
            assert(success, "no claims exist");
            uint64_t lastKingdomOrder = indexToLastKingdomOrder(lastClaim.kingdomKingIndex);
            uint8_t lastKingOrder = indexToLastKingOrder(lastClaim.kingdomKingIndex);

            // TODO: check if it is the exact amount of EOS needed
            // if (transfer.quantity = 1.35^lastKingOrder)
            // TODO: send money back to previous king in dawn-3 with inline_transfer
            // TODO: extract memo out of transfer and set corresponding fields in claim
            claim newClaim(transfer.from);

            uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
            time claimTime = now();
            eosio::print( "KingdomKingIndex:", kingdomKingIndex );

            claim_record claim_to_create(kingdomKingIndex, claimTime, newClaim);
            Claims::store(claim_to_create);
        } else {
            assert( false, "notified on transfer that is not relevant to this exchange" );
        }
    }

    void apply_end(const end& endKingdom) {
        claim_record lastClaim;
        bool success = Claims::back(lastClaim);
        assert(success, "no claims exist");
        uint64_t lastKingdomOrder = indexToLastKingdomOrder(lastClaim.kingdomKingIndex);

        time lastClaimTime = lastClaim.claimTime;
        assert(now() > lastClaimTime + MAX_CORONATION_TIME, "max coronation time not reached yet");
        claim initialClaim(N(kingofeos), N(display), N(image), N(song));

        uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder + 1, 0);
        time claimTime = now();
        eosio::print( "KingdomKingIndex:", kingdomKingIndex );

        claim_record claim_to_create(kingdomKingIndex, claimTime, initialClaim);
        Claims::store(claim_to_create);
    }
}


using namespace kingofeos;
/**
 *  The init() and apply() methods must have C calling convention so that the blockchain can lookup and
 *  call these methods.
 */
extern "C" {

    /**
     *  This method is called once when the contract is published or updated.
     */
    void init()  {
        claim newClaim(N(kingofeos));
        uint64_t kingdomKingIndex = makeIndex(0,0);
        time claimTime = now();
        claim_record claim_to_create(kingdomKingIndex, claimTime, newClaim);
        Claims::store(claim_to_create);
       eosio::print( "Initializing King of EOS!\n" );
    }

    /// The apply method implements the dispatch of events to this contract
    void apply( uint64_t code, uint64_t action ) {
        if( code == N(kingofeos) ) {
            if( action == N(claim) ) {
                auto message = current_message<kingofeos::claim>();
                eosio::print( "Claim ", "from", message.name );
                kingofeos::apply_claim(message);
                return;
            }
            if( action == N(end) ) {
                eosio::print( "End Kingdom " );
                auto message = current_message<kingofeos::end>();
                kingofeos::apply_end(message);
                return;
            }
        }
        if( code == N(eos) ) {
            if( action == N(transfer) ) {
                kingofeos::apply_eos_transfer( current_message<eosio::transfer>() );
            } 
        }
    }

} // extern "C"
