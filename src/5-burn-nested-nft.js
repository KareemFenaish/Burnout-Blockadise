import { connectSdk } from "./utils/connect-sdk.js";

const burnNestedNft = async () => {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error("run this command: node ./src/5-burn-nested-nft.js {driverCollectionId} {driverTokenId} {nestedCollectionId} {nestedTokenId}");
    process.exit(1);
  }

  const [driverCollectionId, driverTokenId, nestedCollectionId, nestedTokenId] = args;

  const {sdk} = await connectSdk();

  try {
    // First, unnest the NFT
    await sdk.token.unnest({
      parent: {
        collectionId: driverCollectionId,
        tokenId: driverTokenId,
      },
      nested: {
        collectionId: nestedCollectionId,
        tokenId: nestedTokenId,
      },
    });

    console.log(`NFT ${nestedCollectionId}/${nestedTokenId} successfully unnested from driver NFT ${driverCollectionId}/${driverTokenId}`);

    // Then, burn the NFT
    const burnTx = await sdk.token.burn({
      collectionId: nestedCollectionId,
      tokenId: nestedTokenId,
    });

    console.log(`NFT ${nestedCollectionId}/${nestedTokenId} successfully burned (deleted) from the blockchain`);
    console.log('Burn transaction details:', burnTx);
  } catch (error) {
    console.error('Error during unnesting or burning NFT:', error.message);
  }

  process.exit(0);
}

burnNestedNft().catch(e => {
  console.log('Something went wrong during unnesting and burning');
  throw e;
});
