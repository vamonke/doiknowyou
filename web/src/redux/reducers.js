import * as a from "./actions";
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
  answer: null,
  disconnected: false,
  joinGameError: null,
  createGameError: null
};

const reducers = (state = defaultState, { type, payload }) => {
  switch (type) {
    case a.CREATE_GAME:
    case a.JOIN_GAME:
    case a.GET_QUESTION_BANK:
    case e.VIEWER_READY:
    case e.SOCKET_GAME_START:
    case e.VIEWER_ANSWER:
    case e.SOCKET_NEXT_QUESTION:
    case e.HYDRATE_ANSWERED_QUESTIONS:
    case e.HYDRATE_ROOM:
    case e.SOCKET_GAME_SETTINGS:
    case e.SOCKET_PLAYER_LIST:
    case e.SOCKET_DISCONNECTED:
    case e.SOCKET_RECONNECTED:
    case a.GET_QUESTION_BANK_ALL:
    case a.GET_ROOMS:
    case a.GET_ROOM:
    case a.JOIN_AS_PROJECTOR:
      return { ...state, ...payload };

    case e.SOCKET_PLAYER_READY:
      state.players[payload].isReady = true;
      return { ...state };

    case e.SOCKET_PLAYER_NOT_READY:
      state.players[payload].isReady = false;
      return { ...state };

    case e.HOST_SETTING: {
      const room = { ...state.room, ...payload };
      return { ...state, room };
    }

    case e.SOCKET_PLAYER_ANSWERED:
      state.players[payload].hasAnswered = true;
      return { ...state };

    case e.SOCKET_PLAYER_ANSWERED_OPEN: {
      const { playerId, answer } = payload;
      if (!state.currentQuestion.options.includes(answer)) {
        state.currentQuestion.options.push(answer);
      }
      state.players[playerId].hasAnswered = true;
      return { ...state };
    }

    case e.SOCKET_OPEN_TO_RECIPIENT: {
      const currentQuestion = {
        ...state.currentQuestion,
        ...payload.currentQuestion
      };
      return { ...state, currentQuestion };
    }

    case e.SOCKET_QUESTION_COMPLETE:
      state.currentQuestion.status = "asked";
      return { ...state };

    case e.SOCKET_QUESTION_RESULTS: {
      const players = { ...state.players, ...payload.players };
      for (const id in players) {
        players[id].hasAnswered = false;
      }
      state.answeredQuestions.unshift(payload.question);
      return { ...state, players };
    }

    case e.HYDRATE_ANSWERED_PLAYERS:
      payload.forEach(playerId => {
        if (state.players[playerId]) state.players[playerId].hasAnswered = true;
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
      state.room.hostId = payload;
      return { ...state };

    case a.RESET:
      return defaultState;

    default:
      return state;
  }
};

export default reducers;
