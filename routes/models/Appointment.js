

mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema( {
    createdOn: {
        type: Date,
        default: Date.now
    },
    startDate: {
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
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REFUSED'],
        default: 'PENDING'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    clientName: {
        type: String,
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },

});

module.exports = mongoose.model('Appointment', AppointmentSchema);