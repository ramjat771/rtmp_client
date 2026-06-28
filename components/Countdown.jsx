import React from "react";

export const Countdown = ({
    countdown,
}) => {
    return (
        <div
            style={{
                fontSize: 90,
                fontWeight:
                    "bold",
                color:
                    "#facc15",
                marginBottom:
                    40,
            }}
        >
            {countdown}
        </div>
    );
};