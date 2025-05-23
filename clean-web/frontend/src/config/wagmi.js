import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';

const ganacheChain = {
  id: 1337, 
  name: 'Ganache',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://localhost:7545'] },
  },
};

export const config = createConfig({
  chains: [ganacheChain], 
  connectors: [injected()], 
  transports: {
    [ganacheChain.id]: http(), 
  },
}); 