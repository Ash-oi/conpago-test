import { Handler } from "express";
import bcrypt from "bcrypt";
import { validateRegistrationRequest } from "../models";

export const register: Handler = async (req, res) => {
	// validate request
	const registrationInfo = validateRegistrationRequest(req.body);
	if (registrationInfo.type == "failure") {
		return res.status(500).json({
			error: "registration error",
			messsage: registrationInfo.error,
		});
	}
	const { username, password, email, country } = registrationInfo.value;

	// hash password
	const hash = bcrypt.hashSync(password, 10);

	try {
		// TOOD: fix types so db is propagated
		// @ts-ignore
		await req.db.query(
			`INSERT INTO users (email, username, password, country) VALUES ($1, $2, $3, $4)`,
			[email, username, hash, country]
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: "registration error",
			messsage: "something went wrong",
		});
	}

	res.status(201).json({ success: true });
};
