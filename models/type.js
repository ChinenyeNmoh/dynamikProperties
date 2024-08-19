import {model, Schema} from 'mongoose';

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
   
},
{
    Timestamps: true,
}

)

export default model('Type', TypeSchema);