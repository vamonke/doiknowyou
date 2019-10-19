import io from "socket.io-client";
import { push } from "react-router-redux";
import {
  SOCKET_PLAYER_JOINED,
  SOCKET_PLAYER_READY,
  SOCKET_PLAYER_NOT_READY,
  SOCKET_GAME_START,
  VIEWER_READY,
  VIEWER_ANSWER,
  SOCKET_PLAYER_ANSWERED,
  SOCKET_QUESTION_COMPLETE,
  SOCKET_QUESTION_RESULTS
} from "./events";
import { arrayToObject } from "../utils";

const serverUrl = "http://127.0.0.1:3001";
const socket = io(serverUrl);

const updatePlayersEvent = payload => {
  return { type: SOCKET_PLAYER_JOINED, payload };
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

const questionCompleteEvent = payload => {
  return { type: SOCKET_QUESTION_COMPLETE, payload };
};

const questionResultsEvent = payload => {
  return { type: SOCKET_QUESTION_RESULTS, payload };
};

// Connection actions
export const joinRoom = viewer => {
  const { roomId } = viewer;
  if (roomId && !socket.player) {
    socket.player = viewer;
    console.log("Joining room");
    socket.emit("join", viewer);
  }
};
export const leaveRoom = () => {
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
export const playerNotReady = () => {
  return dispatch => {
    socket.emit("notReady");
  };
};

// Game actions
export const playerAnswer = answer => {
  return dispatch => {
    dispatch(viewerAnswer({ answer }));
    socket.emit("answer", answer);
  };
};

export const serverEvents = store => {
  // Connection events
  socket.on("updatePlayers", res => {
    const playersObj = arrayToObject(res.players);
    store.dispatch(updatePlayersEvent(playersObj));
  });
  socket.on("refresh", () => {
    console.log("Attemping to reconnect to server");
    window.location.reload();
  });

  socket.on("disconnected", () => {
    console.log("Kicked from room");
    store.dispatch(push("/"));
    // window.location.href = "/";
  });

  // Lobby events
  socket.on("playerReady", playerId => {
    store.dispatch(playerReadyEvent(playerId));
  });
  socket.on("playerNotReady", playerId => {
    store.dispatch(playerNotReadyEvent(playerId));
  });
  socket.on("start", res => {
    store.dispatch(startEvent(res));
  });

  // Game events
  socket.on("playerAnswer", playerId => {
    store.dispatch(playerAnsweredEvent(playerId));
  });
  socket.on("completed", () => {
    store.dispatch(questionCompleteEvent({ completed: true }));
  });
  socket.on("results", ({ question, players }) => {
    store.dispatch(
      questionResultsEvent({ question, players: arrayToObject(players) })
    );
  });
  socket.on("newQuestion", ({ currentQuestion }) => {
    console.log(currentQuestion);
    // store.dispatch(questionResultsEvent({ answers, players }));
  });
};
