const UP = { row: 0, col: -1 };
const DOWN = { row: 0, col: 1 };
const LEFT = { row: -1, col: 0 };
const RIGHT = { row: 1, col: 0 };
const NUM_ROWS = 4;
const NUM_COLS = 6;
const FPS = 30;
const TIME_STEP_MS = 1000 / FPS;
const INITIAL_GAME_STATE = {
  players: {
    0: createPlayer(0, { row: 0, col: 0 }, 'red'),
    1: createPlayer(1, { row: 5, col: 3 }, 'blue'),
  },
  lastAction: undefined,
};
const RUN_TESTS = true;
