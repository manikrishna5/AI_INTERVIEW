import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-jq2kuj51g-mani-krishna.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

export default app; 