import User from '../user/user.model.js'
import Busines from '../busines/empresas.model.js'

export const existeEmail = async (email = '') => {

    console.log('existeEmail');
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {

    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existeEmpresaByName = async (name = '') => {

    const existeEmpresa = await Busines.findById(name);

    if (!existeEmpresa) {
        throw new Error(`this name: ${name} does not exist in the database`);
    }
}