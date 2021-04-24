import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
  name: string;
  password: string;
}

// Schema
const UserSchema = new Schema<User, Model<User>>({
  name: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'This username already have an account'],
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must ne more than 8 characters'],
  },
})


UserSchema.pre<User>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  // Hashing the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Default export
export default model<User, Model<User>>("User", UserSchema);