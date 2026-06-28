import express from "express";
import cors from "cors";
import routes from "./routes/index.mjs";
import { generateVideo } from "./services/video.service.mjs"

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.use(
  "/videos",
  express.static("out")
);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running 🚀",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});
async function testGenerateVideo() {
   const result =
            await generateVideo({
              question: "यह तरीका reusable है और किसी भी quiz data के साथ generateVideo() function को call कर सकते हो।",
              options: [
                "मुंबई",
                "जयपुर",
                "नई दिल्ली",
                "कोलकाता",
              ],
                answer: 2,
            });
          }
          testGenerateVideo();

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});