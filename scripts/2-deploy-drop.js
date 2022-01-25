import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const app = sdk.getAppModule('0xb160e7EcCDf0A645831F6e7a6eBAa06f5361a9C4');

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: 'ReDAO Membership',
      // A description for the collection.
      description: 'A DAO to Do Our Own Research.',
      // The image for the collection that will show up on OpenSea.
      image: readFileSync('scripts/assets/ReDAO.jpg'),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      '✅ Successfully deployed bundleDrop module, address:',
      bundleDropModule.address
    );
    // Successfully deployed bundleDrop module, address: 0x8ceBd1Bc7953F1eBd5856bb3b1A1C4C8080dad7d
    console.log(
      '✅ bundleDrop metadata:',
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log('failed to deploy bundleDrop module', error);
  }
})();
