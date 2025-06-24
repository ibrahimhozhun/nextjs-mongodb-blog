import { NextFunction, Request, Response } from "express";
import checkUser from "../utilities/checkUser";

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Get token if it exists
	const token = req.cookies.jwt;

	checkUser({
		token,
		onNoToken: () =>
			res
				.status(400)
				.json({ error: "Can not find authentication token" }),
		onBadToken: () =>
			res
				.status(404)
				.json({ error: "No user found with the id at token" }),
		onInvalidToken: () =>
			res.status(400).json({ error: "Authentication token is invalid" }),
		onSuccess: () => next(),
	});
};
