import {
    startStream,
    restartStream,
} from "./client/stream.service.mjs";

import { generateVideo } from "./services/video.service.mjs";
import { getQuestion } from "./math/question.mjs";

const RESTART_INTERVAL = 25 * 1000;


async function startStreamFunction(){
    const question = getQuestion();

    await generateVideo(question);
    startStream();
}
startStreamFunction();

setInterval(async () => {

    try {

        const question = getQuestion();

        await generateVideo(question);

        console.log("Restarting stream...");

        restartStream("out/video.mp4");

    } catch (err) {

        console.error(err);

    }

}, RESTART_INTERVAL);