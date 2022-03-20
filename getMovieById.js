import { client } from "./index.js";

export async function getMovieById(id) {
    return await client.db("b30wd").collection("movies").findOne({ id });
}
