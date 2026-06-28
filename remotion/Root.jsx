import React from "react";
import { Composition } from "remotion";
import { QuizVideo } from "../compositions/QuizVideo";

export const Root = () => {
    return (
        <Composition
            id="QuizVideo"
            component={QuizVideo}
            durationInFrames={600}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{
                question: "",
                options: [],
                answer: 0,
            }}
        />
    );
};