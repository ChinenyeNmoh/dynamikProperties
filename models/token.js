import { model, models, Schema } from 'mongoose';

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        required: true,
        unique: true,
        type: Schema.Types.ObjectId,
        ref: 'User'  
    },
    expireAt: {
        type: Date,
        index: true,
        expires: 24 * 60 * 60,  // Expire after 24 hours
        default: Date.now
    }
},
{
    timestamps: true  
});

const Token = models.Token || model('Token', TokenSchema);

export default Token;
