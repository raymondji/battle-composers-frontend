// Returns the next game state based on the current gameState and an action to apply.
// Does not modify gameState.
// all actions should have the id, playerId and type fields.
function applyAction(gameState, action) {
  switch (action.type) {
    case MOVE_ACTION:
      return applyMoveAction(gameState, action);
    case START_ATTACK_ACTION:
      return applyStartAttackAction(gameState, action);
    default:
      throw new Error('unknown action type');
  }
}

// Updates gameStateLog and actionsLog given a localAction
function applyLocalAction(localAction) {
  console.log('applying local action');
  // append to actionsLog
  actionsLog.push(localAction);
  // build new gamestate
  const nextGameState = applyAction(gameStateLog.at(-1), localAction);
  // append to gameStateLog
  gameStateLog.push(nextGameState);
  broadcastAction(localAction);

  console.log('done local action, new game state log', gameStateLog);
}

// Updates gameStateLog and actionsLog given a localAction
function applyRemoteAction(remoteAction) {
  // insert action in actionsLog in the correct sorted spot
  // TODO: we can throw away all previous actions since we have all remote data
  // at until that point.
  const prevActions = actionsLog.filter((action) =>
    inOrder(action, remoteAction)
  );
  const replayActions = [
    remoteAction,
    ...actionsLog.filter((action) => inOrder(remoteAction, action)),
  ];
  actionsLog = [...prevActions, ...replayActions];
  // find the previous gameState and throw away any future state
  gameStateLog = gameStateLog.filter((gameState) =>
    inOrder(gameState.lastAction, remoteAction)
  );
  // TODO: also throw away any previous game state except the most recent.
  // We have remote events up to that point, so we'll never need to overwrite it
  // gameStateLog = [gameStateLog.at(-1)];
  // regenerate the remaining gamestates
  for (const action of replayActions) {
    const nextGameState = applyAction(gameStateLog.at(-1), action);
    gameStateLog.push(nextGameState);
    console.log('nextGameState', nextGameState);
    console.log('action', action);
  }
  console.log('done remote action, new game state log:', gameStateLog);
}

// returns true if actionB comes after actionA
// returns false otherwise
function inOrder(firstAction, secondAction) {
  if (firstAction === undefined) {
    return true;
  }

  if (secondAction.id === firstAction.id) {
    return secondAction.playerId > firstAction.playerId;
  }

  return secondAction.id > firstAction.id;
}
