import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './empresas.model.js';

export const empresaPost = async (req, res) => {
    console.log('empresaPost');
    const { name, level, age, category } = req.body;
    const user = new User({ name, level, age, category });

    await user.save();

    res.status(200).json({
        user,
    });
}