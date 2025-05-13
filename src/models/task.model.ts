import mongoose, { Schema } from 'mongoose'
import { ITask } from '../types/task'

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    duedate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model<ITask>('Task', TaskSchema)
