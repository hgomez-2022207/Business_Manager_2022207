import { Router } from "express";
import { check } from "express-validator";
import {empresaPost,
        getEmpresaByName,
        obtenerEmpresas,
        generarExcel} from "./empresa.controller.js";
import { existeEmpresaByName } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
const router =  Router();

router.post('/',
    [
      validarJWT,
      check('name','invalid name').not().isEmpty(),
      check('level','unwritten level').not().isEmpty(),
      check('age','unwritten age').not().isEmpty(),
      check('category','unwritten category').not().isEmpty(),        
      validarCampos
    ],empresaPost

);

router.post('/generar-reporte', async (req, res) => {
  try{
    const busines = await obtenerEmpresas();

    const directorioDeReportes = './reporte';

    const filePath  = await generarExcel(busines, directorioDeReportes);

    res.download(filePath , 'reporte_de_empresas.xlsx', (err) => {

      if(err){
        console.error('Error al enviar el archivo:', err);
        res.status(500).json({mensaje: 'Error al enviar el archivo'});

      }else{

        console.log('archivo enviado correctamente')

      }
    });

  }catch(error){

    console.log('Error al generar el reporte de empresas:', error);
    res.status(500).json({ mensaje: 'Error al generar el reporte de empresas' });

  }
});



router.get(
    "/:name",
    [
      validarJWT,
      check("name", "El nombre no es válido"),
      check("name").custom(existeEmpresaByName),
      validarCampos,
    ],
    getEmpresaByName
  );

export default router;