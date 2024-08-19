import {model, Schema} from 'mongoose';

const CategorySchema = new Schema({
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
export default model('Category', CategorySchema);