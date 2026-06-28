import React from "react";

export const Options = ({
    options,
    answer,
    showAnswer,
}) => {
    const labels = [
        "A",
        "B",
        "C",
        "D",
    ];

    return (
        <>
            {options.map(
                (
                    option,
                    index
                ) => (
                    <div
                        key={index}
                        style={{
                            width:
                                "90%",
                            background:
                                showAnswer &&
                                    index ===
                                    answer
                                    ? "#16a34a"
                                    : "#1e293b",
                            padding:
                                20,
                            marginBottom:
                                15,
                            borderRadius:
                                15,
                            fontSize:
                                35,
                            color:
                                "#ffffff",
                        }}
                    >
                        {
                            labels[
                            index
                            ]
                        }
                        . {option}
                    </div>
                )
            )}
        </>
    );
};