const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    latitude: {
        type: String, 
        required: true
    },
    longitude: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    image: {
        type: String, 
        required: false
    },
    sector: {
        type: String, 
        enum: ['public', 'private'],
        default: 'public',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Listing', listingSchema)