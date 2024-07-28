import { connectSdk } from "./utils/connect-sdk.js";

const nestAchievement = async () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("run this command: node ./src/4-nest-achievement.js {driverCollectionId} {driverTokenId} {achievementCollectionId}");
    process.exit(1);
  }

  const [driverCollectionId, driverTokenId, achievementCollectionId] = args;

  const {sdk} = await connectSdk();

  const nestTx = await sdk.token.nest({
    parent: {
      collectionId: driverCollectionId,
      tokenId: driverTokenId,
    },
    nested: {
      collectionId: achievementCollectionId,
      tokenId: '1', // Specify an actual achievement NFT ID here
    },
  });
  

  console.log(`Achievement collection ${achievementCollectionId} nested into driver NFT ${driverCollectionId}/${driverTokenId}`);

  process.exit(0);
}

nestAchievement().catch(e => {
  console.log('Something went wrong during nesting');
  throw e;
});
