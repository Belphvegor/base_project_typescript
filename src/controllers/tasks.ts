import { Request, Response, NextFunction } from 'express'
import { validationResult } from "express-validator";

import customeError from '../helper/customeError';
import { getCourses, importCourse } from '../services/scormServices'
import { validateCourseSchema } from './validation/course';

export const list_course = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await getCourses(req.params).catch(err => { throw new customeError(err.message, 500, 'INTERNAL SERVER ERROR', err) });

        return res.status(200).json({
            status: true,
            message: "Load course Successful !",
            statusCode: 'SUCCESS',
            response: courses
        });
    } catch (error: any) {
        console.trace(error)
        return res.status(error.code).json({
            status: false,
            message: error.message,
            statusCode: error.type,
            errors: error.error
        })
    }
}

export const import_course = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validResult: any = validateCourseSchema(req.body)

        if (Object.keys(validResult).length > 0) {
            console.log(validResult)
            let error_message = validResult.shift();
            throw new customeError(error_message.msg, 400, 'BAD REQUEST', error_message)
        }

        console.log({
            message: "CHECK REQUEST !",
            body: req.body,
            file: req.file
        })

        const course_import = await importCourse(req.body, req.file).catch(err => { throw new customeError(err.message, 500, 'INTERNAL SERVER ERROR', err) });

        return res.status(200).json({
            status: true,
            message: "Import course Successful !",
            statusCode: 'SUCCESS',
            response: course_import
        });
    } catch (error: any) {
        console.trace(error);
        return res.status(error.code).json({
            status: false,
            message: error.message,
            statusCode: error.type,
            errors: error.error
        })
    }
}