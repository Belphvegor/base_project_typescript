import ScormRoutes from "./scorm";
import { Router } from "express";

const router = Router();
// V1
router.use("/api/v1/courses", ScormRoutes);

export default router;