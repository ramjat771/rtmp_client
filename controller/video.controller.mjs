import { generateVideo } from "../services/video.service.mjs";
import {
    successResponse,
    errorResponse,
} from "../utils/apiResponse.mjs";

export const generateVideoController = async (
    req,
    res
) => {
    try {
        const {
            question,
            options,
            answer,
        } = req.body;

        if (!question) {
            return errorResponse(
                res,
                "Question is required",
                400
            );
        }

        if (
            !Array.isArray(options) ||
            options.length !== 4
        ) {
            return errorResponse(
                res,
                "4 options required",
                400
            );
        }

        const result =
            await generateVideo({
                question,
                options,
                answer,
            });

        return successResponse(
            res,
            result,
            "Video generated successfully"
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message
        );
    }
};