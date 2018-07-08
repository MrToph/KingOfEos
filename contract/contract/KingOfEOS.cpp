#include <string>

#include <eosiolib/eosio.hpp>
#include <eosiolib/currency.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp> // for SEND_INLINE_ACTION

#include <boost/algorithm/string.hpp> // for split
#include "./KingOfEOS.hpp"

using namespace eosio;
using namespace std;

// the time after which a new round begins when no
// new king was crowned
// 1 week
#define MAX_CORONATION_TIME 60 * 60 * 24 * 7
#define CLAIM_MULTIPLIER 1.35
#define COMMISSION_PERCENTAGE 0.05

inline uint64_t makeIndex(uint64_t kingdomOrder, uint8_t kingOrder)
{
    return (kingdomOrder << 8) | kingOrder;
}

inline uint64_t indexToKingdomOrder(uint64_t kingdomKingIndex)
{
    return kingdomKingIndex >> 8;
}

inline uint8_t indexToKingOrder(uint64_t kingdomKingIndex)
{
    return kingdomKingIndex & 0xFF;
}

inline uint64_t kingOrderToClaimPrice(uint8_t kingOrder)
{
    return pow(CLAIM_MULTIPLIER, kingOrder) * 1E4;
}

void kingofeos::onTransfer(const currency::transfer &transfer)
{
    if (transfer.to != _self)
        return;

    eosio_assert(transfer.from != _self, "deployed contract may not be take part in claiming the throne")

    // print("Transfer memo: ", transfer.memo.c_str());
    eosio_assert(transfer.quantity.symbol == S(4, SYS), "must pay with EOS token");
    auto itr = claims.end();
    --itr; // itr now points to last element
    eosio_assert(itr != claims.end(), "no previous claim exists");
    claim_record latestClaimRecord = *itr;

    uint64_t lastKingdomOrder = indexToKingdomOrder(latestClaimRecord.kingdomKingIndex);
    uint8_t lastKingOrder = indexToKingOrder(latestClaimRecord.kingdomKingIndex);

    uint64_t claimPrice = kingOrderToClaimPrice(lastKingOrder + 1);
    std::string claimPriceError = "wrong claim price " + std::to_string(claimPrice);
    eosio_assert(transfer.quantity.amount == claimPrice, claimPriceError.c_str());

    std::vector<std::string> results;
    boost::split(results, transfer.memo, [](const char c) { return c == ';'; });
    eosio_assert(results.size() >= 2, "transfer memo needs two arguments separated by ';'");
    // displayName <= 100 and imageid must be a uuid-v4
    eosio_assert(results[0].length() <= 100 && (results[1].length() == 0 || results[1].length() == 36), "kingdom arguments failed the size requirements");
    claim newClaim(transfer.from, results[0], results[1]);

    claims.emplace(N(kingofeos), [&](claim_record &claimRecord) {
        uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
        claimRecord.kingdomKingIndex = kingdomKingIndex;
        claimRecord.claimTime = now();
        claimRecord.claim = newClaim;
    });

    // first king is always deployed contract itself => cannot send transfer from itself to itself
    if(latestClaimRecord.claim.name != _self) {
        // https://github.com/Dylan-Phoon/TradEOS1/blob/653fd7ec8fb16e547649cd0c029d39bb43edfbe5/exchange.cpp#L289
        asset amount = asset{(int64_t)((CLAIM_MULTIPLIER - COMMISSION_PERCENTAGE) / CLAIM_MULTIPLIER * claimPrice), transfer.quantity.symbol};
        action{
            permission_level{_self, N(active)},
            N(eosio.token),
            N(transfer),
            currency::transfer{
                .from=_self, .to=latestClaimRecord.claim.name, .quantity=amount, .memo="Withdraw from TradEOS"
            }
        }.send();

        // https://github.com/Dylan-Phoon/eosio.token.mineable/blob/c32bf1c08a2c81da311c383752d5e5cbe0cfbe9a/eosio.token.cpp#L159
        // SEND_INLINE_ACTION( *this, transfer, {st.issuer,N(active)}, {st.issuer, to, quantity, memo} );
        // INLINE_ACTION_SENDER(eosio::token, transfer)
        // (
        //     N(eosio.token),
        //     {_self, N(active)},
        //     {_self, latestClaimRecord.claim.name, bid, latestClaimRecord.claim.name.to_string() + std::string(" dethroned you on \"King Of EOS\"")}
        // );
    }
    
}

void kingofeos::end()
{
    auto itr = claims.end();
    --itr; // itr now points to last element
    eosio_assert(itr != claims.end(), "no previous claim exists");

    time lastClaimTime = itr->claimTime;
    eosio_assert(now() > lastClaimTime + MAX_CORONATION_TIME, "max coronation time not reached yet");

    uint64_t lastKingdomOrder = indexToKingdomOrder(itr->kingdomKingIndex);
    claims.emplace(N(kingofeos), [&](claim_record &claimRecord) {
        uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder + 1, 0);
        claimRecord.kingdomKingIndex = kingdomKingIndex;
        claimRecord.claimTime = now();
        claimRecord.claim = claim(N(kingofeos));
    });
}

void kingofeos::init(account_name name)
{
    require_auth(_self);
    // make sure table claims is empty
    eosio_assert(claims.begin() == claims.end(), "already initialized");
    claims.emplace(N(kingofeos), [&](claim_record &claimRecord) {
        claimRecord.kingdomKingIndex = makeIndex(0, 0);
        claimRecord.claimTime = now();
        claimRecord.claim = claim(N(kingofeos));
    });
}

void kingofeos::apply(account_name contract, account_name act)
{
    if (contract == N(eosio.token) && act == N(transfer))
    {
        onTransfer(unpack_action_data<currency::transfer>());
        return;
    }

    if (contract != _self)
        return;

    // needed for EOSIO_API macro
    auto &thiscontract = *this;
    switch (act)
    {
        EOSIO_API(kingofeos, (init)(end))
    };
}

// EOSIO_ABI only works for contract == this conract
// EOSIO_ABI(kingofeos, (transfer))

extern "C"
{
    [[noreturn]] void apply(uint64_t receiver, uint64_t code, uint64_t action) {
        kingofeos king(receiver);
        king.apply(code, action);
        eosio_exit(0);
    }
}
