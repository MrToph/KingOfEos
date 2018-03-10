/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <KingOfEOS.hpp>

using namespace eosio;
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
                // eosio::require_auth(message.from);
                // eosc push message simpledb insertkv1 '{"key":"a", "value":"aa"}' -S simpledb
                    // eosc get table simpledb simpledb keyvalue1
                    // const auto &kv1 = eosio::current_message<key_value1>();
                    // eosio::print("Inserting key_value1\n");
                    // eosio::dump(kv1);
                    // bytes b = eosio::raw::pack(kv1.value);
                    // uint32_t err = store_str( N(simpledb), N(keyvalue1), (char *)kv1.key.get_data(), kv1.key.get_size(), (char*)b.data, b.len);
            }
        }
    }

} // extern "C"
