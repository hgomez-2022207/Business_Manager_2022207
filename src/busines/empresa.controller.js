import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Busines from './empresas.model.js';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export const empresaPost = async (req, res) => {
    console.log('empresaPost');
    const { name, level, age, category } = req.body;
    const empresa = new Busines({ name, level, age, category });

    await empresa.save();

    res.status(200).json({
        empresa,
    });
}

export const empresaPut = async (req, res = response) =>{
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    await Busines.findByIdAndUpdate(id, rest);

    const busines = await Busines.findOne({ _id: id });

    res.status(200).json({
        msg: 'Business Actualizado',
        busines,
    });
}

export const getEmpresaByName = async(req, res = response) =>{
    const { name } = req.params;
    const empresa = await Busines.findOne({name:name});

    res.status(200).json({
        empresa
    });
}

export const obtenerEmpresas = async () => {
    try {
      const empresas = await Busines.find();
      return empresas; 
    } catch (error) {
      console.error('Error no se pueden conseguir las empresas en la base de datos', error);
      throw error;
    }
};

export const generarExcel = async (busines) => {
    console.log('generar reporte');
    try {
        console.log('generar reporte');
      const directorio = process.env.ARCHIVOS_DIR;
  
      if (!directorio) {
        throw new Error('La variable de entorno ARCHIVOS_DIR no está definida');
      }
      if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Busines');
  
      worksheet.addRow(['Name', 'Impact level', 'Years of trayectory', 'Category']);
      
      busines.forEach((busines) => {

        worksheet.addRow([

          busines.name,
          busines.level,
          busines.age,
          busines.category

        ]);

      });
  
      const filePath  = path.join(directorio, 'reporte_de_empresas.xlsx');

      await workbook.xlsx.writeFile(filePath );
  
      return filePath ;

    } catch (error) {
      console.error('Error al generar el reporte de Excel:', error);
      throw error;
    }
};

  export const getEmpresaByCat = async (req, res) => {
    try {
      console.log('getCategoria')
        const query = {state : true};

        const category = await Busines.distinct('category', query);

        category.sort();

        res.status(200).json({
            category: category
        });
    
    } catch (e){
        console.log(e);
        res.status(400).json({
            msg: "No mes posible listar comunicate con el administrador"
        })
    }
}