const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
        enum: ['plumber', 'electrician', 'cleaner', 'tutor', 'salon', 'ac repair', 'carpenter', 'other']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please specify the price']
    },
    duration: {
        type: String, // e.g. "1 hour", "30 mins"
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    location: {
        type: String,
        required: [true, 'Please add a location/service area']
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
