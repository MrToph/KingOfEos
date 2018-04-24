#include <utility>
// #include <vector>
// #include <eosiolib/crypto.h>
#include <eosiolib/eosio.hpp>
#include <eosiolib/types.hpp>
#include <eosiolib/token.hpp>   // for asset
#include <eosiolib/print.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/multi_index.hpp>
#include <eosiolib/contract.hpp>

#include <eosio.system/eosio.system.hpp>

using eos_currency = eosiosystem::contract<N(eosio)>::currency;

using eosio::key256;
using eosio::indexed_by;
using eosio::const_mem_fun;
using eosio::asset;

using namespace eosio;
using namespace std;

// the time after which a new round begins when no
// new king was crowned
// 1 week
#define MAX_CORONATION_TIME 60 * 60 * 24 * 7

class kingofeos : public eosio::contract
{
  public:
    //   const uint32_t FIVE_MINUTES = 5*60;

    kingofeos(account_name self)
        : contract(self),
          claims(self, self)
    {
    }

    //@abi action claim
    struct claim
    {
        claim(){};
        claim(account_name name) : name(name){};
        claim(account_name name, string displayName, string image, string song)
            : name(name), displayName(displayName), image(image), song(song){};

        account_name name;
        string displayName;
        string image;
        string song;
        EOSLIB_SERIALIZE(claim, (name)(displayName)(image)(song))
    };

    //@abi table claims i64
    struct claim_record
    {
        claim_record(){};
        claim_record(uint64_t kingdomKingIndex, time claimTime, claim claim)
            : kingdomKingIndex(kingdomKingIndex), claimTime(claimTime), claim(claim){};
        // upper 56 bits contain kingdom order, lower 8 bits contain kingOrder
        uint64_t kingdomKingIndex; // this also acts as key of the table
        time claimTime;
        claim claim;

        uint64_t primary_key() const { return kingdomKingIndex; }
        // need to serialize this, otherwise saving it in the data base does not work
        // Runtime Error Processing WASM
        EOSLIB_SERIALIZE(claim_record, (kingdomKingIndex)(claimTime)(claim))
    };

    //@abi action end
    struct end
    {
        end(){};
    };

    // the first argument of multi_index must be the name of the table
    // in the ABI!
    typedef eosio::multi_index<N(claims), claim_record> claims_db;

    inline uint64_t makeIndex(uint64_t kingdomOrder, uint8_t kingOrder) {
        return (kingdomOrder << 8) | kingOrder;
    }

    inline uint64_t indexToLastKingdomOrder(uint64_t kingdomKingIndex) {
        return kingdomKingIndex >> 8;
    }

    inline uint8_t indexToLastKingOrder(uint64_t kingdomKingIndex) {
        return kingdomKingIndex & 0xFF;
    }

    inline uint64_t kingOrderToClaimPrice(uint8_t kingOrder) {
        return pow(1.35, kingOrder) * 1E4;
    }

    void onTransfer(const eos_currency::transfer_memo& transfer)
    {
        print("TEST TEST TEST TEST TEST TEST TEST: ", transfer.memo.c_str());
        eosio_assert(transfer.quantity.symbol == S(4,EOS), "must pay with EOS token");
        auto itr = claims.end();
        --itr;  // itr now points to last element
        eosio_assert(itr != claims.end(), "no previous claim exists");
        print( "KingdomKingIndex:", itr->kingdomKingIndex, "Price:", transfer.quantity.amount );
        uint64_t lastKingdomOrder = indexToLastKingdomOrder(itr->kingdomKingIndex);
        uint8_t lastKingOrder = indexToLastKingOrder(itr->kingdomKingIndex);

        uint64_t claimPrice = kingOrderToClaimPrice(lastKingOrder + 1);
        print("Claim Price: ", claimPrice);
        // eosio_assert(transfer.quantity.amount == claimPrice, "wrong claim price");
        // TODO: send money back to previous king in dawn-3 with inline_transfer
        // TODO: extract memo out of transfer and set corresponding fields in claim
        claim newClaim(transfer.from);

         claims.emplace(N(kingofeos), [&](claim_record& claimRecord){
            print("in emplace");
            uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
            claimRecord.kingdomKingIndex = kingdomKingIndex;
            claimRecord.claimTime = now();
            claimRecord.claim = newClaim;
         });
        // require_auth( from );
        // auto sym = quantity.symbol.name();
        // stats statstable( _self, sym );
        // const auto& st = statstable.get( sym );

        // require_recipient( from );
        // require_recipient( to );

        // eosio_assert( quantity.is_valid(), "invalid quantity" );
        // eosio_assert( quantity.amount > 0, "must transfer positive quantity" );

        // sub_balance( from, quantity, st );
        // add_balance( to, quantity, st, from );
    }

    void end () {
        print("KING OF EOS END END END");
        auto itr = claims.end();
        --itr;  // itr now points to last element
        eosio_assert(itr != claims.end(), "no previous claim exists");

        time lastClaimTime = itr->claimTime;
        eosio_assert(now() > lastClaimTime + MAX_CORONATION_TIME, "max coronation time not reached yet");


        uint64_t lastKingdomOrder = indexToLastKingdomOrder(itr->kingdomKingIndex);
        claims.emplace(N(kingofeos), [&](claim_record& claimRecord){
            uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder + 1, 0);
            eosio::print( "KingdomKingIndex:", kingdomKingIndex );
            print("in emplace");
            claimRecord.kingdomKingIndex = kingdomKingIndex;
            claimRecord.claimTime = now();
            claimRecord.claim = claim(N(kingofeos));
         });
    }

    void init() {
        print("void init()");
        claims.emplace(N(kingofeos), [&](claim_record& claimRecord){
            print("in emplace");
            claimRecord.kingdomKingIndex = makeIndex(0,0);
            claimRecord.claimTime = now();
            claimRecord.claim = claim(N(kingofeos));
         });
    }


    void apply( account_name contract, account_name act ) {
    print("KING OF EOS APPLY: ");

      if( contract == N(eosio.token) && act == N(transfer) ) {
         onTransfer( unpack_action_data<eos_currency::transfer_memo>() );
         return;
      }

      if( contract != _self )
         return;

      auto& thiscontract = *this;
      switch( act ) {
         EOSIO_API( kingofeos, (end) )
      };
   }

  private:
    claims_db claims;
};

// EOSIO_ABI only works for contract == this conract
// EOSIO_ABI(kingofeos, (transfer))


extern "C" {
    void init()  {
        kingofeos king ( N(kingofeos) );
        king.init();
       eosio::print( "Initializing King of EOS!\n" );
    }
   [[noreturn]] void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
      kingofeos  king( receiver );
      king.apply( code, action );
      eosio_exit(0);
   }
}
