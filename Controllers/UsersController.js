import { userModel } from "../model/UserSchema.js";

const getAll = async(req, res) => {
    const users = await userModel.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });

    let mapped = users.map(user => {
        return {
            id: user.id,
            username: user.username,
            roles: user.roles
        }
    })
    console.table(mapped);
    res.sendStatus(200);
}

const getById = async(req, res) => {
    const {id} = req?.params;

    if(!id) return res.status(204).json(`'user not found' ${id}`)
  
    const user = await userModel.findById(id)
    res.status(200).json(user)
}

const updateUser = async(req, res) => {

    const id = req?.params?.id
    if(!id) return res.staus(204).json(`user not found ${id}`)

    const updateData = {
        roles: {
            User: 2222,
            Admin: 1111
        }
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData);
    
    res.status(200).json(updatedUser)
}

const deleteUser = async(req, res) => {
    const {id} = req?.params;
    if(!id) return res.status(204).json(`user not found ${id}`)

    const deletedUSer = await userModel.findByIdAndDelete(id);

    res.sttaus(200).json(deletedUSer)
}


export {getAll, getById, updateUser, deleteUser}