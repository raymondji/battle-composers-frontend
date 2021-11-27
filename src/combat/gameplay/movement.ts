const MOVE_ACTION = 'moveAction';
function createMoveAction(playerId, direction) {
  const id = frame;
  return {
    type: MOVE_ACTION,
    id,
    playerId,
    direction,
  };
}
function applyMoveAction(gameState, moveAction) {
  function getNextPos(pos, direction, playerId) {
    const nextPos = {
      row: pos.row + direction.row,
      col: pos.col + direction.col,
    };

    if (
      nextPos.row < 0 ||
      nextPos.col < 0 ||
      nextPos.row >= NUM_COLS ||
      nextPos.col >= NUM_ROWS
    ) {
      // can only stay within the board
      return pos;
    }

    if (playerId == 0 && nextPos.row >= NUM_COLS / 2) {
      // can only stay on the left side
      return pos;
    }

    if (playerId == 1 && nextPos.row < NUM_COLS / 2) {
      // can only stay on the right side
      return pos;
    }

    // next pos is valid
    return nextPos;
  }

  const player = gameState.players[moveAction.playerId];
  console.log('player', player);
  console.log('moveAction', moveAction);
  const newPlayers = {
    ...gameState.players,
  };
  newPlayers[moveAction.playerId] = {
    ...player,
    pos: getNextPos(player.pos, moveAction.direction, moveAction.playerId),
  };

  const nextGameState = {
    ...gameState,
    players: newPlayers,
    lastAction: moveAction,
  };

  return nextGameState;
}
