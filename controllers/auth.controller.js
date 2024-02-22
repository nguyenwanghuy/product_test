import UserModel from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const login = async(req, res) => {
    try {
        const {username,password} = req.body;
        if(!username || !password) {
            return res.status(400).json({
                message: 'Invalid username or password'
            })
        }
        const existingUser = await UserModel.findOne({username})
        if(!existingUser) {
            return res.status(400).json({
                message: "Wrong username",
            })
        }
        const isMatchPassword = await bcrypt.compare( 
            //so sánh password người dùng nhập lên với database
            password,
            existingUser.password
        )
        if(!isMatchPassword) {
            return res.status(400).json({
                message: "Wrong password",
            })
        }
          //token
          const jwtPayload = {
            id: existingUser.id,
            admin: existingUser.admin,
            username: existingUser.username,
            password: existingUser.password
        }
        const token = jwt.sign(jwtPayload,process.env.SECRET_KEY,{
            expiresIn: '7d'
        })
        return res.status(200).json({
            accessToken: token,
            message: 'Login successful'
        })
    } catch (error) {
        res.status(500).json(error);
    }
}
const register = async(req, res) => {
    try {
        const {username,email,password, isAdmin} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "Missing required keys",
            });
        }
        const existingUser = await UserModel.findOne({email})
        if(existingUser) {
            return res.json({
                message: "User already exists",
            })
        }
          //hash password
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          //create new user
          const newUser = new UserModel({
              username,
              email,
              password: hashPassword,
              admin: isAdmin ? true : false,
          })
          await newUser.save();
          res.status(200).json({ 
              message: 'Register new user successfully'
          })
    } catch (error) {
        res.status(500).json(error);
    }
}
const getMe =async (req, res) => {
    const {id} = req.user
    const currentUser = await UserModel.findById(id).select('-password');
  
    if (!currentUser) {
      res.status(401);
      throw new Error('Unauthorized user');
    }
  
    res.json({
      userInfo: currentUser,
    });
  };


const authController = {
    login,
    register,
    getMe
}

export default authController