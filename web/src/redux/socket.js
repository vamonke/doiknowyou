import io from "socket.io-client";
import { push } from "react-router-redux";
import {
  SOCKET_PLAYER_JOINED,
  SOCKET_PLAYER_READY,
  SOCKET_PLAYER_NOT_READY,
  VIEWER_READY
} from "./events";
import { arrayToObject } from "../utils";

const serverUrl = "http://127.0.0.1:3001";
const socket = io(serverUrl);

const updatePlayersEvent = payload => {
  return { type: SOCKET_PLAYER_JOINED, payload };
};

const playerReadyEvent = payload => {
  return { type: SOCKET_PLAYER_READY, payload };
};

const playerNotReadyEvent = payload => {
  return { type: SOCKET_PLAYER_NOT_READY, payload };
};

const viewerReady = payload => {
  return { type: VIEWER_READY, payload };
};

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

export const playerReady = questions => {
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

export const serverEvents = store => {
  socket.on("updatePlayers", res => {
    const playersObj = arrayToObject(res.players);
    store.dispatch(updatePlayersEvent(playersObj));
  });

  socket.on("playerReady", res => {
    store.dispatch(playerReadyEvent(res));
  });

  socket.on("playerNotReady", res => {
    store.dispatch(playerNotReadyEvent(res));
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
};
