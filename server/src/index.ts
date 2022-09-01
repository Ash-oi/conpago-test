import * as dotenv from "dotenv";
dotenv.config();

import express, { Handler } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const version = require("../package.json").version;

const app = express();
const port = 3000;

const { Client } = require("pg");
const client = new Client();
client.connect();

import { register, login } from "./routes";
import { Musixmatch } from "./musixmatch";
import { artists, albums, lyrics } from "./routes/";
import jwt from "jsonwebtoken";

import NodeCache from "node-cache";
const musicCache = new NodeCache();

const db: Handler = async (req, res, next) => {
	// TOOD: fix types so db is propagated
	// TODO: theres probably a better way to handle this connection
	// @ts-ignore
	req.db = client;
	next();
};

const services: Handler = async (req, res, next) => {
	// @ts-ignore
	req.services = {};

	const { MUSIXMATCH_API_KEY, MUSIXMATCH_API_URL } = process.env;
	if (!MUSIXMATCH_API_KEY || !MUSIXMATCH_API_URL) {
		throw new Error("missing env");
	}
	// TODO: there's probably a better place to put this
	// TOOD: fix types so service is propagated
	// @ts-ignore
	req.services.musixmatch = new Musixmatch(
		MUSIXMATCH_API_KEY,
		MUSIXMATCH_API_URL,
		musicCache
	);
	next();
};

const auth: Handler = async (req, res, next) => {
	const { JWT_SECRET } = process.env;
	if (!JWT_SECRET) {
		throw new Error("missing env");
	}

	// TODO: do DB query
	if (!req.headers.authorization) {
		return res.status(400).json({
			error: "unauthorised",
			message: "you are unauthorised",
		});
	}

	try {
		// @ts-ignore
		req.decodedToken = jwt.verify(
			req.headers.authorization,
			JWT_SECRET
		) as jwt.JwtPayload;
		const nowInSeconds = new Date().getTime() / 1000;
		const oneDayInSeconds = 60 * 60 * 24;
		// @ts-ignore
		if (nowInSeconds - req.decodedToken.iat > oneDayInSeconds) {
			throw new Error("token expired");
		}
	} catch (error) {
		return res.status(400).json({
			error: "unauthorised",
			message: "you are unauthorised",
		});
	}
	next();
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({
		status: "up",
		version,
	});
});

//routes here
app.post("/register", db, register);
app.post("/login", db, login);

app.get("/artists", auth, db, services, artists);
app.get("/artist/:artistId/albums", auth, db, services, albums);
// would probably make sense for another route here for tracks but it wasn't in the requirements
app.get("/artist/:artistId/album/:albumId/lyrics", auth, db, services, lyrics);

// catch all
app.get("*", (req, res) => {
	res.status(404).send("404");
});
app.post("*", (req, res) => {
	res.status(404).send("404");
});

app.listen(port, () =>
	console.log(`Hello world app listening on port ${port}!`)
);
