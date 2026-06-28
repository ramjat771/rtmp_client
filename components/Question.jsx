import React from "react";

export const Question = ({
    question,
}) => {
    return (
        <div
            style={{
                fontSize: 55,
                fontWeight:
                    "bold",
                textAlign:
                    "center",
                marginBottom:
                    30,
                width: "90%",
                color:
                    "#ffffff",
            }}
        >
            ❓ {question}
        </div>
    );
};