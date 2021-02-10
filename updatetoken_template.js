// DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenUpdateTransaction, TokenId } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const tokenId = TokenId.fromString(process.env.TOKEN_ID_1);

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    //Create the transaction and freeze for manual signing
    const transaction = await new TokenUpdateTransaction()
     .setTokenId(tokenId)
     // add 
     .setTokenName("Dark Magic")
     //.setTokenSymbol(DM)
     .freezeWith(client);

    //Sign the transaction with the admin key
    const signTx = await transaction.sign(operatorKey);

    //Submit the signed transaction to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status.toString();

    console.log("The transaction consensus status is " +transactionStatus);

}

main()