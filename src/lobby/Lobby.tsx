import React, { useEffect, useMemo } from 'react';
import {useSocket} from "../socket";
import { nanoid } from 'nanoid'
import { CharacterSelection } from "./CharacterSelection";
import './Lobby.css';

const URL = "https://battle-composers-frontend.raymondji.repl.co";

export function Lobby() {
  const { socket, clients, roomId, setRoomId } = useSocket();
  const joinUrl = `${URL}/?room=${roomId}`;
  const numPlayers = clients.length;
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlRoomId = urlParams.get('room');

    if (urlRoomId) {
      setRoomId(urlRoomId);
    } else {
      setRoomId(nanoid());
    }
  }, []);

  return <div>
    <p>Send this link to join: {joinUrl}</p>
    <p>Num players: {numPlayers}</p>
    {numPlayers === 2 && <CharacterSelection />}
  </div>;
}