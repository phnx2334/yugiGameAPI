import express from "express";
import { connectToDatabase } from "./services/database.service"
import { cardsRouter } from "./routes/cards.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/cards", cardsRouter);

        app.listen(process.env.PORT || 81, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });