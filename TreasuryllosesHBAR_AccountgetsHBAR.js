// DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TransferTransaction, Hbar } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    // Account transfer to
    const accountId2 = AccountId.fromString(process.env.ACCOUNT_ID_3);

    // Create a transaction to transfer 100 hbars
    const transaction = new TransferTransaction()
    .addHbarTransfer(operatorId, new Hbar(-100))
    .addHbarTransfer(accountId2, new Hbar(100));

    //Submit the transaction to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());
}

main()