import { CREATE_GAME, JOIN_GAME, GET_QUESTION_BANK, RESET } from "./actions";
import * as e from "./events";

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
  answer: null
};

const reducers = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
    case JOIN_GAME:
    case GET_QUESTION_BANK:
    case e.VIEWER_READY:
    case e.SOCKET_GAME_START:
    case e.VIEWER_ANSWER:
    case e.SOCKET_NEXT_QUESTION:
    case e.HYDRATE_ANSWERED_QUESTIONS:
    case e.SOCKET_GAME_SETTINGS:
    case e.SOCKET_PLAYER_LIST:
      return { ...state, ...payload };

    case e.SOCKET_PLAYER_READY:
      state.players[payload].isReady = true;
      return { ...state };

    case e.SOCKET_PLAYER_NOT_READY:
      state.players[payload].isReady = false;
      return { ...state };

    case e.HOST_SETTING:
      const room = { ...state.room, ...payload };
      return { ...state, room };

    case e.SOCKET_PLAYER_ANSWERED:
      state.players[payload].hasAnswered = true;
      return { ...state };

    case e.SOCKET_PLAYER_ANSWERED_OPEN:
      const { playerId, answer } = payload;
      state.currentQuestion.options.push(answer);
      state.players[playerId].hasAnswered = true;
      return { ...state };

    case e.SOCKET_OPEN_TO_RECIPIENT:
      const currentQuestion = {
        ...state.currentQuestion,
        ...payload.currentQuestion,
        recipientAnswering: true
      };
      return { ...state, currentQuestion };

    case e.SOCKET_QUESTION_COMPLETE:
      state.currentQuestion.status = "asked";
      return { ...state };

    case e.SOCKET_QUESTION_RESULTS:
      const players = { ...state.players, ...payload.players };
      for (const id in players) {
        players[id].hasAnswered = false;
      }
      state.answeredQuestions.unshift(payload.question);
      return { ...state, players };

    case e.HYDRATE_ANSWERED_PLAYERS:
      payload.forEach(playerId => {
        if (state.players[playerId])
          state.players[playerId].hasAnswered = true;
      });
      return { ...state };

    case e.SOCKET_GAME_OVER:
      state.currentQuestion = {};
      return { ...state, ...payload };

    case e.HOST_KICK_PLAYER:
      delete state.players[payload];
      return { ...state };

    case e.HOST_TRANSFER:
    case e.SOCKET_NEW_HOST:
      state.room.host = payload;
      return { ...state };

    case RESET:
      return defaultState;

    default:
      return state;
  }
};

export default reducers;
