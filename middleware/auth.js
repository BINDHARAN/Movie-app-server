
import jwt from 'jsonwebtoken'

export const auth = (request, response, next) => {
    try {
        const token = request.header("x-auth-token")
        // console.log(token)
        jwt.verify(token, process.env.key);
        next()
    } catch (error) {
        response.status(401).send({ error: error.message })
    }
}