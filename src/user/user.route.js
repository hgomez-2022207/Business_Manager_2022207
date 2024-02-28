import { Router } from "express";
import {check} from "express-validator"

import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {UserPost} from "../user/user.controller.js"
export default Router;

Router.post('/',
    [
        check('name','invalid user').not().isEmpty(),
        check('email','invalid email').not().isEmpty().isEmail(),
        check('password','password is not valid').isLength({min:6}),
        validarCampos
    ],UserPost

);