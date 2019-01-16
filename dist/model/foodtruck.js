"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _review = _interopRequireDefault(require("./review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var foodtruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodtype: {
    type: String,
    required: true
  },
  avgcost: Number,
  geometry: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

var Foodtruck = _mongoose.default.model('Foodtruck', foodtruckSchema);

module.exports = Foodtruck;