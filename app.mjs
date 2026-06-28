import express from "express";
import cors from "cors";
import routes from "./routes/index.mjs";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/videos",express.static("out")
);
app.use( "/api", routes);

app.get( "/", (  req,  res  ) => {
        res.json({
            success:
                true,
            message:
                "Server Running 🚀",
        });
    }
);
export default app;