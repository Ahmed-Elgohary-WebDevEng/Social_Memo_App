import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"

// Initialize App
const app = express();
dotenv.config()

// General Configuration for the app
app.use(bodyParser.json({limit: "300mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "300mb", extended: true}));
app.use(cors());

// -----  Routes Section ------
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes)

// Connect Database to atlas
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
       app.listen(PORT, () => console.log(`Server Running on port:${PORT}`));
    })
    .catch((error) => {
       console.log(error);
    });
