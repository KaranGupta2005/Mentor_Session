const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatdb');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();

app.use(cors());
app.use(express.json());

const studentsRouter = require('./routes/students');
app.use('/api/students', studentsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
