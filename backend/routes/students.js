const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ timeAdded: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    branch: req.body.branch,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.deleteOne();
    res.json({ message: 'Deleted student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
