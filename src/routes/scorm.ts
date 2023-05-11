// library
import { checkSchema } from "express-validator";
import express from "express";
// controller
import { list_course, import_course } from "../controllers/tasks";
// Scheme
import { getCourses, importCourse } from "../schema";
// Middleware
import { checkApiKey, uploadFile } from '../middleware'

const router = express.Router();

router.get("/", checkApiKey, list_course);
router.post("/", checkSchema(importCourse), [uploadFile('public/course'), checkApiKey], import_course);

export default router;
