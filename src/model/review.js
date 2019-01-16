import mongoose, { mongo } from 'mongoose';
import Foodtruck from './foodtruck';

let Schema = mongoose.Schema;

let ReveiwSchema = new Schema({
    title: {
     type: String,
     required: true
    },
    text: String,
    foodtruck: {
        type: Schema.Types.ObjectId,
        ref: 'Foodtruck',
        required: true
    }
});

var Review = mongoose.model('Review', ReveiwSchema);

module.exports = Review;