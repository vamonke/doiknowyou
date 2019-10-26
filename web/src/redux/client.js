import io from "socket.io-client";
import { push } from "react-router-redux";
import {
  SOCKET_PLAYER_JOINED,
  SOCKET_PLAYER_READY,
  SOCKET_PLAYER_NOT_READY,
  SOCKET_GAME_SETTINGS,
  SOCKET_GAME_START,
  VIEWER_READY,
  VIEWER_ANSWER,
  VIEWER_SETTING,
  SOCKET_PLAYER_ANSWERED,
  SOCKET_PLAYER_ANSWERED_OPEN,
  SOCKET_OPEN_TO_RECIPIENT,
  SOCKET_QUESTION_COMPLETE,
  SOCKET_QUESTION_RESULTS,
  SOCKET_NEXT_QUESTION,
  SOCKET_GAME_OVER,
  SOCKET_ANSWERED_QUESTIONS,
  SOCKET_ANSWERED_PLAYERS
} from "./events";
import { arrayToObject } from "../utils";

const serverUrl = "http://127.0.0.1:3001";
const socket = io(serverUrl);

const updatePlayersEvent = payload => {
  return { type: SOCKET_PLAYER_JOINED, payload };
};

const updateQuestionsEvent = payload => {
  return { type: SOCKET_ANSWERED_QUESTIONS, payload };
};

const viewerReady = payload => {
  return { type: VIEWER_READY, payload };
};

const playerReadyEvent = payload => {
  return { type: SOCKET_PLAYER_READY, payload };
};

const playerNotReadyEvent = payload => {
  return { type: SOCKET_PLAYER_NOT_READY, payload };
};

const startEvent = payload => {
  return { type: SOCKET_GAME_START, payload };
};

const viewerAnswer = payload => {
  return { type: VIEWER_ANSWER, payload };
};

const playerAnsweredEvent = payload => {
  return { type: SOCKET_PLAYER_ANSWERED, payload };
};

const questionCompleteEvent = () => {
  return { type: SOCKET_QUESTION_COMPLETE };
};

const questionResultsEvent = payload => {
  return { type: SOCKET_QUESTION_RESULTS, payload };
};

const nextQuestionEvent = payload => {
  return { type: SOCKET_NEXT_QUESTION, payload };
};

const gameOverEvent = payload => {
  return { type: SOCKET_GAME_OVER, payload };
};

// Connection actions
export const joinRoom = viewer => {
  const { roomId } = viewer;
  if (roomId && !socket.player) {
    socket.player = viewer;
    console.log("Joining room", roomId);
    socket.emit("join", viewer);
  }
};
export const leaveRoom = () => {
  socket.emit("leave");
  socket.player = null;
};

// Lobby actions
export const playerReady = questions => {
  questions = JSON.parse(JSON.stringify(questions)); // TODO
  return dispatch => {
    dispatch(viewerReady({ questions }));
    socket.emit("ready", questions);
  };
};
export const playerNotReady = () => dispatch => {
  socket.emit("notReady");
};
export const hostSettings = settings => dispatch => {
  socket.emit("updateSettings", settings);
  const { timeLimit } = settings;
  const payload = { timeLimit };
  dispatch({ type: VIEWER_SETTING, payload });
};

// Game actions
export const playerAnswer = answer => {
  return dispatch => {
    dispatch(viewerAnswer({ answer }));
    socket.emit("answer", answer);
  };
};

export const playerAnswerOpen = answer => dispatch => {
  // dispatch({ type: VIEWER_ANSWER, answer });
  socket.emit("answer", answer);
};

// Server events
export const serverEvents = store => {
  // Connection events
  socket.on("updatePlayers", res => {
    const playersObj = arrayToObject(res.players);
    store.dispatch(updatePlayersEvent(playersObj));
  });
  
  socket.on("updateQuestions", answeredQuestions => {
    store.dispatch(updateQuestionsEvent({ answeredQuestions }));
  });

  socket.on("updateAnswers", answeredPlayers => {
    store.dispatch({
      type: SOCKET_ANSWERED_PLAYERS,
      payload: answeredPlayers
    });
  });
  
  socket.on("refresh", () => {
    console.log("Attemping to reconnect to server");
    window.location.reload();
  });

  socket.on("disconnected", () => {
    console.log("Kicked from room");
    store.dispatch(push("/"));
  });

  // Lobby events
  socket.on("playerReady", playerId => {
    store.dispatch(playerReadyEvent(playerId));
  });
  socket.on("playerNotReady", playerId => {
    store.dispatch(playerNotReadyEvent(playerId));
  });
  socket.on("start", ({ room, currentQuestion }) => {
    store.dispatch(startEvent({ room, currentQuestion }));
  });
  socket.on("newSettings", ({ room }) => {
    const payload = { room };
    store.dispatch({ type: SOCKET_GAME_SETTINGS, payload });
  });

  // Game events
  socket.on("playerAnswer", playerId => {
    store.dispatch(playerAnsweredEvent(playerId));
  })
  socket.on("openAnswer", ({ playerId, answer }) => {
    const payload = { playerId, answer };
    store.dispatch({ type: SOCKET_PLAYER_ANSWERED_OPEN, payload });
  });
  socket.on("openQuestion", ({ currentQuestion }) => {
    const payload = { currentQuestion };
    store.dispatch({ type: SOCKET_OPEN_TO_RECIPIENT, payload });
  });
  socket.on("completed", () => {
    store.dispatch(questionCompleteEvent());
  });
  socket.on("results", res => {
    let { question, players } = res;
    players = arrayToObject(players);
    store.dispatch(questionResultsEvent({ question, players }));
  });
  socket.on("nextQuestion", ({ currentQuestion }) => {
    const payload = {
      currentQuestion,
      completed: false,
      answer: null
    };
    store.dispatch(nextQuestionEvent(payload));
  });
  socket.on("gameOver", room => {
    store.dispatch(gameOverEvent({ room }));
  });
};
