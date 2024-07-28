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
    "Achievement 1": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 2": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
    "Achievement 3": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 4": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
    "Achievement 5": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 6": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
    "Achievement 7": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 8": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
    "Achievement 9": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 10": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
    "Achievement 11": () => {
      // Check conditions for Achievement 1
      // Return true if conditions are met, false otherwise
      return true;
    },
    "Achievement 12": () => {
      // Check conditions for Achievement 2
      // Return true if conditions are met, false otherwise
      return false;
    },
  };

  // Create achievement tokens based on conditions
  await createAchievementTokens(sdk, collectionId, achievementConditions);

  process.exit(0);
}

const createAchievementTokens = async (sdk, collectionId, achievementConditions) => {
  const achievementData = [
    { name: "Achievement 1", image: "images/achievement1.png" },
    { name: "Achievement 2", image: "images/achievement2.png" },
    { name: "Achievement 3", image: "images/achievement3.png" },
    { name: "Achievement 4", image: "images/achievement1.png" },
    { name: "Achievement 5", image: "images/achievement2.png" },
    { name: "Achievement 6", image: "images/achievement3.png" },
    { name: "Achievement 7", image: "images/achievement1.png" },
    { name: "Achievement 8", image: "images/achievement2.png" },
    { name: "Achievement 9", image: "images/achievement3.png" },
    { name: "Achievement 10", image: "images/achievement2.png" },
    { name: "Achievement 11", image: "images/achievement3.png" },
    { name: "Achievement 12", image: "images/achievement12.png" }
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
          // Add any additional attributes for the achievement
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
