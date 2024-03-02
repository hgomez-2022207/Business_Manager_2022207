import { Router } from "express";
import { check } from "express-validator";
import {empresaPost} from "./empresa.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const router =  Router();

router.post('/',
    [
        check('name','invalid name').not().isEmpty(),
        check('level','unwritten level').not().isEmpty(),
        check('age','unwritten age').not().isEmpty(),
        check('category','unwritten category').not().isEmpty(),
        validarCampos
    ],empresaPost

);

export default router;