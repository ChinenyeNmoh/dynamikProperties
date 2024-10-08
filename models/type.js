import {model, models, Schema} from 'mongoose';

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

const Type = models?.Type ||  model('Type', TypeSchema);
export default Type;