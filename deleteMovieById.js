import { client } from "./index.js";

export async function deleteMovieById(id) {
    return await client.db("b30wd").collection("movies").deleteOne({ id });
}
