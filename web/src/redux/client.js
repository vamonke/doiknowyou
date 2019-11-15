import io from "socket.io-client";
import { push } from "react-router-redux";
import * as e from "./events";
import { arrayToObject } from "../utils";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io(serverUrl);

socket.on("reconnecting", attemptNumber => {
  // console.log(attemptNumber);
});

socket.on("disconnect", reason => {
  alert("Disconnected", reason);
});

const viewerReady = payload => {
  return { type: e.VIEWER_READY, payload };
};

const playerReadyEvent = payload => {
  return { type: e.SOCKET_PLAYER_READY, payload };
};

const playerNotReadyEvent = payload => {
  return { type: e.SOCKET_PLAYER_NOT_READY, payload };
};

const startEvent = payload => {
  return { type: e.SOCKET_GAME_START, payload };
};

const viewerAnswer = payload => {
  return { type: e.VIEWER_ANSWER, payload };
};

const playerAnsweredEvent = payload => {
  return { type: e.SOCKET_PLAYER_ANSWERED, payload };
};

const questionCompleteEvent = () => {
  return { type: e.SOCKET_QUESTION_COMPLETE };
};

const questionResultsEvent = payload => {
  return { type: e.SOCKET_QUESTION_RESULTS, payload };
};

const nextQuestionEvent = payload => {
  return { type: e.SOCKET_NEXT_QUESTION, payload };
};

const gameOverEvent = payload => {
  return { type: e.SOCKET_GAME_OVER, payload };
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

// Host actions
export const hostSettings = settings => dispatch => {
  socket.emit("updateSettings", settings);
  const { timeLimit } = settings;
  const payload = { timeLimit };
  dispatch({ type: e.HOST_SETTING, payload });
};
export const kick = playerId => dispatch => {
  socket.emit("kickPlayer", playerId);
  const payload = playerId;
  dispatch({ type: e.HOST_KICK_PLAYER, payload });
};
export const makeHost = playerId => dispatch => {
  socket.emit("makeHost", playerId);
  const payload = playerId;
  dispatch({ type: e.HOST_TRANSFER, payload });
};

// Game actions
export const playerAnswer = answer => dispatch => {
  dispatch(viewerAnswer({ answer }));
  socket.emit("answer", answer);
};
export const playerAnswerOpen = answer => dispatch => {
  // dispatch({ type: e.VIEWER_ANSWER, answer });
  socket.emit("answer", answer);
};
export const timesUp = () => dispatch => {
  dispatch(questionCompleteEvent());
};
// Server events
export const serverEvents = store => {
  // Connection events
  socket.on("updatePlayers", players => {
    const playersObj = arrayToObject(players);
    const payload = { players: playersObj };
    store.dispatch({ type: e.SOCKET_PLAYER_LIST, payload });
  });

  socket.on("hydrateRoom", room => {
    store.dispatch({
      type: e.HYDRATE_ROOM,
      payload: { room }
    });
  });

  socket.on("hydrateQuestions", ({ currentQuestion, answeredQuestions }) => {
    store.dispatch({
      type: e.HYDRATE_ANSWERED_QUESTIONS,
      payload: { currentQuestion, answeredQuestions }
    });
  });

  socket.on("hydrateAnswers", answeredPlayers => {
    store.dispatch({
      type: e.HYDRATE_ANSWERED_PLAYERS,
      payload: answeredPlayers
    });
  });

  socket.on("refresh", () => {
    console.log("Attemping to reconnect to server");
    window.location.reload();
  });

  socket.on("kick", () => {
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
    const clear = { answeredQuestions: [], answer: null };
    store.dispatch(startEvent({ room, currentQuestion, ...clear }));
  });

  // Host events
  socket.on("newSettings", ({ room }) => {
    const payload = { room };
    store.dispatch({ type: e.SOCKET_GAME_SETTINGS, payload });
  });
  socket.on("newHost", host => {
    const payload = host;
    store.dispatch({ type: e.SOCKET_NEW_HOST, payload });
  });

  // Game events
  socket.on("playerAnswer", playerId => {
    store.dispatch(playerAnsweredEvent(playerId));
  });
  socket.on("openAnswer", ({ playerId, answer }) => {
    const payload = { playerId, answer };
    store.dispatch({ type: e.SOCKET_PLAYER_ANSWERED_OPEN, payload });
  });
  socket.on("openQuestion", ({ currentQuestion }) => {
    const payload = { currentQuestion };
    store.dispatch({ type: e.SOCKET_OPEN_TO_RECIPIENT, payload });
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
