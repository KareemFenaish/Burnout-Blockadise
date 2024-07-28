import { connectSdk } from "./utils/connect-sdk.js";

const createCollection = async () => {
  const {sdk} = await connectSdk();

  const {parsed} = await sdk.collection.createV2({
    name: "Burnout Blockadise Achievements",
    description: "Achievements for Racing simulation demo",
    symbol: "ACH",
    cover_image: {url: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmZRbmoync4p23TbBzWjYBbC58SDGRLFPT81BPivuoUECc"},
    // NOTICE: activate nesting in order to assign achievements
    permissions: {nesting: {collectionAdmin: true}},
    encodeOptions: {
      // NOTICE: we do not want to mutate tokens of the Achievements collection
      defaultPermission: {collectionAdmin: true, tokenOwner: false, mutable: false},
    }
  });

  if(!parsed) throw Error('Cannot parse minted collection');
  
  const collectionId = parsed.collectionId;
  console.log(`Explore your collection: https://uniquescan.io/opal/collections/${collectionId}`);

  // Define achievement conditions
  const achievementConditions = {
    "Race_Count_1": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Race_Count_2": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Race_Count_3": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Race_Count_4": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Time_Atk_1": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Time_Atk_2": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Time_Atk_3": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Time_Atk_4": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Top_Spd_1": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Top_Spd_2": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Top_Spd_3": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Top_Spd_4": () => {
      // Check conditions
      // Return true if conditions are met, false otherwise
      return true;
    },
  };

  // Create achievement tokens based on conditions
  await createAchievementTokens(sdk, collectionId, achievementConditions);

  process.exit(0);
}

const createAchievementTokens = async (sdk, collectionId, achievementConditions) => {
  const achievementData = [
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
    { name: "Top_Speed_4", image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmZMrLoc4ff4DdJxMivEdZNFpcANMGBETgXw4JUf3FyAb6" }
  ];

  for (const achievement of achievementData) {
    const conditionMet = achievementConditions[achievement.name]();
    if (conditionMet) {
      const tokenTx = await sdk.token.createV2({
        collectionId,
        image: achievement.image,
        owner: sdk.account.address,
        attributes: [
          {
            trait_type: "Name",
            value: achievement.name,
          },
          {
            trait_type: "Description",
            value: "Exchange for 1 key in the in-game trade portal",
          },
        ],
      });

      const token = tokenTx.parsed;
      if (!token) throw Error("Cannot parse token");

      console.log(`Achievement token created: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`);
    } else {
      console.log(`Conditions not met for ${achievement.name}. Skipping token creation.`);
    }
  }
};

createCollection().catch(e => {
  console.log('Something wrong during collection creation');
  throw e;
});
