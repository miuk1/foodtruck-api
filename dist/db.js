"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(callback) {
  var db = _mongoose.default.connect(_config.default.mongoUrl, {
    useNewUrlParser: true
  });

  callback(db);
};

exports.default = _default;