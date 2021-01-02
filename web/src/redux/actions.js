import axios from "axios";
// import { push } from "react-router-redux";
import { joinRoom, leaveRoom, projectRoom } from "./client";

export * from "./admin";

console.log("REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const CREATE_GAME_API = "/api/game/create";
const JOIN_GAME_API = "/api/game/join";
const GET_QUESTION_BANK_API = "/api/questionbank";
const JOIN_AS_PROJECTOR_API = "/api/game/project";

export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const GET_QUESTION_BANK = "GET_QUESTION_BANK";
export const JOIN_AS_PROJECTOR = "JOIN_AS_PROJECTER";
export const RESET = "RESET";
export const RESTART = "RESTART";

const createGameSuccess = payload => {
  joinRoom(payload.viewer);
  delete payload.viewer.isReady;
  return { type: CREATE_GAME, payload };
};

const createGameFail = error => {
  const payload = { createGameError: error };
  return { type: CREATE_GAME, payload };
};

const joinGameSuccess = payload => {
  joinRoom(payload.viewer);
  delete payload.viewer.isReady;
  return { type: JOIN_GAME, payload };
};

const joinAsProjectorSuccess = payload => {
  projectRoom(payload.room._id);
  return { type: JOIN_AS_PROJECTOR, payload };
};

const joinGameFail = error => {
  const payload = { joinGameError: error };
  return { type: JOIN_GAME, payload };
};

const loadQuestionBankSuccess = payload => {
  return { type: GET_QUESTION_BANK, payload };
};

export const createGame = (playerName, callback) => {
  // Callback is to setSubmitting to false for failure cases
  const params = { playerName };
  // dispatch fetch
  return async dispatch => {
    try {
      dispatch(fetchQuestionBank());
      const response = await axios.post(CREATE_GAME_API, params);
      if (response.data.error) {
        const errorMessage = String(response.data.error);
        dispatch(createGameFail(errorMessage));
        callback();
      } else {
        dispatch(createGameSuccess(response.data));
      }
    } catch (error) {
      // handle fail
      console.error(error);
      const errorMessage = "Unable to create game :(";
      dispatch(createGameFail(errorMessage));
      callback();
    }
  };
};

export const fetchQuestionBank = () => {
  // dispatch fetch
  return async dispatch => {
    try {
      const response = await axios.get(GET_QUESTION_BANK_API);
      dispatch(loadQuestionBankSuccess(response.data));
    } catch (error) {
      // TODO: handle fail
      console.error(error);
    }
  };
};

// export const reset = () => async dispatch => {
//   await dispatch({ type: RESET });
// };

export const joinGame = (roomNo, playerName, callback) => {
  // Callback is to setSubmitting to false for failure cases
  const params = { roomNo, playerName };
  // dispatch fetch
  return async dispatch => {
    dispatch(fetchQuestionBank());
    try {
      const response = await axios.post(JOIN_GAME_API, params);
      if (response.data.error) {
        const errorMessage = String(response.data.error);
        dispatch(joinGameFail(errorMessage));
        callback();
      } else {
        dispatch(joinGameSuccess(response.data));
      }
    } catch (error) {
      const errorMessage = "Unable to join game :(";
      dispatch(joinGameFail(errorMessage));
      callback();
    }
  };
};

export const leave = () => {
  return async dispatch => {
    leaveRoom();
    console.log("Reset");
    dispatch({ type: RESET });
  };
};

export const joinAsProjector = roomNo => {
  // dispatch fetch
  return async dispatch => {
    try {
      const params = { roomNo };
      const response = await axios.post(JOIN_AS_PROJECTOR_API, params);
      if (response.data.error) {
        const errorMessage = String(response.data.error);
        console.error(errorMessage);
      } else {
        dispatch(joinAsProjectorSuccess(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
