import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getLyrics } from "../../api";

export default function Lyrics(props: { artistId: string; albumId: string }) {
	const [tracks, setTracks] = useState<null | Array<Record<string, string>>>(
		null
	);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getLyrics(props.artistId, props.albumId)
			.then((r) => {
				setLoading(false);
				setTracks(r);
			})
			.catch((err) => {
				setError(true);
			});
	}, [props.artistId, props.albumId]);

	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			{loading && <div>loading...</div>}
			{error && <div>error!</div>}
			<ul>
				{tracks &&
					tracks.map(({ trackId, trackName, lyrics }) => (
						<li key={trackId}>
							<h5>{trackName}</h5>
							<p>{lyrics}</p>
						</li>
					))}
			</ul>
		</div>
	);
}
