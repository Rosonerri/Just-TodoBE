import { NextFunction, Request, Response } from "express";
import { mainError } from "./mainError";
import { HTTP } from "../utils/enums";

const errorBuilder = (err: mainError, res: Response) => {
res.status(HTTP.Bad_Request).json({
    name: err.name,
    message: err.message,
    success: err.success,
    error: err
})
};

export const handleError = (
    err: mainError,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    errorBuilder(err, res)
}
