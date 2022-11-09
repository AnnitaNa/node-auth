import { userModel } from '../model/UserSchema.js';
import {cookieConfig} from '../cookieConfig.js';

export const logout  = async (req, res) => {
    
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = await userModel.findOne({refreshToken: refreshToken}).exec();
    if (foundUser) {
        foundUser.refreshToken = '';
        await foundUser.save();
    }

    res.clearCookie('jwt', cookieConfig ) 
    res.sendStatus(204);
}