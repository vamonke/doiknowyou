"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _socket = _interopRequireDefault(require("socket.io"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _events = _interopRequireDefault(require("./events"));

var _routes = _interopRequireDefault(require("./routes"));

// import https from "https";
_dotenv["default"].config();

var port = process.env.PORT || 3001; // const options = {
//   key: fs.readFileSync(process.env.SERVER_KEY_FILE),
//   cert: fs.readFileSync(process.env.SERVER_CERT_FILE),
// };

var app = (0, _express["default"])();

var server = _http["default"].createServer(app); // const server = https.createServer(options, app);


var io = (0, _socket["default"])(server);
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use("/", _routes["default"]);

var mongoose = require("mongoose");

var MONGO_URI = process.env.MONGODB_URI;
console.log("MONGO_URI:", MONGO_URI);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true); // TODO: Lean queries
// const __setOptions = mongoose.Query.prototype.setOptions;
// mongoose.Query.prototype.setOptions = (options, overwrite) => {
//   __setOptions.apply(this, arguments);
//   if (this.mongooseOptions().lean == null) { this.mongooseOptions({ lean: true }); }
//   return this;
// };

io.on("connection", function (socket) {
  (0, _events["default"])(io, socket);
});
server.listen(port, function () {
  console.info("Listening on port ".concat(port));
});