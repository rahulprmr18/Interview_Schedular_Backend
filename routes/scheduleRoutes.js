const express = require('express');
const { createEvent, getEvents, deleteEvent, updateEvent } = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getEvents);
router.delete('/:id', protect, deleteEvent);
router.put('/:id', protect, updateEvent);

module.exports = router;
