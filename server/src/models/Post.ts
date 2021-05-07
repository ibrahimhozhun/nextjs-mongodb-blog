import { Document, Model, model, Schema } from "mongoose";
import generateSlug from "../utilities/generateSlug";

interface Post extends Document {
  title: string;
  body: string;
  slug: string;
}

// Schema
const PostSchema = new Schema<Post, Model<Post>>({
  title: {
    type: String,
    required: [true, 'Title can not be empty'],
    unique: [true, 'Post title must be unique']
  },
  body: {
    type: String,
    required: [true, 'Post can not be empty'],
  },
  slug: {
    type: String,
    required: [true, 'Slug can not be empty'],
    default: "default",
  }
});

PostSchema.pre<Post>("save", function (next) {
  this.slug = generateSlug(this.title);
  next();
});


export default model<Post, Model<Post>>("Post", PostSchema);