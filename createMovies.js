import { client } from "./index.js";

export async function createMovies(data) {
    return await client.db("b30wd").collection("movies").insertMany(data);
}
