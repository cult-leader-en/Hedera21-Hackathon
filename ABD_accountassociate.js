//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TokenAssociateTransaction } = require("@hashgraph/sdk");



async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const tokenId = TokenId.fromString(process.env.ABD);
    
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    //grab account from env file
    const account2Id = AccountId.fromString(process.env.ACCOUNT_ID_2);
    const account2Key = PrivateKey.fromString(process.env.ACCOUNT_KEY_2); 

    //Associate a token to an account and freeze the unsigned transaction for signing
    var transaction = await new TokenAssociateTransaction()
        .setAccountId(account2Id)
        .setTokenIds([tokenId])
        .freezeWith(client);
        
    //Sign with the private key of the account that is being associated to a token 
    const signTx = await transaction.sign(account2Key);

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