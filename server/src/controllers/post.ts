import { Request, Response } from "express";
import Post from "../models/Post";

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    // Get all posts from the database
    const posts = await Post.find();
    // Send posts to client
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Get post by id
    const post = await Post.findById(id);
    if (post) {
      // Send post to client
      res.json({ post });
    } else {
      throw Error("Cannot find post");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

export const create = async (req: Request, res: Response) => {
  const { body, title } = req.body;

  try {
    // Create post
    await Post.create({ body, title });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Delete post
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Cannot delete post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  // We just get body 'cause we don't want to update title
  const { body } = req.body;
  try {
    // Update post
    const post = await Post.findByIdAndUpdate(id, { body });
    if (post) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Cannot update post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}