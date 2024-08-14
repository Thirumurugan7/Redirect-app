import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  baseSepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

import { ProtocolFamily } from "@coinbase/waas-sdk-web";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base,baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <WalletProvider
      verbose
      enableHostedBackups={true}
      collectAndReportMetrics
      prod={false}
      projectId={"0f9bcc25-9ab2-42b5-90d2-122588e83383"}
    >
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
    <App />
    </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
</WalletProvider>
);

