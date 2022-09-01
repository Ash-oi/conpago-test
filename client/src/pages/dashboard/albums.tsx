import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAlbums } from "../../api";
import Lyrics from "./lyrics";

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Albums(props: { artistId: string }) {
	const [albums, setAlbums] = useState<null | Array<Record<string, string>>>(
		null
	);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getAlbums(props.artistId)
			.then((r) => {
				setLoading(false);
				setAlbums(r);
			})
			.catch((err) => {
				setError(true);
			});
	}, [props.artistId]);

	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			{loading && <div>loading...</div>}
			{error && <div>error!</div>}
			<ul>
				{albums &&
					albums.map(({ albumId, albumName }) => (
						<Accordion key={albumId}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>{albumName}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Lyrics albumId={albumId} artistId={props.artistId} />
							</AccordionDetails>
						</Accordion>
					))}
			</ul>
		</div>
	);
}
