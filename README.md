# Hedera21-Hackathon
The code for my Black Magic submission for the Hedera21 Hackathon. This code offers the full suite of HTS API for the Black Magic token (BM) and the Abundance Stable Coin (ABD). The Kabuto Explorer allows easy visualization of the completed code.

# Token Parameters
I used all the functionality provided by HTS. The format is as follows: Token_Function. For example, ABD_minttoken represents the code for the minting of new Abundance Stable Coins.

# Token Transfers
There are two types of token transfers currently functional: atomic swap (between the set treasury account and Hedera account) and token transfers (from set treasury account to Hedera account). Hbar transfers for tokens is possible as well. The format is as follows: Treasurygets[Token]_ Accountgets[Token]. For example, TreasurygetsHBAR_AccountgetsABD represents an swap where treasury account loses ABD and gains HBAR while the Hedera account loses HBAR and gains ABD.

# Note
The ABD and BM tokens have been created. There are templates included if the judges would like to run the code themselves.
