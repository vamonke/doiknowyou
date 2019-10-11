import axios from "axios";
import { joinRoom, leaveRoom } from "./socket";

axios.defaults.baseURL = "http://localhost:3001";
const CREATE_GAME_API = "/api/game/create";
const JOIN_GAME_API = "/api/game/join";

export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const RESET = "RESET";

const createGameSuccess = payload => {
  joinRoom(payload.viewer);
  return { type: CREATE_GAME, payload };
};

const joinGameSuccess = payload => {
  joinRoom(payload.viewer);
  return { type: JOIN_GAME, payload };
};

export const createGame = playerName => {
  const params = { playerName };
  // dispatch fetch
  return async dispatch => {
    try {
      const response = await axios.post(CREATE_GAME_API, params);
      dispatch(createGameSuccess({ ...response.data }));
      return response.data.room.number;
    } catch (error) {
      // handle fail
      console.error(error);
    }
  };
};

export const joinGame = (roomNo, playerName) => {
  const params = { roomNo, playerName };
  // dispatch fetch
  return async dispatch => {
    try {
      const response = await axios.post(JOIN_GAME_API, params);
      dispatch(joinGameSuccess({ ...response.data }));
      return response.data.room.number;
    } catch (error) {
      // handle fail
      console.error(error);
    }
  };
};

export const reset = () => {
  const resetSuccess = () => {
    return { type: RESET };
  };
  return async dispatch => {
    leaveRoom();
    dispatch(resetSuccess());
  };
};
