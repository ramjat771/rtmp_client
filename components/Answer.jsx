import React from "react";

export const Answer = ({
    answer,
}) => {
    const labels = [
        "A",
        "B",
        "C",
        "D",
    ];

    return (
        <div
            style={{
                marginTop:
                    30,
                fontSize:
                    45,
                fontWeight:
                    "bold",
                color:
                    "#22c55e",
            }}
        >
            ✅ Correct Answer:{" "}
            {
                labels[
                answer
                ]
            }
        </div>
    );
};