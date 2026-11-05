const Review = require('../models/Review');
const Booking = require('../models/Booking');

const addReview = async (req, res) => {
    try {
        const { serviceId, rating, comment } = req.body;

        const hasCompletedBooking = await Booking.findOne({
            userId: req.user._id,
            serviceId,
            status: 'completed'
        });

        if (!hasCompletedBooking) {
            return res.status(400).json({ message: 'You must have a completed booking to review this service' });
        }

        const review = await Review.create({
            userId: req.user._id,
            serviceId,
            rating,
            comment
        });

        res.status(201).json(review);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this service' });
        }
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByService = async (req, res) => {
    try {
        const reviews = await Review.find({ serviceId: req.params.serviceId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addReview, getReviewsByService };
