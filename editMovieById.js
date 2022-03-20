import { client } from "./index.js";

export async function editMovieById(id, updateData) {
    return await client.db("b30wd").collection("movies").updateOne({ id }, { $set: updateData });
}
