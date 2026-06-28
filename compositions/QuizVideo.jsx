import React from "react";
import {
    AbsoluteFill,
    Audio,
    Sequence,
    interpolate,
    spring,
    useCurrentFrame,
} from "remotion";

import { Question } from "../components/Question";
import { Countdown } from "../components/Countdown";
import { Options } from "../components/Options";
import { Answer } from "../components/Answer";

import tickSound from "../public/tick.mp3";
import popSound from "../public/pop.mp3";
import successSound from "../public/success.mp3";

export const QuizVideo = ({
    question,
    options,
    answer,
}) => {

    const frame = useCurrentFrame();

    const fps = 30;

    // Total Quiz Duration
    const duration = 20;

    // Total Frames
    const totalFrames = duration * fps;

    // Show answer during last second
    const answerFrame = totalFrames - fps;

    // Countdown
    const countdown = Math.max(
        0,
        duration - Math.floor(frame / fps)
    );

    // Show Answer
    const showAnswer = frame >= answerFrame;

    // Progress Bar
    const progress = Math.max(
        0,
        100 - (frame / answerFrame) * 100
    );

    // Card Animation
    const scale = spring({
        frame,
        fps,
        config: {
            damping: 12,
            stiffness: 100,
        },
    });

    // Fade In
    const opacity = interpolate(
        frame,
        [0, 20],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <AbsoluteFill
            style={{
                background:
                    "linear-gradient(180deg,#1e3a8a,#0f172a,#020617)",
                color: "#ffffff",
                fontFamily: "Arial",
                justifyContent: "center",
                alignItems: "center",
                padding: 60,
            }}
        >

            {/* Progress Bar */}

            {!showAnswer && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${progress}%`,
                        height: 10,
                        background: "#22c55e",
                    }}
                />
            )}

            {/* Tick Sound */}

            {Array.from({
                length: duration,
            }).map((_, index) => (
                <Sequence
                    key={index}
                    from={index * fps}
                    durationInFrames={15}
                >
                    <Audio
                        src={tickSound}
                        volume={1}
                    />
                </Sequence>
            ))}

            {/* Pop */}

            <Sequence
                from={answerFrame}
                durationInFrames={15}
            >
                <Audio
                    src={popSound}
                    volume={1}
                />
            </Sequence>

            {/* Success */}

            <Sequence
                from={answerFrame + 5}
                durationInFrames={30}
            >
                <Audio
                    src={successSound}
                    volume={1}
                />
            </Sequence>

            {/* Main Card */}

            <div
                style={{
                    width: "95%",
                    maxWidth: 900,
                    borderRadius: 35,
                    padding: 40,
                    background:
                        "rgba(255,255,255,.08)",
                    border:
                        "2px solid rgba(255,255,255,.12)",
                    boxShadow:
                        "0 25px 70px rgba(0,0,0,.45)",
                    transform: `scale(${scale})`,
                    opacity,
                }}
            >

                <Question
                    question={question}
                />

                {!showAnswer && (
                    <Countdown
                        countdown={countdown}
                    />
                )}

                <Options
                    options={options}
                    answer={answer}
                    showAnswer={showAnswer}
                />

                {showAnswer && (
                    <Answer
                        answer={answer}
                    />
                )}

            </div>

        </AbsoluteFill>
    );
};