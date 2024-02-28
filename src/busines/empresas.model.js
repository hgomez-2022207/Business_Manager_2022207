import {Schema, model} from 'mongoose';

const BusinesSchema = Schema({
    name:{
        type:String,
        required: [true, 'El nombre de la empresa.']
    },
    level:{
        type:String,
        required: [true, 'El nivel de impacto']
    },
    age:{
        type:Number,
        required: [true, 'Edad de la empresa']
    },
    category:{
        type:String,
        required: [true, 'A que se dedica la empresa']
    },
    state:{
        type: Boolean,
        default: true
    }
},{
    versionKey: false
});

export default model('Busines', BusinesSchema);