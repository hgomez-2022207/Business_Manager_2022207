import { Router } from "express";
import { check } from "express-validator";
import {empresaPost,
        getEmpresaByName} from "./empresa.controller.js";
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