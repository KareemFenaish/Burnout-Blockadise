import { connectSdk } from "./utils/connect-sdk.js";

const createUpgradeCollection = async () => {
  const {sdk} = await connectSdk();

  const {parsed} = await sdk.collection.createV2({
    name: "Burnout Blockadise Upgrades",
    description: "Upgrades for Burnout Blockadise cars",
    symbol: "UPG",
    cover_image: {url: "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmaBNEkwhk7gcQ621BjFaeUb5uTagJNtEiYYpsBxih4m5Y"},
    // NOTICE: activate nesting in order to assign upgrades
    permissions: {nesting: {collectionAdmin: true}},
    encodeOptions: {
      // NOTICE: we allow mutation of upgrade tokens for potential future enhancements
      defaultPermission: {collectionAdmin: true, tokenOwner: false, mutable: true},
    }
  });

  if(!parsed) throw Error('Cannot parse minted collection');
  
  const collectionId = parsed.collectionId;
  console.log('Upgrade Collection ID:', collectionId);
  console.log(`Explore your collection: https://uniquescan.io/opal/collections/${collectionId}`);

  process.exit(0);
}

createUpgradeCollection().catch(e => {
  console.log('Something wrong during upgrade collection creation');
  throw e;
});
