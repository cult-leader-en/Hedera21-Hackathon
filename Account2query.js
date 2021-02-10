// DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, AccountInfoQuery } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    const account2Id = AccountId.fromString(process.env.ACCOUNT_ID_2);

    //Create the account info query
    const query = new AccountInfoQuery()
        .setAccountId(account2Id);

    //Sign with client operator private key and submit the query to a Hedera network
    const accountInfo = await query.execute(client);

    //Print the account info to the console
    console.log(accountInfo);

}

main()