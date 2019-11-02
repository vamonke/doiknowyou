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
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/doiknowyou2";

console.log("MONGO_URI:", MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set("useCreateIndex", true);

// TODO: Lean queries
// const __setOptions = mongoose.Query.prototype.setOptions;
// mongoose.Query.prototype.setOptions = (options, overwrite) => {
//   __setOptions.apply(this, arguments);
//   if (this.mongooseOptions().lean == null) { this.mongooseOptions({ lean: true }); }
//   return this;
// };

io.on("connection", socket => {
  socketEvents(io, socket);
});

server.listen(port, () => {
  console.info(`Listening on port ${port}`);
});