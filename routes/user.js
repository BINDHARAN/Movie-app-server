import express from 'express';
import { createUser } from '../helper.js';
import bcrypt from "bcrypt";


const routes = express.Router()


async function genPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    return hashpassword;
}



routes.post("/signup", async function (request, response) {
    // db.users.insertOne(data)
    const { username, password } = request.body;
    const hashPassword = await genPassword(password);
    const newUser = {
        username: username,
        password: hashPassword,
    };
    const result = await createUser(newUser);
    response.send(result);
});


export const userRoutes = routes;