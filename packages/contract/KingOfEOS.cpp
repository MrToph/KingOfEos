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

    void onTransfer(const eos_currency::transfer_memo& transfer)
    {
        print("TEST TEST TEST TEST TEST TEST TEST: ", transfer.memo.c_str());
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

    void init() {
        print("void init()");
        claims.emplace(N(kingofeos), [&](claim_record& claimRecord){
            print("in emplace");
            claimRecord.kingdomKingIndex = makeIndex(0,0);
            claimRecord.claimTime = now();
            claimRecord.claim = claim(N(kingofeos));
         });
    }

    void end () {
        print("KING OF EOS END END END");
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
    [[noreturn]] void init()  {
        kingofeos king ( N(kingofeos) );
        king.init();
       eosio::print( "Initializing King of EOS!\n" );
    }
   [[noreturn]] void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
      kingofeos  king( receiver );
    //   king.apply( code, action );
    king.init();
      eosio_exit(0);
   }
}
