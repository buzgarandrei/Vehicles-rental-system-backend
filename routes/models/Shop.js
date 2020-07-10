const User = require('./User');
const Vehicle = require('./Vehicle');

mongoose = require('mongoose');

const ShopSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicleList: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
});
module.exports = mongoose.model('Shop', ShopSchema);
