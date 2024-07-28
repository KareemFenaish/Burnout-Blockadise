import { connectSdk } from "./utils/connect-sdk.js";

const achievements = [
  { name: "Race_Count_1", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmPaJ24W5T3RfHFvtyWesJcqUPi6UF7F7bf2nRBwssiJW5" },
  { name: "Race_Count_2", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmQehhZ8YqotpYmoAe4KKkEeTiNH74aC1qsuHjoYXRgD2b" },
  { name: "Race_Count_3", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmYzmu6SJ4WhGChNV5Rp39UMTNYhb8rrDtReuh3Mmk8YbC" },
  { name: "Race_Count_4", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmdC5Z1PiYtNn8zLjmvzk7cCMfP8d7uPKEgyMgigTCfez3" },
  { name: "Time_Atk_1", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmaEGsfG9jQXY2F8bKUCM8MtN8c78ZYR4AGQAi5jgrruNU" },
  { name: "Time_Atk_2", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmQUsHMHcvvP8vbjeHYqMhMB8o3Ad2g1ncvQsfaBLumxis" },
  { name: "Time_Atk_3", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmSWYTSSDHSUDLTBkpo862sxWvbKwe8eRNhkeGSG9AB96c" },
  { name: "Time_Atk_4", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmYQTSkLdhFViyxS5kBkueGjxyFFyLrbnAgb7rhVLZaLEf" },
  { name: "Top_Speed_1", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmZMo9BRUzmyktf5XMqk7Li58sXhQbJXLkMHoFW4tPj4Ki" },
  { name: "Top_Speed_2", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmdU3vaeNLmJguL2VML5BSXFidVnVQWYex2eaDsDd3jvYP" },
  { name: "Top_Speed_3", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmT9rENG5GRhiPGtgjELGezNuipGj5Rjs9JvKBFHBA86gE" },
  { name: "Top_Speed_4", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmZMrLoc4ff4DdJxMivEdZNFpcANMGBETgXw4JUf3FyAb6" },
];

const createAndNestAchievement = async () => {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error("run this command: node ./src/3-create-achievement.js {achievementCollectionId} {driverCollectionId} {driverTokenId} {achievementName}");
    process.exit(1);
  }

  const [achievementCollectionId, driverCollectionId, driverTokenId, achievementName] = args;

  const {account, sdk} = await connectSdk();

  // Find the achievement data
  const achievementData = achievements.find(a => a.name === achievementName);
  if (!achievementData) {
    console.error(`Achievement "${achievementName}" not found`);
    process.exit(1);
  }

  // Create achievement NFT
  const createTx = await sdk.token.createV2({
    collectionId: achievementCollectionId,
    owner: account.address,
    image: achievementData.image,
    attributes: [
      {
        trait_type: "Name",
        value: achievementData.name,
      },
    ],
  });

  const achievementToken = createTx.parsed;
  if (!achievementToken) throw Error("Cannot parse created achievement token");

  console.log(`Achievement NFT created: https://uniquescan.io/opal/tokens/${achievementCollectionId}/${achievementToken.tokenId}`);

  // Nest achievement NFT into driver NFT
  const nestTx = await sdk.token.nest({
    parent: {
      collectionId: driverCollectionId,
      tokenId: driverTokenId,
    },
    nested: {
      collectionId: achievementCollectionId,
      tokenId: achievementToken.tokenId,
    },
  });

  console.log(`Achievement ${achievementCollectionId}/${achievementToken.tokenId} nested into driver NFT ${driverCollectionId}/${driverTokenId}`);

  process.exit(0);
}

createAndNestAchievement().catch(e => {
  console.log('Something went wrong during achievement creation or nesting');
  throw e;
});
