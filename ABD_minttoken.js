//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TokenMintTransaction } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const tokenId = TokenId.fromString(process.env.ABD)
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    //Mint another X tokens and freeze the unsigned transaction for manual signing
    const transaction = await new TokenMintTransaction()
     .setTokenId(tokenId)
     .setAmount(1000)
     .freezeWith(client);

    //Sign with the supply private key of the token 
    const signTx = await transaction.sign(operatorKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());

//v2.0.7
}
main()