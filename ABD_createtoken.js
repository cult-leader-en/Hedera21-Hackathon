require("dotenv").config();

const { Client, AccountId, PrivateKey, TokenCreateTransaction } = require("@hashgraph/sdk");

async function main() {
 
    // Configure Client
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);


    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    // Create a new token on HTS
    var tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName("Abundance Stable Coin")
        .setTokenSymbol("ABD")
        .setDecimals(2)
        .setTreasuryAccountId(operatorId)
        .setAdminKey(operatorKey)
        .setInitialSupply(100)
        .setSupplyKey(operatorKey)
        .setWipeKey(operatorKey)
        .execute(client);

    // Fetch reciept post consensus
    
    var createReceipt = await tokenCreateTx.getReceipt(client);
    
    // Grab unique  token ID from receipt
    var newTokenID = createReceipt.tokenId;

    console.log('new token id: ', newTokenID);
}

main();