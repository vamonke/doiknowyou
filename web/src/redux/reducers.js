import { CREATE_GAME, JOIN_GAME, GET_QUESTION_BANK, RESET } from "./actions";
import {
  SOCKET_PLAYER_JOINED,
  SOCKET_PLAYER_READY,
  SOCKET_PLAYER_NOT_READY
} from "./events";

const defaultState = {
  room: {},
  players: {},
  viewer: {}
};

const reducers = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
    case JOIN_GAME:
    case GET_QUESTION_BANK:
      return { ...state, ...payload };
    case SOCKET_PLAYER_READY:
      state.players[payload].isReady = true;
      return { ...state };
    case SOCKET_PLAYER_NOT_READY:
      state.players[payload].isReady = false;
      return { ...state };
    case SOCKET_PLAYER_JOINED:
      return { ...state, players: { ...payload } };
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default reducers;
