
const { z } = require('zod');

const getAllTasksQuerySchema = z.object({
    title: z.string().optional(),
    completed: z.enum(['true', 'false']).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    sort: z.enum(['asc', 'desc']).optional(),
}).strict();

const getAllUsersQuerySchema = z.object({
    email: z.string().email().optional(),
    role: z.enum(['admin', 'user']).optional(),
}).strict();

module.exports = { getAllTasksQuerySchema, getAllUsersQuerySchema };