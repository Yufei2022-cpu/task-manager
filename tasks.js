const express = require('express');
const tasksController = require('./controller');
const router = express.Router();

// GET tasks
router.get('/', tasksController.get1);

// GET tasks/:id
router.get('/:id', tasksController.get2);

// POST tasks
router.post('/', tasksController.post);

// PUT tasks/:id
router.put('/:id', tasksController.put);

// DELETE tasks/:id
router.delete('/:id', tasksController.delete_task);

module.exports = router;
