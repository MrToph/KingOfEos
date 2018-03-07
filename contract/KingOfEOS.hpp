/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eoslib/eos.hpp>
#include <eoslib/db.hpp>


struct transfer {
    account_name from;
    account_name to;
    uint64_t quantity;
};
