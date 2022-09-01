import { Handler } from "express";
import { validateAlbumsRequest, validateLyricsRequest } from "../models";
import { Musixmatch } from "../musixmatch";

export const artists: Handler = async (req, res) => {
	// @ts-ignore fix types so service is propagated
	const music = req.services.musixmatch as Musixmatch;
	// @ts-ignore fix types so service is propagated
	const userId = req.decodedToken.sub;
	// @ts-ignore fix types so service is propagated
	const countryQuery = await req.db.query(
		`SELECT country FROM users WHERE id = $1 LIMIT 1`,
		[userId]
	);

	const country = countryQuery.rows[0].country;

	const topCharting = await music.getTopCharting({
		country,
		format: "json",
		page_size: 3,
	});

	const artists = topCharting.message.body.artist_list.map((a) => {
		return {
			artistId: a.artist.artist_id,
			artistName: a.artist.artist_name,
		};
	});

	res.status(200).json(artists);
};

export const albums: Handler = async (req, res) => {
	// @ts-ignore fix types so service is propagated
	const music = req.services.musixmatch as Musixmatch;

	const albumInfo = validateAlbumsRequest(req.params);
	if (albumInfo.type == "failure") {
		return res.status(500).json({
			error: "albums error",
			message: albumInfo.error,
		});
	}
	const { artistId } = albumInfo.value;

	const albums = await music.getAlbums({
		artist_id: Number(artistId),
		s_release_date: "desc",
		page_size: 3,
		g_album_name: "1",
	});

	const threeAlbums = albums.message.body.album_list.map((a) => {
		return {
			albumId: a.album.album_id,
			albumName: a.album.album_name,
		};
	});

	res.status(200).json(threeAlbums);
};

export const lyrics: Handler = async (req, res) => {
	// @ts-ignore fix types so service is propagated
	const music = req.services.musixmatch as Musixmatch;

	const lyricsInfo = validateLyricsRequest(req.params);
	if (lyricsInfo.type == "failure") {
		return res.status(500).json({
			error: "albums error",
			message: lyricsInfo.error,
		});
	}
	const { artistId, albumId } = lyricsInfo.value;

	const tracks = await music.getTracks({
		album_id: Number(albumId),
	});

	const result = await Promise.all(
		tracks.message.body.track_list
			.map((t) => {
				return {
					trackName: t.track.track_name,
					trackId: t.track.track_id,
				};
			})
			.map(async (ft) => {
				const lyrics = await music.getLyrics({
					track_id: ft.trackId,
				});

				return {
					...ft,
					lyrics: lyrics.message.body?.lyrics?.lyrics_body,
				};
			})
	);

	res.status(200).json(result);
};
