"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _foodtruck = _interopRequireDefault(require("../model/foodtruck"));

var _review = _interopRequireDefault(require("../model/review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)(); //'/v1/foodtruck/add'

  api.post('/add', function (req, res) {
    var newTruck = new _foodtruck.default();
    newTruck.name = req.body.name;
    newTruck.foodtype = req.body.foodtype;
    newTruck.avgcost = req.body.avgcost;
    newTruck.geometry.coordinates = req.body.geometry.coordinates;
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
  }); //'v1/foodtruck/id

  api.get('/:id', function (req, res) {
    _foodtruck.default.findById(req.params.id, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }

      res.json(foodtrucks);
    });
  }); //'v1/foodtruck/:id -update

  api.put('/:id', function (req, res) {
    var id = req.params.id;

    _foodtruck.default.findById(id, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }

      foodtrucks.name = req.body.name;
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
  }); //add review for a foodtruck
  //v1/foodtruck/reviews/add/:id

  api.post('/reviews/add/:id', function (req, res) {
    _foodtruck.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }

      var newReview = new _review.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }

        foodtruck.reviews.push(newReview);
        foodtruck.save(function (err) {
          if (err) {
            res.send(err);
          }

          res.json({
            "message": "Foodtruck Review added"
          });
        });
      });
    });
  }); //find review for specific foodtruck
  //v1/foodtruck/reviews/id

  api.get('/reviews/:id', function (req, res) {
    _review.default.find({
      foodtruck: req.params.id
    }, function (err, reviews) {
      if (err) {
        res.send(err);
      }

      res.json(reviews);
    });
  });
  return api;
};

exports.default = _default;