import { Handler } from "express";
import bcrypt from "bcrypt";
import { DatabaseUser, validateLoginRequest } from "../models";
import jwt from "jsonwebtoken";

export const login: Handler = async (req, res) => {
	// I would normally put this properly somewhere in express startup, but in the interest of time I've put it here
	const JWTSecret = process.env.JWT_SECRET;
	if (!JWTSecret) throw new Error("missing JWT_SECRET");

	// validate request
	const loginInfo = validateLoginRequest(req.body);
	if (loginInfo.type == "failure") {
		return res.status(500).json({
			error: "registration error",
			message: loginInfo.error,
		});
	}
	const { password, email } = loginInfo.value;

	// get user
	const user = await (async (): Promise<false | DatabaseUser> => {
		try {
			// TOOD: fix types so db is propagated
			// @ts-ignore
			const result = await req.db.query(
				`SELECT * FROM users WHERE email = $1 LIMIT 1`,
				[email]
			);
			return result?.rows[0];
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "login error",
				message: "something went wrong",
			});
			return false;
		}
	})();

	if (!user) {
		return res.status(400).json({
			error: "unauthorised",
			message: "incorrect username or password",
		});
	}

	const valid = bcrypt.compareSync(password, user.password);

	if (!valid) {
		return res.status(400).json({
			error: "unauthorised",
			message: "incorrect username or password",
		});
	}

	const token = jwt.sign({ sub: user.id }, JWTSecret);

	// try {
	// 	// TOOD: fix types so db is propagated
	// 	// @ts-ignore
	// 	await req.db.query(
	// 		`INSERT INTO auth ("userId", token, "expireSeconds") VALUES ($1, $2, $3)`,
	// 		[user.id, token, expireSeconds]
	// 	);
	// } catch (error) {
	// 	console.log(error);
	// 	return res.status(500).json({
	// 		error: "login error",
	// 		message: "something went wrong",
	// 	});
	// }

	res.status(201).json({
		success: true,
		token,
	});
};
