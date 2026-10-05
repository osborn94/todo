const tasksModel = require('../models/tasks.model');


const CreateTask = async ({ title, description }) => {
    
    return await tasksModel.create({ title, description });
    
};

const getAllTasks = async ({ title, completed, page, limit, sort }) => {
    const query = {};

    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }

    if (completed !== undefined) {
        query.completed = completed;
    }

    const skip = (page - 1) * limit;
    return await tasksModel.find(query).sort({ createdAt: sort || -1 }).skip(skip).limit(limit);
};

const getTaskById = async (id) => {

    return await tasksModel.findById(id);

};

const updateTask = async (id, updateData) => {
    const updatedTask = await tasksModel.findByIdAndUpdate(id, updateData, { new: true });
    return updatedTask;
};

const deleteTask = async (id) => {
    const deletedTask = await tasksModel.findByIdAndDelete(id);
    return deletedTask;
};

module.exports = {
    CreateTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};

