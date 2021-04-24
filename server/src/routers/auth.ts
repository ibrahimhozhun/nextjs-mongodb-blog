import { Router } from "express";
import { currentUser, login, logout, register } from "../controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentUser", currentUser);
router.get("/logout", logout);

export default router;