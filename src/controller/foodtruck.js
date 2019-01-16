import { Router } from "express";
import mongoose from 'mongoose';
import Foodtruck from '../model/foodtruck';
import Review from '../model/review';

export default({config, db})=>{
    let api = Router();

    //'/v1/foodtruck/add'
    api.post('/add', (req, res)=>{
        let newTruck = new Foodtruck();
        newTruck.name = req.body.name;
        newTruck.foodtype = req.body.foodtype;
        newTruck.avgcost = req.body.avgcost;
        newTruck.geometry.coordinates = req.body.geometry.coordinates;
        
        newTruck.save(err => {
            if(err) {
                res.send(err);
            }
            res.json({"message": "Foodtruck added"});
        });
    });

    //'v1/restaurant/read

    api.get('/',(req,res)=>{
        Foodtruck.find({},(err, foodtrucks)=>{
            if(err){
                res.send(err);
            }
            res.json(foodtrucks);
        });
    });

     //'v1/foodtruck/id

     api.get('/:id', (req, res) => {
         Foodtruck.findById(req.params.id, (err, foodtrucks) => {
             if (err) {
                 res.send(err);
             }
             res.json(foodtrucks);
         });
     });

    //'v1/foodtruck/:id -update


    api.put('/:id', (req, res)=>{
        var id = req.params.id;
        Foodtruck.findById(id, (err, foodtrucks)=>{
            if(err){
                res.send(err);
            }

            foodtrucks.name = req.body.name;
            foodtrucks.save(err =>{
                if(err){
                    res.send(err);
                }
                res.json({"message": "Foodtruck name updated"});
            });
        });
    });

    api.delete('/:id', (req, res)=>{
       var id = req.params.id;
        Foodtruck.remove({
            _id: id
        }, (err, foodtrucks)=>{
            if(err){
                res.send(err);
            }
            res.json({"message": "Foodtruck removed successfully!"});
        })
    });

    //add review for a foodtruck
    //v1/foodtruck/reviews/add/:id
    api.post('/reviews/add/:id', (req, res)=>{
        Foodtruck.findById(req.params.id, (err, foodtruck)=>{
            if(err){
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err, review)=>{
                if(err){
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err=>{
                    if(err){
                        res.send(err);
                    }
                    res.json({"message": "Foodtruck Review added"});
                });
            });
        });
    });

    //find review for specific foodtruck
    //v1/foodtruc