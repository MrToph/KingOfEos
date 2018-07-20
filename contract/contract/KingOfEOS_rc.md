### CLAUSE NAME: Warranty
WARRANTY. The invoker of the contract action shall uphold its Obligations under this Contract in a timely and workmanlike manner, using knowledge and recommendations for performing the services which meet generally acceptable standards set forth by EOS.IO Blockchain Block Producers.

### CLAUSE NAME: Default
DEFAULT. The occurrence of any of the following shall constitute a material default under this Contract: 

### CLAUSE NAME: Remedies
REMEDIES. In addition to any and all other rights a party may have available according to law, if a party defaults by failing to substantially perform any provision, term or condition of this Contract, the other party may terminate the Contract by providing written notice to the defaulting party. This notice shall describe with sufficient detail the nature of the default. The party receiving such notice shall promptly be removed from being a Block Producer and this Contract shall be automatically terminated. 
  
### CLAUSE NAME: Force Majeure
FORCE MAJEURE. If performance of this Contract or any obligation under this Contract is prevented, restricted, or interfered with by causes beyond either party's reasonable control ("Force Majeure"), and if the party unable to carry out its obligations gives the other party prompt written notice of such event, then the obligations of the party invoking this provision shall be suspended to the extent necessary by such event. The term Force Majeure shall include, without limitation, acts of God, fire, explosion, vandalism, storm or other similar occurrence, orders or acts of military or civil authority, or by national emergencies, insurrections, riots, or wars, or strikes, lock-outs, work stoppages, or supplier failures. The excused party shall use reasonable efforts under the circumstances to avoid or remove such causes of non-performance and shall proceed to perform with reasonable dispatch whenever such causes are removed or ceased. An act or omission shall be deemed within the reasonable control of a party if committed, omitted, or caused by such party, or its employees, officers, agents, or affiliates. 
  
### CLAUSE NAME: Dispute Resolution
DISPUTE RESOLUTION. Any controversies or disputes arising out of or relating to this Contract will be resolved by binding arbitration under the default rules set forth by the EOS.IO Blockchain. The arbitrator's award will be final, and judgment may be entered upon it by any court having proper jurisdiction. 
  
### CLAUSE NAME: Entire Agreement
ENTIRE AGREEMENT. This Contract contains the entire agreement of the parties, and there are no other promises or conditions in any other agreement whether oral or written concerning the subject matter of this Contract. This Contract supersedes any prior written or oral agreements between the parties. 

### CLAUSE NAME: Severability
SEVERABILITY. If any provision of this Contract will be held to be invalid or unenforceable for any reason, the remaining provisions will continue to be valid and enforceable. If a court finds that any provision of this Contract is invalid or unenforceable, but that by limiting such provision it would become valid and enforceable, then such provision will be deemed to be written, construed, and enforced as so limited. 

### CLAUSE NAME: Amendment
AMENDMENT. This Contract may be modified or amended in writing by mutual agreement between the parties, if the writing is signed by the party obligated under the amendment. 

### CLAUSE NAME: Governing Law
GOVERNING LAW. This Contract shall be construed in accordance with the Maxims of Equity. 

### CLAUSE NAME: Notice
NOTICE. Any notice or communication required or permitted under this Contract shall be sufficiently given if delivered to a verifiable email address or to such other email address as one party may have publicly furnished in writing, or published on a broadcast contract provided by this blockchain for purposes of providing notices of this type. 
### CLAUSE NAME: Waiver of Contractual Right
WAIVER OF CONTRACTUAL RIGHT. The failure of either party to enforce any provision of this Contract shall not be construed as a waiver or limitation of that party's right to subsequently enforce and compel strict compliance with every provision of this Contract. 

### CLAUSE NAME: Arbitrator's Fees to Prevailing Party
ARBITRATOR'S FEES TO PREVAILING PARTY. In any action arising hereunder or any separate action pertaining to the validity of this Agreement, both sides shall pay half the initial cost of arbitration, and the prevailing party shall be awarded reasonable arbitrator's fees and costs.
  
### CLAUSE NAME: Construction and Interpretation
CONSTRUCTION AND INTERPRETATION. The rule requiring construction or interpretation against the drafter is waived. The document shall be deemed as if it were drafted by both parties in a mutual effort. 
  
### CLAUSE NAME: In Witness Whereof
IN WITNESS WHEREOF, the parties hereto have caused this Agreement to be executed by themselves or their duly authorized representatives as of the date of execution, and authorized as proven by the cryptographic signature on the transaction that invokes this contract.

### CLAUSE NAME: Game Rules
GAME RULES. This clause describes the authors and contract invokers intent of the contract. An entity automatically agrees to these rules when calling actions of this contract or when transfering funds to this contract through the `eosio.token` contract's actions.
The game operates in rounds. A new round (kingdom) begins whenever the `init` or `end` action is called.
This contract's account is set as the first _king_ of this round with a starting price of `1.0000 EOS`.
Any EOS account can become the new king by sending `1.35x` the last price as an `eosio.token::transfer` action to the contract account.
The old king loses his king status and receives funds equal to `(1.3/1.35)x` the price the new king paid (`1.3x` the price the _old king_ paid himself).
These funds are transfered immediately as a response to the transfer action through another `eosio.token::transfer` action sent from the contract account to the previous king's account.
Anyone can end and start a new round by calling this contract's `end` action 7 (seven) days after the latest king coronation.
The last king of the old round is not entitled to any funds being paid out in the new round.
The author disclaims all liability for the operation of the contract. No refunds or compensation will be paid. It's up to the block producers to resolve a dispute that does not conform to the intentions set by this contract's and its actions ricardian clauses.