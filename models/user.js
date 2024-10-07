import {Schema, model, models} from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new Schema(
  {
    local: {
      fullName: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      mobile: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
    },
    google: {
      email: String,
      fullName: String,
      image: String,
    
    },
   isAdmin: {
      type: Boolean,
      default: 'false',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    
    bookmarks:[
      {type: [Schema.Types.ObjectId],
      ref: 'Property'
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('local.password')) {
      next();
    }
    // Check if the local password field is present and not empty
    if (this.local && this.local.password) {
      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the generated salt
      this.local.password = await bcrypt.hash(this.local.password, salt);

      // Continue with the save operation
      next();
    } else {
      // If password is missing or empty, proceed without hashing
      next();
    }
  } catch (error) {
    // Handle any errors that occurred during password hashing
    next(error);
  }
});

// Instance method to check if the entered password matches the stored hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  try {
    // Use bcrypt.compare to compare the entered password with the stored hashed password
    return await bcrypt.compare(enteredPassword, this.local.password);
  } catch (error) {
    // Handle any errors that occurred during password comparison
    throw error;
  }
};

// Check if the model already exists to avoid recompilation
const User = models?.User || model('User', userSchema);

export default User