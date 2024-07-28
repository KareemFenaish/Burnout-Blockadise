import { connectSdk } from "./utils/connect-sdk.js";
import { getRandomInt } from "./utils/random.js";


// node ./src/create-token.js {collectionId} {address} {nickname}
// i.e. node ./src/create-token.js 3131 5HRADyd2sEVtpqh3cCdTdvfshMV7oK4xXJyM48i4r9S3TNGH Speedy777
const createToken = async () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("run this command: node ./src/3-create-car.js {collectionId} {address} {nickname}");
    process.exit(1);
  }

  const [collectionId, owner, nickname] = args;

  const {account, sdk} = await connectSdk();

  // Get pseudo-random car image for fun
  const imageLinks = [
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmTPRGya7Cv8jD1REgqw49TVk15ME83wNWGrr3MiLAa4Gg",
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmZoqDfHijxLJucw3DoHM8pnTPQ33N6seUfY9n9j4JyuFF",
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmWLS8uCVsG2k27oWnkLFcCVSRrhdH1ByWTTsKW9htnTuC",  // Pexels Image
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmbqM42anwxtyJcdZwEuJ2aTiErLzDJJ3hfVJhxUnDY4A4",
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/QmSQi7AhvnEC3yxeH3rkXNWhQQUD2dyyjdq52737AuXGdE", 
    "https://rose-adjacent-koi-133.mypinata.cloud/ipfs/Qmehi3inZD5iqde6RWH77jXtci4vY8Zef9dFrLXC8RsFZe", // Lorem Picsum
    // Add more image links here
  ];
  
  const tokenImage = imageLinks[Math.floor(Math.random() * imageLinks.length)];

  const tokenTx = await sdk.token.createV2({
    collectionId,
    image: tokenImage,
    owner,
    attributes: [
      {
        trait_type: "Nickname",
        value: nickname,
      },
      {
        trait_type: "Distance Traveled",
        value: 0,
      },
      {
        trait_type: "Number of Completed Races",
        value: 0,
      },
      {
        trait_type: "Downtown Best Time",
        value: 0.0,
      },
      {
        trait_type: "Total Playtime",
        value: 0,
      },
      {
        trait_type: "Highest Achieved Speed",
        value: 0,
      },
      {
        trait_type: "Keys Held",
        value: 0,
      }
    ],
  });

  const token = tokenTx.parsed;
  if (!token) throw Error("Cannot parse token");

  console.log(`Explore your NFT: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`);
 
  process.exit(0);
}


createToken().catch(e => {
  console.log('Something wrong during token creation');
  throw e;
});
