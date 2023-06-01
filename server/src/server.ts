import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/database.service"
import { videocamerasRouter } from "./routes/videocameras.router";

//визначення порту протоколу HTTP
//який використовується для підключення до сервера 
const PORT = process.env.PORT || 5050;
const app = express();

//виклик middleware-функцій
app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        //налаштування маршрутизації HTTP запитів
        app.use("/", videocamerasRouter);

        //прослуховування на визначеному порті
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    //обробка помилки підключення до БД
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });