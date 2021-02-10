//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, PublicKey, AccountCreateTransaction  } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

   //Create the transaction
    const privateKey = await PrivateKey.generate();
    
    const transaction = new AccountCreateTransaction()
    .setKey(privateKey.publicKey);

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the account ID
    const newAccountId = receipt.accountId;

    console.log("The new account ID is " +newAccountId);
    
    console.log("private = " + privateKey);

}

main();