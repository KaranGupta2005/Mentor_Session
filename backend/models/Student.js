const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  timeAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);


