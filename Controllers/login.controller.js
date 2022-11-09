import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userModel } from '../model/UserSchema.js';
import {cookieConfig} from '../cookieConfig.js'

export async function login (req, res) {
    const {user, pwd} = req.body;

    if(!user || !pwd) {
        return res.status(400).json({message: 'please, put a valid user and password'});
    }

   
    const foundUser = await userModel.findOne({username: user}).exec();
    if(!foundUser) return res.sendStatus(401);

    const comparePwd = await bcrypt.compare(pwd, foundUser.password);
    if(!comparePwd) return res.sendStatus(401);

    const rolesCode = Object.values(foundUser.roles).filter(role => role !== undefined);

    const accessToken = jwt.sign(
        {userInfo: {
            username: foundUser.username,
            roles: rolesCode
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '300s'}
    )

    const refreshToken = jwt.sign(
        {'username': foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    //save refresh token with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, cookieConfig);
    res.setHeader('credentials', 'include')

    res.json(accessToken) 
    
}