import { connectSdk } from "./utils/connect-sdk.js";

const createCollection = async () => {
  const {sdk} = await connectSdk();

  const {parsed} = await sdk.collection.createV2({
    name: "Burnout Blockadise Achievements",
    description: "Achievements for Burnout Blockadise",
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

  process.exit(0);
}


createCollection().catch(e => {
  console.log('Something wrong during collection creation');
  throw e;
});