import React, { useState } from "react";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Button } from "@mui/material";
import { registerRequest } from "../../api";
import { useNavigate } from "react-router-dom";
import { Container, Link, Snackbar, Alert } from "@mui/material";

export default function Register() {
	let navigate = useNavigate();

	const [successOpen, setSuccessOpen] = useState(false);
	const [errorOpen, setErrorOpen] = useState(false);

	return (
		<Container>
			<FormContainer
				onSuccess={async (data) => {
					const result = await registerRequest(
						data.email,
						data.country,
						data.password,
						data.username
					);

					if (result.error) {
						setErrorOpen(true);
						return;
					}

					setSuccessOpen(true);
					setTimeout(() => {
						navigate("/");
					}, 3000);
				}}
			>
				<TextFieldElement
					name={"email"}
					label={"Email"}
					required
					type={"email"}
				/>
				<TextFieldElement
					name={"country"}
					label={"Country"}
					required
					type={"text"}
				/>
				<TextFieldElement
					name={"username"}
					label={"Username"}
					required
					type={"text"}
				/>
				<TextFieldElement
					name={"password"}
					label={"Password"}
					required
					type={"password"}
				/>
				<Button type={"submit"} color={"primary"}>
					Register
				</Button>
				<Link href="/">Login</Link>
			</FormContainer>
			<Snackbar
				open={successOpen}
				autoHideDuration={3000}
				message="Note archived"
			>
				<Alert severity="success" sx={{ width: "100%" }}>
					Registered
				</Alert>
			</Snackbar>
			{/* TODO: handle other error cases */}
			<Snackbar
				open={errorOpen}
				autoHideDuration={3000}
				message="Note archived"
			>
				<Alert severity="error" sx={{ width: "100%" }}>
					Something went wrong
				</Alert>
			</Snackbar>
		</Container>
	);
}
