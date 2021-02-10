//DONE
require("dotenv").config();

const { Client, AccountId, PrivateKey, AccountBalanceQuery } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    //Create the query
    const query = new AccountBalanceQuery()
    .setAccountId(operatorId);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await query.execute(client);

    console.log("The token balance(s) for this account: " +tokenBalance.tokens);

}

main()