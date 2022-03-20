import { client } from "./index.js";

export async function getAllMovies() {
    return await client.db("b30wd").collection("movies").find({}).toArray();
}
