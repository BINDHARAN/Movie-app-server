// const express = require('express')
import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import cors from "cors";
import { moviesRoutes } from './routes/movies.js'
import { userRoutes } from './routes/user.js'
// import { auth } from "./middleware/auth.js";


// const port = 4000;
// app.get('/', function (req, res) {
//     res.send('Hello World ❤')
// })

// app.listen(port, () => {
//     console.log(`server started at ${port}`)
// })

dotenv.config()

//third party middleware
app.use(cors());

// inbuild middleware
app.use(express.json());


// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected ✌️😊");
    return client;
}
export const client = await createConnection();

const port = process.env.PORT;

app.get("/", function (req, res) {
    res.send("Hello World ");
});

app.use("/movies", moviesRoutes)
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`server started at ${port}`);
});


