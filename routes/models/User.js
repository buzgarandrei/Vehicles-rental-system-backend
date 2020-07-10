

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema( {

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['BASIC_USER', 'PREMIUM_USER', 'OWNER', 'ADMIN'],
        default: 'BASIC_USER'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now
    }

}
);

module.exports = mongoose.model('User', UserSchema);