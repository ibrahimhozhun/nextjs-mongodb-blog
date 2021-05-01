import { Request, Response } from "express";
import Post from "../models/Post";

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.json({ error });
    console.log(error);
  }
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.json({ post });
    } else {
      throw Error("Cannot find post");
    }
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
}

export const create = async (req: Request, res: Response) => {
  const { postBody } = req.body;
  try {
    await Post.create({ body: postBody });
    res.json({ success: true });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const post = await Post.findByIdAndDelete(id);
    if(post){
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Cannot delete post"});
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { postBody } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { body: postBody });
    if(post){
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Cannot update post"});
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}