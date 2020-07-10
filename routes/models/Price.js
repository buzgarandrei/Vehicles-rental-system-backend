const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
    startDate:{
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Price', PriceSchema);