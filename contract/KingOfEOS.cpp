/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <KingOfEOS.hpp>

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
    //    eosio::print( "Hello World: ", eosio::name(code), "->", eosio::name(action), "\n" );
       if( action == N(transfer) ) {
          auto message = eosio::current_message<transfer>();
          eosio::require_auth(message.from);
          assert( message.quantity > 0, "Must transfer a quantity greater than 0" );
          eosio::print( "Transfer ", message.quantity, " from ", message.from, " to ", message.to, "\n" );
       }
    }

} // extern "C"
