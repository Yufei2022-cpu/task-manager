const express = require('express');
const tasksRouter = require('./tasks');

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/tasks', tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});