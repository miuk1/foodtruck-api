import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;

let foodtruckSchema = new Schema({
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

var Foodtruck = mongoose.model('Foodtruck', foodtruckSchema);

module.exports =Foodtruck;


