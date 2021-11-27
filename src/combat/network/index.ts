import io from 'socket.io-client';

const socket = io('https://music-game-gg.glitch.me:3000');

// server should send match start once both players are connected and ready
// on match start, set frame = 0
//
// periodically check if we agree on the current frame

socket.on('joinConfirmed', function (assignedPlayerId) {
  console.log('assignedPlayerId', assignedPlayerId);
  localPlayerId = assignedPlayerId;
});

socket.on('gameStart', function () {
  frame = 0;
  console.log('gameStarted');
});
socket.on('gameEnded', function () {
  console.log('gameEnded');
});

socket.on('remoteAction', function (remoteActionJSON) {
  const remoteAction = JSON.parse(remoteActionJSON);
  console.log('remoteAction', remoteAction);
  applyRemoteAction(remoteAction);
});

function broadcastAction(localAction) {
  socket.emit('action', JSON.stringify(localAction));
}
function requestJoin() {
  socket.emit('join');
}
