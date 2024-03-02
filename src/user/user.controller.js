import { response, request } from "express";
import User from './user.model.js';
import bcryptjs from 'bcryptjs'

export const UserPost = async (req, res) => {
    console.log('userPost');
    const { name, email, password } = req.body;
    const role = "ADMIN_ROLE";
    const user = new User({ name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user,
    });
}