import UserModel from "../models/user.models.js";
import bcrypt from 'bcrypt';

const getAllUser =async (req, res) => {
    try {
        const getUser = await UserModel.find()
        res.status(200).json({
            user: getUser,
            message: 'get all users'
        })
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateUser = async(req, res) => {
   try {
    const {username,email,password} = req.body
    const { userId } = req.params;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const updatedUser = await UserModel.findOneAndUpdate(
        {_id: userId },
        {
            username,
            email,
            password: hashPassword
        }, {new: true}
    )
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({
        updateMeProfile: updatedUser,
        message: 'Your profile has been updated',
      });
   } catch (error) {
    res.status(500).json(error);
   }
};
const deleteUser = async (req, res) => {
   try {
    const {id} = req.params
    const user = await UserModel.findByIdAndDelete(id)
    res.status(200).json({
        deleteUser: user,
        message: 'User deleted successfully'
    })
   } catch (error) {
    res.status(500).json(error);
   }
};


const adminController = {
    getAllUser,
    updateUser,
    deleteUser
}
export default adminController