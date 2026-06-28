import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import {
    getCompositions,
    renderMedia,
} from "@remotion/renderer";
let cachedBundle = null;
const getBundle =
    async () => {
        if (cachedBundle) {
            return cachedBundle;
        }
        cachedBundle =
            await bundle({
                entryPoint:
                    path.resolve(
                        "./remotion/index.jsx"
                    ),
            });
        return cachedBundle;
    };
export const generateVideo =
    async (
        props = {}
    ) => {
        console.log("Generating video with props:", props);
        if (
            !fs.existsSync("out")
        ) {
            fs.mkdirSync(
                "out",
                {
                    recursive: true,
                }
            );
        }

        const serveUrl =
            await getBundle();

        const compositions =
            await getCompositions(
                serveUrl,
                {
                    inputProps: props,
                }
            );

        const composition =
            compositions.find(
                c => c.id === "QuizVideo"
            );

        if (
            !composition
        ) {
            throw new Error(
                "Composition not found"
            );
        }

        const fileName =
            `video.mp4`;

        const outputLocation =
            path.join(
                "out",
                fileName
            );

        await renderMedia({
            composition,
            serveUrl,
            codec: "h264",
            outputLocation,
            inputProps: props,
            chromiumOptions: {
                browserExecutable: "/snap/bin/chromium",
                headless: true,
                gl: "swiftshader",
            },
        });

        return {
            video:
                `/videos/${fileName}`,
        };
    };