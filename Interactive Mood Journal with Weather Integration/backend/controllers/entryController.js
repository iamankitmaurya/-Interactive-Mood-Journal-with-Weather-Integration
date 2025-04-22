const Entry = require("../models/Entry");

// Get all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.userId });
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new entry
exports.createEntry = async (req, res) => {
  const { mood, note, date, weather } = req.body;

  try {
    const entry = await Entry.create({
      user: req.user.userId,
      mood,
      note,
      date,
      weather,
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
