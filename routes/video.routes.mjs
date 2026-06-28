import { Router } from "express";
import {
    generateVideoController,
} from "../controller/video.controller.mjs";

const router = Router();

router.post(
    "/generate",
    generateVideoController
);

export default router;
