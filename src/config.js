const contractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'nearpump3.testnet',
};

// Chains for EVM Wallets 
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: "Near Mainnet",
    explorer: "https://nearblocks.io/es",
    rpc: "https://free.rpc.fastnear.com",
  },
  testnet: {
    chainId: 398,
    name: "Near Testnet",
    explorer: "https://testnet.nearblocks.io/es",
    rpc: "https://test.rpc.fastnear.com",
  },
}

export const NetworkId = 'testnet';
export const HelloNearContract = contractPerNetwork[NetworkId];
export const EVMWalletChain = evmWalletChains[NetworkId];