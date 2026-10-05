const taskService = require('../services/tasks.service');
const AppError = require('../utils/AppError');

const createTaskController = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            // const error = new Error('Title and description are required');
            // error.statusCode = 400;
            // return next(error);
            throw new AppError('Title and description are required', 400);

        };
        
        if ( typeof title !== 'string' || typeof description !== 'string') {
            throw new AppError('Title and description must be strings', 400);
        }

        await taskService.CreateTask({ title, description });
        res.status(201).json({ message: 'Task created successfully' });

    } catch (error) {
       next(error);
    }
};

const getAllTasksController = async (req, res, next) => {
    try {
        const { title, completed, page, limit, sort } = req.query;
        const filters = {
            title,
            completed: completed !== undefined ? completed === 'true' : undefined,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort: sort === 'asc' ? 1 : sort === 'desc' ? -1 : undefined
        };

        const tasks = await taskService.getAllTasks(filters);

        if (tasks.length === 0) {
            throw new AppError('No tasks found', 404);
        };

        res.status(200).json({ 
            message: 'Tasks retrieved successfully', 
            data: tasks 
        });

    } catch (error) {
        console.error('Error retrieving tasks:', error);
        next(error);
    }
};

const getTaskByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        return res.status(200).json({
            message: 'Task retrieved successfully',
            data: task
        });
    } catch (error) {
        console.error('Error retrieving task by ID:', error);
        next(error);
    }
}

const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedTask = await taskService.updateTask(id, updateData);
        res.status(200).json({ 
            message: 'Task updated successfully', 
            data: updatedTask 
        });
    } catch (error) {
        console.error('Error updating task:', error);
        next(error);
    }
}

const deleteTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskService.deleteTask(id);

        if (!deletedTask) {
            throw new AppError('Task not found', 404);
        }

        res.status(200).json({ message: 'Task deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting task:', error);
        next(error);

    }
}

module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
};
