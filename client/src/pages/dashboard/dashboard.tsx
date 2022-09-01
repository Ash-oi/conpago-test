import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Typography,
} from "@mui/material";
import { getArtists } from "../../api";
import Albums from "./albums";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Dashboard() {
	const [artists, setArtists] = useState<null | Array<Record<string, string>>>(
		null
	);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArtists()
			.then((r) => {
				// TODO: handle unauthorised
				setLoading(false);
				setArtists(r);
			})
			.catch((err) => {
				setError(true);
			});
	}, []);

	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/" />;
	}

	return (
		<Container>
			<h1>Artists</h1>
			{loading && <div>loading...</div>}
			{error && <div>error!</div>}

			{artists &&
				artists.map(({ artistId, artistName }) => {
					return (
						<Accordion key={artistId}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>{artistName}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Albums artistId={artistId} />
							</AccordionDetails>
						</Accordion>
					);
				})}
		</Container>
	);
}
