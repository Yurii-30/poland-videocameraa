import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/database.service"
import { videocamerasRouter } from "./routes/videocameras.router";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use("/videocameras", videocamerasRouter);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });