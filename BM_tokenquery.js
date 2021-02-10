require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenId, TokenInfoQuery } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const tokenId = TokenId.fromString(process.env.BM);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    //Create the query
    const query = await new TokenInfoQuery()
        .setTokenId(tokenId)
        .execute(client);

    console.log("The total supply of this token is " +query.totalSupply);
    console.log("The name of this token is " +query.name)
    console.log("The symbol of this token is " +query.symbol)
    console.log("The treasury account of this token is " +query.treasuryAccountId)
    console.log("The admin key of this token is " +query.adminKey)
}

main()