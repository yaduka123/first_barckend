import {  Response } from "express";
import mongoose from "mongoose";

//Reusable function to handle errors
export const handleError = (res: Response, error: unknown, statusCode = 500): void => {
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    res.status(statusCode).json({ error: errorMessage })
}
//Validate MongoDB ObjectId
export const isValidObjectId = (id: string, res: Response): boolean => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid user ID format" });
        return false;
    }
    return true;
}