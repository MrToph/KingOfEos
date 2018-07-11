#include "./KingOfEOS.hpp"

#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp>        // for SEND_INLINE_ACTION
#include <cmath> // for pow
// #include <boost/algorithm/string.hpp> // for split

using namespace eosio;
using namespace std;

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

inline void splitMemo(std::vector<std::string> &results, std::string memo)
{
    auto end = memo.cend();
    auto start = memo.cbegin();

    for (auto it = memo.cbegin(); it != end; ++it)
    {
        if (*it == ';')
        {
            results.emplace_back(start, it);
            start = it + 1;
        }
    }
    if (start != end)
        results.emplace_back(start, end);
}

void kingofeos::onTransfer(const currency::transfer &transfer)
{
    if (transfer.to != _self)
        return;

    eosio_assert(transfer.from != _self, "deployed contract may not take part in claiming the throne");

    // print("Transfer memo: ", transfer.memo.c_str());
    eosio_assert(transfer.quantity.symbol == S(4, SYS), "must pay with EOS token");
    auto itr = claims.end();
    --itr; // itr now points to last element
    eosio_assert(itr != claims.end(), "no previous claim exists");
    claim_record latestClaimRecord = *itr;

    uint64_t lastKingdomOrder = indexToKingdomOrder(latestClaimRecord.kingdomKingIndex);
    uint8_t lastKingOrder = indexToKingOrder(latestClaimRecord.kingdomKingIndex);

    uint64_t claimPrice = kingOrderToClaimPrice(lastKingOrder + 1);
    std::string claimPriceError = "wrong claim price ";
    eosio_assert(transfer.quantity.amount == claimPrice, claimPriceError.c_str());

    std::vector<std::string> results;
    // use custom split function as we save 20 KiB RAM this way
    // boost::split(results, transfer.memo, [](const char c) { return c == ';'; });
    splitMemo(results, transfer.memo);
    eosio_assert(results.size() >= 2, "transfer memo needs two arguments separated by ';'");
    // displayName <= 100 and imageid must be a uuid-v4
    eosio_assert(results[0].length() <= 100 && (results[1].length() == 0 || results[1].length() == 36), "kingdom arguments failed the size requirements");
    claim newClaim(transfer.from, results[0], results[1]);

    claims.emplace(_self, [&](claim_record &claimRecord) {
        uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder, lastKingOrder + 1);
        claimRecord.kingdomKingIndex = kingdomKingIndex;
        claimRecord.claimTime = now();
        claimRecord.claim = newClaim;
    });

    // first king is always deployed contract itself => cannot send transfer from itself to itself
    if (latestClaimRecord.claim.name != _self)
    {
        asset amount = asset{(int64_t)((CLAIM_MULTIPLIER - COMMISSION_PERCENTAGE_POINTS) / CLAIM_MULTIPLIER * claimPrice), transfer.quantity.symbol};
        action{
            permission_level{_self, N(active)},
            N(eosio.token),
            N(transfer),
            currency::transfer{
                .from = _self, .to = latestClaimRecord.claim.name, .quantity = amount, .memo = "You were dethroned! Here's your profit. - King of EOS"}}
            .send();
    }
}

void kingofeos::end()
{
    // anyone can end the round, require no auth
    auto itr = claims.end();
    --itr; // itr now points to last element
    eosio_assert(itr != claims.end(), "no previous claim exists");

    time lastClaimTime = itr->claimTime;
    eosio_assert(now() > lastClaimTime + MAX_CORONATION_TIME, "max coronation time not reached yet");

    uint64_t lastKingdomOrder = indexToKingdomOrder(itr->kingdomKingIndex);
    claims.emplace(_self, [&](claim_record &claimRecord) {
        uint64_t kingdomKingIndex = makeIndex(lastKingdomOrder + 1, 0);
        claimRecord.kingdomKingIndex = kingdomKingIndex;
        claimRecord.claimTime = now();
        claimRecord.claim = claim(_self);
    });
}

void kingofeos::init(account_name name)
{
    require_auth(_self);
    // make sure table claims is empty
    eosio_assert(claims.begin() == claims.end(), "already initialized");
    claims.emplace(_self, [&](claim_record &claimRecord) {
        claimRecord.kingdomKingIndex = makeIndex(0, 0);
        claimRecord.claimTime = now();
        claimRecord.claim = claim(_self);
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
        // first argument is name of CPP class, not contract
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
