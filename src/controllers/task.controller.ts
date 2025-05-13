import { Request, Response } from "express";
import Task from '../models/task.model'
import { ITask } from '../types/task'

import { handleError, isValidObjectId } from "../utils/validation";


// Get all Tasks
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Tasks = await Task.find().lean()
        res.status(200).json(Tasks)
    } catch (error) {
        handleError(res, error)
    }
}

//Get Task by ID
export const getTaskById = async (req: Request, res: Response): Promise <void> => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id, res)) return
        const tasks = await Task.findById(id).lean()
        if (!tasks) {
            res.status(404).json({ message: 'Task not found'})
            return
        }
        res.status(200).json(tasks)
    } catch (error) {
        handleError(res, error)
    }
}

//Create New Task
export const createTask = async (
    req: Request<{}, {}, ITask>,
    res: Response
): Promise<void> => {
    try {
        const {title, description, duedate, completed } = req.body

        //Check required fields
        if (!title ) {
            res.status(400).json({ message: 'Title is required field' })
            return
        }

const task = new Task ({ title, description, duedate, completed })
const savedTask = await task.save()

//Extract only needed fields for response
const { _id, title: taskTitle, description: taskDescription, duedate: taskDuedate, completed: taskCompleted } = savedTask
res.status(201).json({ _id, title: taskTitle, description: taskDescription, duedate: taskDuedate, completed: taskCompleted })
    } catch (error) {
        handleError(res, error)
    }
}

//Update Task
export const updateTask = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { title, description, duedate, completed } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!title && !description && !duedate && !completed) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<ITask> = {}
        if (title) updateData.title = title
        if (description) updateData.description = description
        if ( duedate) updateData.duedate = duedate
        if ( completed ) updateData.completed = completed
        
        const updatedTask = await Task.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedTask) {
            res.status(404).json ({ message: 'Task not found'})
            return
        }
        res.status(200).json(updatedTask)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete Task
export const deleteTask = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id, res)) return
        const deleteTask = await Task.findByIdAndDelete(id).lean()
        if (!deleteTask) {
            res.status(404).json({ message: 'Task not found'})
            return
        }
        res.status(200).json({ message: 'Task deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}