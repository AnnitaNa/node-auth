import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorizatin
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //it is not a valid token
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); 
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next()
        }
    )
}