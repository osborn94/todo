const express = require('express');
const validateQuery = require('../middleware/validateQuery');
const { getAllTasksQuerySchema } = require('../utils/taskValidators');
const TaskController = require('../controllers/tasks.controller');

const router = express.Router();


router.post('/tasks', TaskController.createTaskController);
router.get('/tasks', validateQuery(getAllTasksQuerySchema), TaskController.getAllTasksController);
router.get('/tasks/:id', TaskController.getTaskByIdController);
router.patch('/tasks/:id', TaskController.updateTaskController);
router.delete('/tasks/:id', TaskController.deleteTaskController);

module.exports = router;