import jwt from 'jsonwebtoken'
import { userModel } from '../model/UserSchema.js'

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    
    const foundUser = await userModel.findOne({refreshToken: refreshToken});
    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const rolesCode = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {userInfo: {
                    username: decoded.username,
                    roles: rolesCode
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30S'}
            )
            res.json({accessToken})
        }
    )
}