"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _foodtruck = _interopRequireDefault(require("../model/foodtruck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)(); //'/v1/foodtruck/add'

  api.post('/add', function (req, res) {
    var newTruck = new _foodtruck.default();
    newTruck.name = req.body.name;
    newTruck.place = req.body.place;
    newTruck.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        "message": "Foodtruck added"
      });
    });
  }); //'v1/restaurant/read

  api.get('/', function (req, res) {
    _foodtruck.default.find({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }

      res.json(foodtrucks);
    });
  }); //'v1/restaurant/:id -update

  api.put('/:id', function (req, res) {
    var id = req.params.id;

    _foodtruck.default.findById(id, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }

      foodtrucks.name = req.body.name;
      foodtrucks.place = req.body.place;
      foodtrucks.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.json({
          "message": "Foodtruck name updated"
        });
      });
    });
  });
  api.delete('/:id', function (req, res) {
    var id = req.params.id;

    _foodtruck.default.remove({
      _id: id
    }, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }

      res.json({
        "message": "Foodtruck removed successfully!"
      });
    });
  });
  return api;
};

exports.default = _default;