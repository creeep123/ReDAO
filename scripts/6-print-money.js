import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  '0xd75c5527EeB8E6F49B77654c77087973fC430F66'
);

(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1_000_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    // 我们使用 "ethers "的util函数来转换金额。
    // 转换成18位小数（这是ERC20代币的标准）。
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    console.log('amountWith18Decimals :>> ', amountWith18Decimals);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    // Print out how many of our token's are out there now!
    console.log(
      '✅ There now is',
      ethers.utils.formatUnits(totalSupply, 18),
      '$PAPER in circulation'
    );
  } catch (error) {
    console.error('Failed to print money', error);
  }
})();
