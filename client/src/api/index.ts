export async function loginRequest(email: string, password: string) {
	const rawResponse = await fetch(process.env.REACT_APP_API_HOST + "/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const content = await rawResponse.json();

	if (content.token) {
		localStorage.setItem("token", content.token);
	}

	return content;
}

export async function registerRequest(
	email: string,
	country: string,
	password: string,
	username: string
) {
	const rawResponse = await fetch(
		process.env.REACT_APP_API_HOST + "/register",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, country, username }),
		}
	);

	const content = await rawResponse.json();

	return content;
}

export async function getArtists() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("no auth");
	}

	const rawResponse = await fetch(process.env.REACT_APP_API_HOST + `/artists`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: token,
		},
	});

	const content = await rawResponse.json();

	return content;
}

export async function getAlbums(artistId: string) {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("no auth");
	}

	const rawResponse = await fetch(
		process.env.REACT_APP_API_HOST + `/artist/${artistId}/albums`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: token,
			},
		}
	);

	const content = await rawResponse.json();

	return content;
}

export async function getLyrics(artistId: string, albumId: string) {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("no auth");
	}

	const rawResponse = await fetch(
		process.env.REACT_APP_API_HOST +
			`/artist/${artistId}/album/${albumId}/lyrics`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: token,
			},
		}
	);

	const content = await rawResponse.json();

	return content;
}
