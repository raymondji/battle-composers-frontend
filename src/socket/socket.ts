import { io } from "socket.io-client";

export function useSocketIO(lobbyId: string, username: string) {
  const [socket, setSocket] = useState();
  const a: number = "5";
  
  useEffect(() => {
    const socket = io('https://music-game-gg.glitch.me:3000');
    setSocket(socket);
  });
}
