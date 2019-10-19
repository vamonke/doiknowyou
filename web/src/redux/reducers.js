import { CREATE_GAME, JOIN_GAME, GET_QUESTION_BANK, RESET } from "./actions";
import {
  SOCKET_PLAYER_JOINED,
  SOCKET_PLAYER_READY,
  SOCKET_PLAYER_NOT_READY,
  VIEWER_READY,
  SOCKET_GAME_START,
  SOCKET_PLAYER_ANSWERED,
  VIEWER_ANSWER,
  SOCKET_QUESTION_COMPLETE,
  SOCKET_QUESTION_RESULTS
} from "./events";

const defaultState = {
  room: {},
  players: {},
  viewer: {},
  questions: [
    {
      text: "",
      type: "mcq",
      options: ["", ""]
    },
    {
      text: "",
      type: "mcq",
      options: ["", ""]
    },
    {
      text: "",
      type: "mcq",
      options: ["", ""]
    }
  ],
  currentQuestion: {},
  answeredQuestions: [],
  answer: null,
  completed: false
};

const reducers = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
    case JOIN_GAME:
    case GET_QUESTION_BANK:
    case VIEWER_READY:
    case SOCKET_GAME_START:
    case VIEWER_ANSWER:
    case SOCKET_QUESTION_COMPLETE:
      return { ...state, ...payload };

    case SOCKET_PLAYER_READY:
      state.players[payload].isReady = true;
      return state;

    case SOCKET_PLAYER_NOT_READY:
      state.players[payload].isReady = false;
      return state;

    case SOCKET_PLAYER_ANSWERED:
      state.players[payload].hasAnswered = true;
      return state;

    case SOCKET_PLAYER_JOINED:
      return { ...state, players: { ...payload } };

    case SOCKET_QUESTION_RESULTS:
      const players = { ...state.players, ...payload.players };
      for (const id in players) {
        players[id].hasAnswered = false;
      }
      state.answeredQuestions.push({
        ...state.currentQuestion,
        ...payload.question
      });
      return { ...state, players };
    
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default reducers;
