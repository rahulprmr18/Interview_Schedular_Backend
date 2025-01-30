const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const { interviewee, interviewer, start, end } = req.body;
    const existingEvent = await Event.findOne({
      $or: [
        {
          start: { $lt: new Date(end) },
          end: { $gt: new Date(start) },
        },
      ],
    });
    if (existingEvent) {
      return res.status(400).json({ message: 'Time slot already taken' });
    }
    const event = new Event({ interviewee, interviewer, start, end });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { interviewee, interviewer, start, end } = req.body;
    const existingEvent = await Event.findOne({
      $or: [
        {
          start: { $lt: new Date(end) },
          end: { $gt: new Date(start) },
        },
      ],
    });

    if (existingEvent && existingEvent._id.toString() !== id) {
      return res.status(400).json({ message: 'Time slot already taken' });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { interviewee, interviewer, start, end },
      { new: true }
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
