import { connectSdk } from "./utils/connect-sdk.js";

const upgradeParts = [
  { 
    name: "brake_rotors", 
    image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/Qmf2av4hjNqMUfSy3CaV46C8n1b5t2APyzpECUs9yY6XYG",
    boostStat: "Braking",
    description: "Boosts Braking by 30%"
  },
  { 
    name: "lightweight_rims", 
    image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmdtqSSyTt6RcU6ahERyUQfn7sSxzExzWD5beEBZjHFo5h",
    boostStat: "Acceleration",
    description: "Boosts Acceleration by 30%"
  },
  { 
    name: "ultra_lightweight_rims", 
    image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmTbp2jQ6x7kXiWdFFr2vgsV5GBvbf4nJRBqqrLjEJ2CMq",
    boostStat: "Handling",
    description: "Boosts Handling by 30%"
  },
  { 
    name: "exhaust_system", 
    image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/Qmdeq3WgrJ3QM7kTgebTjm8V5CZbCDJMo2WuikLg8Bracy",
    boostStat: "Top Speed",
    description: "Boosts Top Speed by 30%"
  },
  { 
    name: "engine_block", 
    image: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmcNfQeSJU7bDHGjCXuxnqsMgfJFTU6B8ZxUH7xneHmkQJ",
    boostStat: "Horsepower",
    description: "Boosts Horsepower by 30%"
  }
];

const createAndNestUpgradePart = async () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("run this command: node ./src/3-create-upgrade-part.js {upgradePartCollectionId} {driverCollectionId} {driverTokenId}");
    process.exit(1);
  }

  const [upgradePartCollectionId, driverCollectionId, driverTokenId] = args;

  const {account, sdk} = await connectSdk();

  // Randomly select an upgrade part
  const randomUpgradePart = upgradeParts[Math.floor(Math.random() * upgradeParts.length)];

  // Create upgrade part NFT
  const createTx = await sdk.token.createV2({
    collectionId: upgradePartCollectionId,
    owner: account.address,
    image: randomUpgradePart.image,
    attributes: [
      {
        trait_type: "Name",
        value: randomUpgradePart.name,
      },
      {
        trait_type: "Description",
        value: randomUpgradePart.description,
      },
      {
        trait_type: "Boosted Stat",
        value: randomUpgradePart.boostStat,
      },
      {
        trait_type: "Boost Percentage",
        value: "30%",
      }
    ],
  });

  const upgradePartToken = createTx.parsed;
  if (!upgradePartToken) throw Error("Cannot parse created upgrade part token");

  console.log(`Upgrade Part NFT created: https://uniquescan.io/opal/tokens/${upgradePartCollectionId}/${upgradePartToken.tokenId}`);
  console.log(`Upgrade Part Name: ${randomUpgradePart.name}`);
  console.log(`Description: ${randomUpgradePart.description}`);

  // Nest upgrade part NFT into driver NFT
  const nestTx = await sdk.token.nest({
    parent: {
      collectionId: driverCollectionId,
      tokenId: driverTokenId,
    },
    nested: {
      collectionId: upgradePartCollectionId,
      tokenId: upgradePartToken.tokenId,
    },
  });

  console.log(`Upgrade Part ${upgradePartCollectionId}/${upgradePartToken.tokenId} nested into driver NFT ${driverCollectionId}/${driverTokenId}`);

  process.exit(0);
}

createAndNestUpgradePart().catch(e => {
  console.log('Something went wrong during upgrade part creation or nesting');
  throw e;
});
