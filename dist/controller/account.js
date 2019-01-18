"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _config = _interopRequireDefault(require("../config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _account = _interopRequireDefault(require("../model/account"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _authMiddleware = require("../middleware/authMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = _express.Router; // v1/account

  api.post('/register', function (req, res) {
    _account.default.register(new _account.default({
      username: req.body.email
    }), req.body.password, function (err, account) {
      if (err) {
        res.send(err);
      }

      _passport.default.authenticate('local', {
        session: false
      })(req, res, function () {
        res.status(200).send('Succesfully created new account');
      });
    });
  }); //v1/account/login

  api.post('/login', _passport.default.authenticate('local', {
    session: false,
    scope: []
  }), _authMiddleware.generateAccessToken, _authMiddleware.respond); //v1/account/logout

  api.get('/logout', _authMiddleware.authenticate, function (req, res) {
    res.logout();
    res.status(200).send("Successfully logged ou");
  });
  api.get('/me', _authMiddleware.authenticate, function (req, res) {
    res.status(200).json(req.user);
  });
  return api;
};

exports.default = _default;