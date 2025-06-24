import { Router } from "express";
import {
	create,
	deletePost,
	getAllPosts,
	getBySlug,
	update,
} from "../controllers/post";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// We don't need authentication for this routes 'cause our blog is gonna be public
router.get("/", getAllPosts);
router.get("/get/:slug", getBySlug);
// We use our middleware to check user so only authenticated users can create, update or delete posts
router.post("/create", requireAuth, create);
router.put("/update/:id", requireAuth, update);
router.delete("/delete/:id", requireAuth, deletePost);

export default router;
