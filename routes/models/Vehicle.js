mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema( {

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictureLink: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    autonomy: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['CAR', 'BIKE', 'SCOOTER'],
        required: true
    },
    prices: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price' 
    } ]

});

module.exports = mongoose.model('Vehicle', VehicleSchema);