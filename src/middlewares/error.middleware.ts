import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    console.log(err);

    const statusCode =
        typeof err?.statusCode === "number" ? err.statusCode : 500;
    const message =
        typeof err?.message === "string" && err.message.length > 0
            ? err.message
            : "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message
    });
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}