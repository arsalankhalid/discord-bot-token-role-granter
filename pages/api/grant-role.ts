import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { ethers } from "ethers"
// Import your ABI from a JSON file

// how to import your ABI from a JSON file
// https://stackoverflow.com/questions/52200378/how-to-import-json-file-in-typescript

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[],"name":"GRYFFINDOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HUFFLEPUFF","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RAVENCLAW","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLYTHERIN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256[]","name":"_burnIds","type":"uint256[]"},{"internalType":"uint256[]","name":"_burnAmounts","type":"uint256[]"},{"internalType":"uint256[]","name":"_mintIds","type":"uint256[]"},{"internalType":"uint256[]","name":"_mintAmounts","type":"uint256[]"}],"name":"burnForMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"mintBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"setURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
export default async function grantRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the login payload out of the request
  console.log(req.body);
  const { loginPayload } = JSON.parse(req.body);
  // Get the Next Auth session so we can use the user ID as part of the discord API request
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  // Authenticate login payload
  const sdk = new ThirdwebSDK("mumbai");
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today"); // what are the arguments? the argument is the network, but how to get the network?
console.log(provider);
const hogwartsContract = new ethers.Contract("0x5c4178bde46d64c1823d185db18113e39c3e286a",abi,provider); // arguments : address, abi, provider
console.log(hogwartsContract);

  const domain = "example.com";
  // Verify the login payload is real and valid
  const verifiedWalletAddress = sdk.auth.verify(domain, loginPayload);

  // If the login payload is not valid, return an error
  if (!verifiedWalletAddress) {
    res.status(401).json({ error: "Invalid login payload" });
    return;
  }
  console.log(verifiedWalletAddress);
console.log('line 44');
//  reason: 'missing argument: passed to contract', what is the second argument? : the address of the user

const balance = await hogwartsContract.balanceOf(verifiedWalletAddress, 1);
console.log('balance');
console.log(balance);
console.log('balance.toNumber()');
console.log(balance.toNumber());
  if (balance.toNumber() > 0) {
    // If the user is verified and has an NFT, return the content
    // Make a request to the Discord API to get the servers this user is a part of
    // @ts-ignore
    const { userId } = session;
    console.log('userId' + userId)
   const roleId="1042522846406131732";
    console.log(`https://discordapp.com/api/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}/roles/${roleId}`)
    const response = await fetch(
      // Discord Developer Docs for this API Request: https://discord.com/developers/docs/resources/guild#add-guild-member-role
      `https://discordapp.com/api/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}/roles/${roleId}`,
      {
        headers: {
          // Use the bot token to authenticate the request
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
        method: "PUT",
      }
    );

    // If the role was granted, return the content
    if (response.ok) {
      res.status(200).json({ message: "Role granted" });
    }

    // Something went wrong granting the role, but they do have an NFT
    else {
      const resp = await response.json();
      console.error(resp);
      res
        .status(500)
        .json({ error: "Error granting role, are you in the server?" });
    }
  }
  // If the user is verified but doesn't have an NFT, return an error
  else {
    res.status(401).json({ error: "User does not have an NFT" });
  }
}
