import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IError {
  code: string;
  message: string;
}

export interface User extends Document {
  name: string;
  password: string;
  login: (name: string, password: string) => User;
}

interface UserModel extends Model<User> {
  login(name: string, password: string): Promise<User>;
}

// Schema
const UserSchema = new Schema<User, UserModel>({
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

// Login function
UserSchema.statics.login = async function (name: string, password: string) {
  // Find user in database
  const user = await this.findOne({ name });

  let error: IError;

  // If there is a user with that name
  if (user) {
    // Compare passwords
    const auth = await bcrypt.compare(password, user.password);

    // If the password is correct return the user
    if (auth) {
      return user;
    }

    // Otherwise throw this error object
    error = { code: "ERR_LOGIN_FAILED", message: "Incorrect password" };

    throw error;
  }

  // If there is no user with that name throw this error object
  error = { code: "ERR_LOGIN_FAILED", message: "User not found" };

  throw error;
}

// Default export
export default model<User, UserModel>("User", UserSchema);