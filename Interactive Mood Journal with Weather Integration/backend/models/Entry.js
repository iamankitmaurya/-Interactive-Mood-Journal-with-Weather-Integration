// === models/Entry.js ===
const mongoose = require("mongoose");
const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mood: String,
  note: String,
  date: String,
  weather: String,
});
module.exports = mongoose.model("Entry", entrySchema);
