import User, { User as IUser } from "../models/User";
import jwt from "jsonwebtoken";

interface ICheckUserArgs {
	token: string | undefined;
	onNoToken: () => any;
	onInvalidToken: () => any;
	onBadToken: () => any;
	onSuccess: (user: IUser) => any;
}

// We are using this same logic a few times so we are assinging it to this function
const checkUser = ({
	token,
	onNoToken,
	onSuccess,
	onInvalidToken,
	onBadToken,
}: ICheckUserArgs) => {
	if (token) {
		// Verify token
		jwt.verify(
			token,
			process.env.JWT_SECRET || "",
			async (error: any, decodedToken: any) => {
				if (error) {
					return onInvalidToken();
				} else {
					// If token is valid we get the user with the id at token
					const user = await User.findById(decodedToken.id);

					if (user) {
						// We pass the user as an argument so we can use it in this function later
						return onSuccess(user);
					} else {
						return onBadToken();
					}
				}
			}
		);
	} else {
		return onNoToken();
	}
};

export default checkUser;
