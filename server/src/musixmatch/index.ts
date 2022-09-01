import {
	TopChartingResponse,
	ArtistsAlbumsResponse,
	AlbumTracksResponse,
	TrackLyricsResponse,
} from "../models";

import axios from "axios";
import qs from "qs";
import NodeCache from "node-cache";

export class Musixmatch {
	private readonly apiKey: string;
	private readonly apiUrl: string;
	private cache: NodeCache;

	constructor(apiKey: string, apiUrl: string, cache: NodeCache) {
		this.apiKey = apiKey;
		this.apiUrl = apiUrl;
		this.cache = cache;
	}

	async getTopCharting(args: {
		country: string;
		page?: number;
		page_size?: number;
		format: "json";
	}): Promise<TopChartingResponse> {
		const params = {
			...args,
			apikey: this.apiKey,
		};

		const cacheKey = `tc_${args.country}`;
		const cached = this.cache.get(cacheKey);
		if (cached) {
			console.log("cache hit!");
			return cached as TopChartingResponse;
		}

		const response = await axios.get<TopChartingResponse>(
			`${this.apiUrl}chart.artists.get?${qs.stringify(params, {
				skipNulls: true,
			})}`
		);

		this.cache.set(cacheKey, response.data);

		return response.data;
	}

	async getAlbums(args: {
		artist_id: number;
		artist_mbid?: number;
		g_album_name?: string;
		s_release_date?: "asc" | "desc";
		page?: number;
		page_size?: number;
	}): Promise<ArtistsAlbumsResponse> {
		const params = {
			...args,
			apikey: this.apiKey,
		};

		const cacheKey = `ga_${args.artist_id}_${args.page}_${args.page_size}_${args.s_release_date}_${args.g_album_name}`;
		const cached = this.cache.get(cacheKey);
		if (cached) {
			console.log("cache hit!");
			return cached as ArtistsAlbumsResponse;
		}

		const response = await axios.get<ArtistsAlbumsResponse>(
			`${this.apiUrl}artist.albums.get?${qs.stringify(params, {
				skipNulls: true,
			})}`
		);

		this.cache.set(cacheKey, response.data);

		return response.data;
	}

	async getLyrics(args: {
		track_id: number;
		commontrack_id?: number;
	}): Promise<TrackLyricsResponse> {
		const params = {
			...args,
			apikey: this.apiKey,
		};

		const cacheKey = `gl_${args.track_id}`;
		const cached = this.cache.get(cacheKey);
		if (cached) {
			console.log("cache hit!");
			return cached as TrackLyricsResponse;
		}

		const response = await axios.get<TrackLyricsResponse>(
			`${this.apiUrl}track.lyrics.get?${qs.stringify(params, {
				skipNulls: true,
			})}`
		);

		this.cache.set(cacheKey, response.data);

		return response.data;
	}

	async getTracks(args: {
		album_id: number;
		album_mbid?: number;
		f_has_lyrics?: boolean; // number?
		page?: number;
		page_size?: number;
	}): Promise<AlbumTracksResponse> {
		const params = {
			...args,
			apikey: this.apiKey,
		};

		const cacheKey = `gal_${args.album_id}`;
		const cached = this.cache.get(cacheKey);
		if (cached) {
			console.log("cache hit!");
			return cached as AlbumTracksResponse;
		}

		const response = await axios.get<AlbumTracksResponse>(
			`${this.apiUrl}album.tracks.get?${qs.stringify(params, {
				skipNulls: true,
			})}`
		);

		this.cache.set(cacheKey, response.data);

		return response.data;
	}
}
