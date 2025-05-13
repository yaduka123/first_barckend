import {  createTask, deleteTask, getTaskById, getTasks, updateTask } from './../controllers/task.controller';
import { Router } from 'express';



const router = Router()

// Create new task
router.post('/', createTask)

// Get all task
router.get('/', getTasks)

// Get task by ID
router.get('/:id', getTaskById)

// Delete task
router.delete('/:id', deleteTask)

// Update task
router.put('/:id', updateTask)

export default router
