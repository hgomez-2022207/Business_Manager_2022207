import { Router } from "express";
import {check} from "express-validator"

import { validarCampos } from "../middlewares/validar-campos.js";
//import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { UserPost } from "./user.controller.js";
import { existeEmail } from "../helpers/db-validators.js"

const router = Router();

router.post('/',
    [
        check('name','invalid user').not().isEmpty(),
        check('email','invalid email').not().isEmpty().isEmail(),
        check('email').custom(existeEmail),
        check('password','password is not valid').isLength({min:6}),
        validarCampos
    ],UserPost

);

export default router;