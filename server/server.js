import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";

import socketEvents from "./events";
import routes from "./routes";

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use("/", routes);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/doiknowyou2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

io.on("connection", socket => {
  socketEvents(io, socket);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
