export type Result<A, E> = Success<A> | Failure<E>;

export type Success<A> = {
	type: "success";
	value: A;
};

export type Failure<E> = {
	type: "failure";
	error: E;
};

export function success<A>(value: A): Success<A> {
	return {
		type: "success",
		value,
	};
}

export function failure<E>(error: E): Failure<E> {
	return {
		type: "failure",
		error,
	};
}

export type DatabaseUser = {
	id: number;
	email: string;
	username: string;
	/** bcrypt*/
	password: string;
	createdAt: number; // date?
};

export type DatabaseAuth = {
	id: number;
	userId: number;
	expireSeconds: number;
	/** jwt */
	token: string;
	createdAt: number; // date?
};

export type RegistrationRequest = {
	email: string;
	username: string;
	password: string;
	country: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type ArtistsRequest = {
	country: string;
};

export type AlbumsRequest = {
	artistId: string;
};

export type LyricsRequest = {
	artistId: string;
	albumId: string;
};

// TODO: better validation
// TODO: actually check country
export function validateRegistrationRequest(
	thing: any
): Result<RegistrationRequest, string> {
	if (!thing.email || typeof thing.email !== "string")
		return failure("invalid email");
	if (!thing.username || typeof thing.username !== "string")
		return failure("invalid username");
	if (!thing.password || typeof thing.password !== "string")
		return failure("invalid password");
	if (!thing.country || typeof thing.country !== "string")
		return failure("invalid country");
	return success(thing as RegistrationRequest);
}

// TODO: better validation
export function validateLoginRequest(thing: any): Result<LoginRequest, string> {
	if (!thing.email || typeof thing.email !== "string")
		return failure("invalid email");
	if (!thing.password || typeof thing.password !== "string")
		return failure("invalid password");
	return success(thing as LoginRequest);
}

export function validateArtistRequest(
	thing: any
): Result<ArtistsRequest, string> {
	if (!thing.country || typeof thing.country !== "string")
		return failure("invalid country");
	return success(thing as ArtistsRequest);
}

export function validateAlbumsRequest(
	thing: any
): Result<AlbumsRequest, string> {
	if (!thing.artistId || typeof thing.artistId !== "string")
		return failure("invalid artistId");
	return success(thing as AlbumsRequest);
}

export function validateLyricsRequest(
	thing: any
): Result<LyricsRequest, string> {
	if (!thing.artistId || typeof thing.artistId !== "string")
		return failure("invalid artistId");
	if (!thing.albumId || typeof thing.albumId !== "string")
		return failure("invalid albumId");
	return success(thing as LyricsRequest);
}
