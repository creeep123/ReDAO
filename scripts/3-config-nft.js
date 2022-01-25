import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule(
  '0x8ceBd1Bc7953F1eBd5856bb3b1A1C4C8080dad7d'
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Paper',
        description: 'This NFT will give you access to ReDAO!',
        image: readFileSync('scripts/assets/paper-nft.png'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();
