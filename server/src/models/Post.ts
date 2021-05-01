import { Document, Model, model, Schema } from "mongoose";

export interface Post extends Document {
  body: string;
}

// Schema
const PostSchema = new Schema<Post, Model<Post>>({
  body: {
    type: String,
    required: [true, 'Post can not be empty'],
  }
})

// Default export
export default model<Post, Model<Post>>("Post", PostSchema);