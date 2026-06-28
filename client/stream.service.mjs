import { spawn } from "child_process";
import path from "path";

let ffmpeg = null;

export function startStream(videoPath = "assets/video.mp4") {
    if (ffmpeg) {
        console.log("Stream already running");
        return;
    }

    const video = path.isAbsolute(videoPath)
        ? videoPath
        : path.join(process.cwd(), videoPath);

    ffmpeg = spawn("ffmpeg", [
        "-re",

        "-stream_loop",
        "-1",

        "-i",
        video,

        "-vf",
        "scale=1280:720",

        "-r",
        "30",

        "-g",
        "60",

        "-keyint_min",
        "60",

        "-c:v",
        "libx264",

        "-preset",
        "veryfast",

        "-b:v",
        "2500k",

        "-maxrate",
        "2500k",

        "-bufsize",
        "5000k",

        "-pix_fmt",
        "yuv420p",

        "-c:a",
        "aac",

        "-b:a",
        "128k",

        "-ar",
        "44100",

        "-f",
        "flv",
        // "rtmp://localhost:1935/live/test",
        "rtmp://72.61.244.242:1935/live/test",
    ]);
    // "rtmp://localhost:1935/live/test",
    ffmpeg.stderr.on("data", (data) => {
        process.stdout.write(data.toString());
    });

    ffmpeg.on("close", (code) => {
        console.log("FFmpeg Closed:", code);
        ffmpeg = null;
    });

    console.log("Stream Started");
}

export function stopStream() {
    if (!ffmpeg) {
        return;
    }

    ffmpeg.kill("SIGTERM");
}

export function restartStream(videoPath) {
    stopStream();

    setTimeout(() => {
        startStream(videoPath);
    }, 1000);
}

export function isRunning() {
    return ffmpeg !== null;
}