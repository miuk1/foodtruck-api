"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var Account = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requried: true
  }
});
Account.plugin(_passportLocalMongoose.default);
module.exports = _mongoose.default.model('Account', Account);