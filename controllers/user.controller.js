import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import UserModel from '../models/user.models.js';
import PostModel from '../models/post.models.js';

cloudinary.config({
  cloud_name: 'dmlc8hjzu',
  api_key: '463525567462749',
  api_secret: 'gXldLMlEHGYIDKwoKTBaiSxPEZU',
});

const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const allowedFormats = ['.doc', '.pdf'];
    const fileExt = path.extname(file.originalname);
    if (!allowedFormats.includes(fileExt)) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        error: 'Only .doc and .pdf files are allowed',
      });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'SOCIALMEDIA',
    });
    fs.unlinkSync(file.path);
    const fileUrl = result && result.secure_url;

    const newPost = new PostModel({
      post: req.body.post,
      image: fileUrl,
    });

    await newPost.save();

    return res.status(200).json({
      data: newPost,
      message: 'Upload file and create post successfully',
    });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: 'Upload failed' });
  }
};

const UserController = {
  uploadImage,
};

export default UserController;