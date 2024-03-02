import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Busines from './empresas.model.js';

export const empresaPost = async (req, res) => {
    console.log('empresaPost');
    const { name, level, age, category } = req.body;
    const empresa = new Busines({ name, level, age, category });

    await empresa.save();

    res.status(200).json({
        empresa,
    });
}

export const getEmpresaByName = async(req, res = response) =>{
    const { name } = req.params;
    const empresa = await Busines.findOne({name:name});

    res.status(200).json({
        empresa
    });
}