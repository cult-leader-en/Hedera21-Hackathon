//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TransferTransaction} = require("@hashgraph/sdk");


async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const AbundanceCoin = TokenId.fromString(process.env.ABD);

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    const account2Id = AccountId.fromString(process.env.ACCOUNT_ID_2);

    //Create the transfer transaction
    const transaction = await new TransferTransaction()
        .addTokenTransfer(AbundanceCoin, operatorId, -100)
        .addTokenTransfer(AbundanceCoin, account2Id, 100)
        .freezeWith(client);
    
    //Sign with the sender account private key
    const signTx = await transaction.sign(operatorKey);
        
  
    //Sign with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);
        
    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);
        
    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());
        
    
}

main();