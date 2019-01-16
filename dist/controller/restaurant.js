"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _restaurant = _interopRequireDefault(require("../model/restaurant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)(); //'/v1/restaurant/add'

  api.post('/add', function (req, res) {
    var newRest = new _restaurant.default();
    newRest.name = req.body.name;
    newRest.place = req.body.place;
    newRest.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        "message": "Restaurant added"
      });
    });
  }); //'v1/restaurant/read

  api.get('/', function (req, res) {
    _restaurant.default.find({}, function (err, restaurants) {
      if (err) {
        res.send(err);
      }

      res.json(restaurants);
    });
  }); //'v1/restaurant/:id -update

  api.put('/:id', function (req, res) {
    var id = req.params.id;

    _restaurant.default.find({
      _id: id
    }, function (err, restaurants) {
      if (err) {
        res.send(err);
      }

      restaurants.name = req.body.name;

      _restaurant.default.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.json({
          "message": "Restaurant name updated"
        });
      });
    });
  });
  api.delete('/:id', function (req, res) {
    var id = req.params.id;

    _restaurant.default.remove({
      _id: id
    }, function (err, restaurants) {
      if (err) {
        res.send(err);
      }

      res.json({
        "message": "Restaurant removed successfully!"
      });
    });
  });
  return api;
};

exports.default = _default;