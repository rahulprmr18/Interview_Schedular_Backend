const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  interviewee: { type: String, required: true },
  interviewer: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

// Ensure indexes are created
eventSchema.index({ start: 1, end: 1 });

module.exports = mongoose.model('Event', eventSchema);
