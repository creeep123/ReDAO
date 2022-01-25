import sdk from './1-initialize-sdk.js';

const bundleDrop = sdk.getBundleDropModule(
  '0x8ceBd1Bc7953F1eBd5856bb3b1A1C4C8080dad7d'
);

// 设定合约mint的一些参数，如开始时间和数量上限
(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions.
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    // 最后，我们做bundleDrop.setClaimCondition(0, claimConditionFactory)，这实际上将与我们在链上部署的合同进行互动，并调整条件，非常酷！
    // 为什么我们传入0？为什么我们要传入一个0？嗯，基本上我们的成员NFT有一个tokenId为0，因为它是我们ERC-1155合约中的第一个token。
    // 记住--在ERC-1155中，我们可以让多个人铸造同一个NFT。在这种情况下，每个人都铸造一个NFT，ID为0。但是，我们也可以有一个不同的NFT，ID为1，
    // 也许我们可以把NFT给我们DAO的优秀成员！这都取决于我们。这一切都取决于我们。
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log(
      '✅ Successfully set claim condition on bundle drop:',
      bundleDrop.address
    );
  } catch (error) {
    console.error('Failed to set claim condition', error);
  }
})();
