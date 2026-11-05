const express = require('express');
const router = express.Router();
const { addReview, getReviewsByService } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.get('/service/:serviceId', getReviewsByService);

module.exports = router;
