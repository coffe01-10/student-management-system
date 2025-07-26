require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const gradeRoutes = require('./routes/grades');
const courseSelectionRoutes = require('./routes/courseSelection');
const statisticsRoutes = require('./routes/statistics');
const studentAuthRoutes = require('./routes/studentAuth');
const studentProfileRoutes = require('./routes/studentProfile');
const studentGradeRoutes = require('./routes/studentGrade');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/course-selection', courseSelectionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/student-auth', studentAuthRoutes);
app.use('/api/student-profile', studentProfileRoutes);
app.use('/api/student-grade', studentGradeRoutes);


// --- Test Route ---
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

// --- Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
