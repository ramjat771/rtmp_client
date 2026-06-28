import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import {
    getCompositions,
    renderMedia,
} from "@remotion/renderer";

let cachedBundle = null;

const getBundle = async () => {

    console.log("[1] getBundle()");

    if (cachedBundle) {
        console.log("[2] Using Cached Bundle");
        return cachedBundle;
    }

    console.log("[3] Bundling Started");

    cachedBundle = await bundle({
        entryPoint: path.resolve("./remotion/index.jsx"),
    });

    console.log("[4] Bundling Finished");

    return cachedBundle;
};

export const generateVideo = async (
    props = {}
) => {

    console.log("========================================");
    console.log("[5] generateVideo()");
    console.log("[6] Props:", props);

    if (!fs.existsSync("out")) {

        console.log("[7] Creating out directory");

        fs.mkdirSync("out", {
            recursive: true,
        });

    } else {

        console.log("[8] out directory exists");

    }

    console.log("[9] Getting Bundle");

    const serveUrl = await getBundle();

    console.log("[10] Bundle Ready");
    console.log(serveUrl);

    console.log("[11] Loading Compositions");

    const compositions =
        await getCompositions(
            serveUrl,
            {
                inputProps: props,
            }
        );

    console.log("[12] Compositions Loaded");
    console.log(compositions.map(c => c.id));

    console.log("[13] Finding Composition");

    const composition =
        compositions.find(
            c => c.id === "QuizVideo"
        );

    if (!composition) {

        console.log("[14] Composition NOT FOUND");

        throw new Error(
            "Composition not found"
        );
    }

    console.log("[15] Composition Found");

    const fileName = "video.mp4";

    const outputLocation =
        path.join(
            "out",
            fileName
        );

    console.log("[16] Output File");
    console.log(outputLocation);

    console.log("[17] Starting renderMedia()");

    try {

        await renderMedia({

            composition,

            serveUrl,

            codec: "h264",

            outputLocation,

            inputProps: props,

            chromiumOptions: {

                browserExecutable:
                    "/snap/bin/chromium",

                headless: true,

                gl: "swiftshader",

            },

        });

        console.log("[18] renderMedia Finished");

    } catch (err) {

        console.error("[19] renderMedia Error");

        console.error(err);

        throw err;

    }

    console.log("[20] Video Generated Successfully");

    return {

        video: `/videos/${fileName}`,

    };

};