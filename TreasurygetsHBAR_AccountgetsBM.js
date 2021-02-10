//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TransferTransaction, Hbar } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    // Account transfer to
    const accountId2 = AccountId.fromString(process.env.ACCOUNT_ID_2);
    const accountKey2 = PrivateKey.fromString(process.env.ACCOUNT_KEY_2);

    // Token
    const BlackMagic = TokenId.fromString(process.env.BM);

    // Swap token and Hbar
    const atomicSwap = await new TransferTransaction()
        .addHbarTransfer(operatorId, new Hbar(1))
        .addHbarTransfer(accountId2, new Hbar(-1))
        .addTokenTransfer(BlackMagic, accountId2, 1)
        .addTokenTransfer(BlackMagic, operatorId, -1)
        .freezeWith(client);

    //Sign the transaction with accountId1 and accountId2 private keys, submit the transaction to a Hedera network
    const txResponse = await (await (await atomicSwap.sign(operatorKey)).sign(accountKey2)).execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status.toString();

    console.log("The transaction consensus status is " +transactionStatus);
}

main()
    