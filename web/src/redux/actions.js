import axios from "axios";
import { push } from "react-router-redux";
import { joinRoom, leaveRoom } from "./client";

console.log("REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const CREATE_GAME_API = "/api/game/create";
const JOIN_GAME_API = "/api/game/join";
const GET_QUESTION_BANK_API = "/api/questionbank";

export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const GET_QUESTION_BANK = "GET_QUESTION_BANK";
export const RESET = "RESET";
export const RESTART = "RESTART";

const createGameSuccess = payload => {
  joinRoom(payload.viewer);
  delete payload.viewer.isReady;
  return { type: CREATE_GAME, payload };
};

const joinGameSuccess = payload => {
  joinRoom(payload.viewer);
  delete payload.viewer.isReady;
  return { type: JOIN_GAME, payload };
};

const loadQuestionBankSuccess = payload => {
  return { type: GET_QUESTION_BANK, payload };
};

export const createGame = playerName => {
  const params = { playerName };
  // dispatch fetch
  return async dispatch => {
    try {
      dispatch(fetchQuestionBank());
      const response = await axios.post(CREATE_GAME_API, params);
      dispatch(createGameSuccess({ ...response.data }));
      return response.data.room.number;
    } catch (error) {
      // handle fail
      console.error(error);
    }
  };
};

export const fetchQuestionBank = () => {
  // dispatch fetch
  return async dispatch => {
    try {
      const response = await axios.get(GET_QUESTION_BANK_API);
      dispatch(loadQuestionBankSuccess({ ...response.data }));
    } catch (error) {
      // handle fail
      console.error(error);
    }
  };
};

// export const reset = () => async dispatch => {
//   await dispatch({ type: RESET });
// };

export const joinGame = (roomNo, playerName) => {
  const params = { roomNo, playerName };
  // dispatch fetch
  return async dispatch => {
    dispatch(fetchQuestionBank());
    const response = await axios.post(JOIN_GAME_API, params);
    dispatch(joinGameSuccess({ ...response.data }));
    dispatch(push(`/join/${response.data.room.number}`));
    // return response.data.room.number;
  };
};

export const leave = () => {
  return async dispatch => {
    leaveRoom();
    console.log("Reset");
    dispatch({ type: RESET });
  };
};
