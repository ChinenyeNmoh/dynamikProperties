import { model, models, Schema } from 'mongoose';

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: { 
        type: String,
        required: true 
    },
    type: { 
        type: String, 
        enum: ['verification', 'passwordReset'], 
        required: true 
      },
    expireAt: { 
        type: Date,
        expires:   60 * 60,
        index: true, 
        default: Date.now,
    }
});

const Token = models.Token || model('Token', TokenSchema);

export default Token;
