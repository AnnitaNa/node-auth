import bcrypt from 'bcrypt'
import {userModel} from '../model/UserSchema.js'

export async function register(req, res) {
    
    const {user, pwd} = req.body;
    if (!user || !pwd) return  res.status(400).json({message: 'please, put a valid user and password'})

    const duplicate = await userModel.findOne({username:user}).exec();
    if (duplicate) return res.status(409).json({message: 'There is already a user with this name on the database'})

    try {
        const hashPwd = await bcrypt.hash(pwd, 10);
       
        // creates and store new user
        const newUSer = await userModel.create({
          username: user, 
          password: hashPwd
        })

        //? OR

      //  const newUSer = await new userModel({
      //     username: user, 
      //     password: hashPwd
      //   })
      //   newUSer.save()
      

        console.log(newUSer)
        res.status(201).json({message: `User ${newUSer.username} created`})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}