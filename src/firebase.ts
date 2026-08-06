import { initializeApp } from 'firebase/app';
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

initializeApp({
  apiKey: 'AIzaSyBnAiZcpvRx3eiqQrQDYgZaoJXRgdvY4x4',
  authDomain: 'fir-demo-e74da.firebaseapp.com',
  projectId: 'fir-demo-e74da',
  storageBucket: 'fir-demo-e74da.firebasestorage.app',
  messagingSenderId: '707698061032',
  appId: '1:707698061032:web:b7c4259a7b3938c7d5635d',
});

export const dc = getDataConnect(connectorConfig);

if (process.env.USE_FIREBASE_EMULATOR !== 'false') {
  connectDataConnectEmulator(dc, '127.0.0.1', 9399);
  console.log('🔧 Data Connect : mode ÉMULATEUR LOCAL (127.0.0.1:9399)');
  console.log('   Les données ne sont PAS visibles dans la console Firebase.');
  console.log('   Pour la production : USE_FIREBASE_EMULATOR=false + firebase deploy --only dataconnect');
} else {
  console.log('☁️  Data Connect : mode PRODUCTION (Cloud SQL)');
}
