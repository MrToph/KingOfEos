#include <string>

#include <eosiolib/eosio.hpp>
#include <eosiolib/currency.hpp>

#include <boost/algorithm/string.hpp> // for split

using namespace eosio;
using namespace std;

// the time after which a new round begins when no
// new king was crowned
// 1 week
#define MAX_CORONATION_TIME 60 * 60 * 24 * 7

class kingofeos : public eosio::contract
{
  public:
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
        claim(account_name name, string displayName, string image)
            : name(name), displayName(displayName), image(image){};

        account_name name;
        string displayName;
        string image;
        EOSLIB_SERIALIZE(claim, (name)(displayName)(image))
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

    //@abi action init
    struct init
    {
        init(){};
        // action must have a field as of now
        account_name name;
        EOSLIB_SERIALIZE(init, (name))
    };

    //@abi action end
    struct end
    {
        end(){};
        // action must have a field as of now
        account_name name;
        EOSLIB_SERIALIZE(end, (name))
    };

    // the first argument of multi_index must be the name of the table
    // in the ABI!
    typedef eosio::multi_index<N(claims), claim_record> claims_db;

    // inline uint64_t makeIndex(uint64_t kingdomOrder, uint8_t kingOrder) {
    //     return (kingdomOrder << 8) | kingOrder;
    // }

    // inline uint64_t indexToKingdomOrder(uint64_t kingdomKingIndex) {
    //     return kingdomKingIndex >> 8;
    // }

    // inline uint8_t indexToKingOrder(uint64_t kingdomKingIndex) {
    //     return kingdomKingIndex & 0xFF;
    // }

    // inline uint64_t kingOrderToClaimPrice(uint8_t kingOrder) {
    //     return pow(1.35, kingOrder) * 1E4;
    // }

    void onTransfer(const currency::transfer& transfer);
    void end ();
    void init(account_name name);
    void apply( account_name contract, account_name act );

  private:
    claims_db claims;
};

