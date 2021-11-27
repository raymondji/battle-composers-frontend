function createPlayer(id, startingPos, color) {
  return {
    id,
    pos: startingPos,
    health: 100,
    color: color,
    ongoingAttacks: [],
  };
}
