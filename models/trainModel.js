const mongoose = require('mongoose');

const TrainSchema = mongoose.Schema({
    train:{
        type: String,
        required: true
    },
    trainId:{
        type: Number,
        required: true
    },
    routes: [{
        stop:{
            type: String,
            required: true
        },
        prevDist:{
            type: Number,
            required:true
        },
        depature:{
            type: Date,
            required: true
        }
    }]
})

const Train = mongoose.model('Train', TrainSchema, 'Train');
module.exports = Train