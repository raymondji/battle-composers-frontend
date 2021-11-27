const basicAttackGenerator = (playerPos, playerDir) => {
  return {
    hit: false,
    hitboxes: [
      {
        frames: 10,
        tilesHit: [{ row: playerPos.row + playerDir, col: playerPos.col }],
      },
      {
        frames: 10,
        tilesHit: [{ row: playerPos.row + playerDir * 2, col: playerPos.col }],
      },
      {
        frames: 10,
        tilesHit: [{ row: playerPos.row + playerDir * 3, col: playerPos.col }],
      },
    ],
  };
};

const START_ATTACK_ACTION = 'startAttackAction';
function createStartAttackAction(playerId, playerPos, attackGenerator) {
  const id = frame;
  return {
    type: START_ATTACK_ACTION,
    id,
    playerId,
    attack: attackGenerator(playerPos, playerId === 0 ? 1 : -1),
  };
}

function applyStartAttackAction(gameState, startAttackAction) {
  const playerId = startAttackAction.playerId;
  const player = gameState.players[playerId];
  const newPlayers = {
    ...gameState.players,
  };
  const newAttacks = [...player.ongoingAttacks, startAttackAction.attack];
  newPlayers[playerId] = {
    ...player,
    ongoingAttacks: newAttacks,
  };

  const nextGameState = {
    ...gameState,
    players: newPlayers,
    lastAction: startAttackAction,
  };

  return nextGameState;
}

function testAttacks() {
  const action = createStartAttackAction(
    0,
    { row: 0, col: 0 },
    basicAttackGenerator
  );
  if (action.attack.hitboxes.length !== 3) {
    throw new Error('Incorrect attack action');
  }

  const nextGameState = applyStartAttackAction(INITIAL_GAME_STATE, action);
  console.log('nextGameState', nextGameState);
  if (nextGameState.players[0].ongoingAttacks.length !== 1) {
    throw new Error('Missing ongoing attacks');
  }
}
testAttacks();
