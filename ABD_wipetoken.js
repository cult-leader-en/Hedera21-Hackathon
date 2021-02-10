//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TokenWipeTransaction } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const tokenId = TokenId.fromString(process.env.ABD);

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    // 0.00 = 000
    //Wipe 100 tokens from an account and freeze the unsigned transaction for manual signing
    const account2Id = AccountId.fromString(process.env.ACCOUNT_ID_2);
    const transaction = await new TokenWipeTransaction()
     .setAccountId(account2Id)
     .setTokenId(tokenId)
     .setAmount(30)
     .freezeWith(client);

    //Sign with the private key of the account that is being wiped, sign with the wipe private key of the token
    const signTx = await (await transaction.sign(operatorKey)).sign(operatorKey);    

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());


}

main()