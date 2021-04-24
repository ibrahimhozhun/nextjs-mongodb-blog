import { Router } from "express";
import { create, deletePost, getAllPosts, getById, update } from "../controllers/post";

const router = Router();

router.get("/", getAllPosts);
router.get("/get/:id", getById);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deletePost);

export default router;