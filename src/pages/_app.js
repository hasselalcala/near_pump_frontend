import { useEffect, useState } from 'react';

import '@/styles/globals.css';
import { Navigation } from '@/components/navigation';

import { Wallet, NearContext } from '@/wallets/near';
import { NetworkId, HelloNearContract } from '@/config';

import { WebSocketContext, WebSocketProvider } from '@/contexts/WebSocketContext';
//const wallet = new Wallet({ networkId: NetworkId });

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId) }, []);

  useEffect(() => {
    // Request notification permission when the app loads
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <WebSocketProvider>
        <Navigation />
        <Component {...pageProps} />
      </WebSocketProvider>
    </NearContext.Provider>
  );
}
