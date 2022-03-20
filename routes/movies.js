import express from 'express';
import { createMovies } from '../createMovies';
import { deleteMovieById } from '../deleteMovieById';
import { editMovieById } from '../editMovieById';
import { getAllMovies } from '../getAllMovies';
import { getMovieById } from '../getMovieById';

const routes = express.Router()



routes.get("/", async function (req, res) {
    const movies = await getAllMovies()

    res.send(movies);
});


routes.get("/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await getMovieById(id);
    movie ? res.send(movie) : res.status(404).send({ message: "Not such movie found " });
});



routes.delete("/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await deleteMovieById(id);
    res.send(movie);
});

routes.put("/:id", async function (req, res) {
    // console.log(req.params)
    const { id } = req.params;
    const updateData = req.body;

    // const movie = (movies.filter((mv) => mv.id === id))
    const movie = await editMovieById(id, updateData);
    res.send(movie);
});

routes.post("/", async function (request, response) {
    // db.movies.insertMany(data)
    const data = request.body;
    // console.log(data);
    const result = await createMovies(data);
    response.send(result);
});

export const moviesRoutes = routes;