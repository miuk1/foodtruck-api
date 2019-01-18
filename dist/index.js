"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = require('passport-local').Strategy;

var app = (0, _express.default)();
app.server = _http.default.createServer(app); //middleware
//parse application/json

app.use(_bodyParser.default.json({
  limit: _config.default.bodyLimit
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
})); //passport config

app.use(_passport.default.initialize());
var Account = requre('./model/account');

_passport.default.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, Account.authenticate()));

_passport.default.serializeUser(Account.serializeUser());

_passport.default.deserializeUser(Account.deserializeUser()); //api routes v1


app.use('/v1', _routes.default);
app.server.listen(_config.default.port);
console.log("Server started on port ".concat(app.server.address().port));
var _default = app;
exports.default = _default;