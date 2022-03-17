// const express = require('express')
import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import cors from "cors";
// const port = 4000;
// app.get('/', function (req, res) {
//     res.send('Hello World ❤')
// })

// app.listen(port, () => {
//     console.log(`server started at ${port}`)
// })

dotenv.config()
app.use(cors());


app.use(express.json());


// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected ✌️😊");
    return client;
}
const client = await createConnection();

const port = process.env.PORT;

app.get("/", function (req, res) {
    res.send("Hello World ");
});

app.get("/movies", async function (req, res) {
    const movies = await client.db("b30wd").collection("movies").find({}).toArray();

    res.send(movies);
});


app.get("/movies/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await client.db("b30wd").collection("movies").findOne({ id });
    movie ? res.send(movie) : res.status(404).send({ message: "Not such movie found " });
});



app.delete("/movies/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await client.db("b30wd").collection("movies").deleteOne({ id });
    res.send(movie);
});

app.put("/movies/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;
    const updateData = req.body;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await client.db("b30wd").collection("movies").updateOne({ id }, { $set: updateData });
    res.send(movie);
});

app.post("/movies", async function (request, response) {
    // db.movies.insertMany(data)
    const data = request.body;
    // console.log(data);
    const result = await client.db("b30wd").collection("movies").insertMany(data);
    response.send(result);
});

app.listen(port, () => {
    console.log(`server started at ${port}`);
});
