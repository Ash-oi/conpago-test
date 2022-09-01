// generated using https://app.quicktype.io/
export interface TopChartingResponse {
	message: TopChartingResponseMessage;
}

interface TopChartingResponseMessage {
	header: TopChartingResponseHeader;
	body: TopChartingResponseBody;
}

interface TopChartingResponseBody {
	artist_list: TopChartingResponseArtistList[];
}

interface TopChartingResponseArtistList {
	artist: TopChartingResponseArtist;
}

interface TopChartingResponseArtist {
	artist_id: number;
	artist_mbid: string;
	artist_name: string;
	artist_alias_list: any[];
	artist_rating: number;
	updated_time: Date;
}

interface TopChartingResponseHeader {
	status_code: number;
	execute_time: number;
}

export interface ArtistsAlbumsResponse {
	message: ArtistsAlbumsResponseMessage;
}

interface ArtistsAlbumsResponseMessage {
	header: ArtistsAlbumsResponseHeader;
	body: ArtistsAlbumsResponseBody;
}

interface ArtistsAlbumsResponseBody {
	album_list: ArtistsAlbumsResponseAlbumList[];
}

interface ArtistsAlbumsResponseAlbumList {
	album: ArtistsAlbumsResponseAlbum;
}

interface ArtistsAlbumsResponseAlbum {
	album_id: number;
	album_mbid: null;
	album_name: string;
	album_rating: number;
	album_track_count: number;
	album_release_date: Date;
	album_release_type: string;
	artist_id: number;
	artist_name: string;
	primary_genres: ArtistsAlbumsResponseAryGenres;
	secondary_genres: ArtistsAlbumsResponseAryGenres;
	album_pline: string;
	album_copyright: string;
	album_label: string;
	updated_time: Date;
	album_coverart_100x100: string;
}

interface ArtistsAlbumsResponseAryGenres {
	music_genre_list: ArtistsAlbumsResponseMusicGenreList[];
}

interface ArtistsAlbumsResponseMusicGenreList {
	music_genre: ArtistsAlbumsResponseMusicGenre;
}

interface ArtistsAlbumsResponseMusicGenre {
	music_genre_id: number;
	music_genre_parent_id: number;
	music_genre_name: string;
	music_genre_name_extended: string;
}

interface ArtistsAlbumsResponseHeader {
	status_code: number;
	execute_time: number;
	available: number;
}

export interface TrackLyricsResponse {
	message: TrackLyricsReponseMessage;
}

interface TrackLyricsReponseMessage {
	header: TrackLyricsReponseHeader;
	body: TrackLyricsReponseBody;
}

interface TrackLyricsReponseBody {
	lyrics: TrackLyricsReponseLyrics;
}

interface TrackLyricsReponseLyrics {
	lyrics_id: number;
	restricted: number;
	instrumental: number;
	lyrics_body: string;
	lyrics_language: string;
	script_tracking_url: string;
	pixel_tracking_url: string;
	lyrics_copyright: string;
	backlink_url: string;
	updated_time: Date;
}

interface TrackLyricsReponseHeader {
	status_code: number;
	execute_time: number;
}

export interface AlbumTracksResponse {
	message: AlbumTracksResponseMessage;
}

export interface AlbumTracksResponseMessage {
	header: AlbumTracksResponseHeader;
	body: AlbumTracksResponseBody;
}

export interface AlbumTracksResponseBody {
	track_list: AlbumTracksResponseTrackList[];
}

export interface AlbumTracksResponseTrackList {
	track: AlbumTracksResponseTrack;
}

export interface AlbumTracksResponseTrack {
	track_id: number;
	track_mbid: string;
	track_length: number;
	lyrics_id: number;
	instrumental: number;
	subtitle_id: number;
	track_name: string;
	track_rating: number;
	album_name: string;
	album_id: number;
	artist_id: number;
	album_coverart_100x100: string;
	artist_mbid: string;
	artist_name: string;
	updated_time: Date;
}

export interface AlbumTracksResponseHeader {
	status_code: number;
	execute_time: number;
	available: number;
}
