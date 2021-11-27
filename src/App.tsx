import * as React from 'react';
import './App.css';
import {Lobby} from './lobby/Lobby';
import {SocketProvider} from './socket';

export default function App() {
  return (
    <main>
      <SocketProvider>
        <h1>Battle composers</h1>
        <Lobby />
      </SocketProvider>
    </main>
  );
}