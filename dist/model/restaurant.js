"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var restaurantSchema = new Schema({
  name: String,
  place: String
});

var Restaurant = _mongoose.default.model('Restaurant', restaurantSchema);

module.exports = Restaurant;