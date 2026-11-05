const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/provider', protect, authorize('provider', 'admin'), getProviderBookings);
router.patch('/:id/status', protect, authorize('provider', 'admin'), updateBookingStatus);
router.patch('/:id/cancel', protect, cancelBooking);

module.exports = router;
