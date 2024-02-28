import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required: [true, 'el email del usuario']
    },
    password:{
        type:String,
        required: [true,'El password permitira el acceso']
    },
    img: {
        type:String,
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: true
    },
    role:{
        type:String,
        required:true,
        enum: [ADMIN_ROLE]
    }
},{
    versionKey: false // Deshabilita la versión del documento
});

export default mongoose.model('User', UsuarioSchema);