import express from 'express'
import cookieParser from 'cookie-parser'

import { register } from './Controllers/register.controller.js'
import { login } from './Controllers/login.controller.js'
import { logout } from './Controllers/logout.controller.js';
import * as user from './Controllers/UsersController.js'

//tokens and roles
import { verifyJWT } from './middlewares/verifyJWT.js';
import { verifyRoles } from './middlewares/verifyRoles.js'
import { ROLES_LIST } from './config/ROLES_LIST.js'
import { handleRefreshToken } from './Controllers/refreshToken.controller.js';

export const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 
router.use(cookieParser());

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/refresh', handleRefreshToken);


// * use middlewares for all routes below

router.use([
    verifyJWT, //verifyJWT is that decodes the token and pass the role information to the request. I need to call it before!
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User) // only Admin or User can access!
]) 

router.get('/user', user.getAll);
router.get('/user/:id', user.getById);
router.put('/user/:id', user.updateUser);
router.delete('/user/:id', user.deleteUser);

