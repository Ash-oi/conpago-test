import React, { useState } from "react";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Button } from "@mui/material";
import { loginRequest } from "../../api";
import { useNavigate } from "react-router-dom";

import { Container, Link, Snackbar, Alert } from "@mui/material";

export default function Login() {
	let navigate = useNavigate();
	const [errorOpen, setErrorOpen] = useState(false);

	return (
		<Container>
			<FormContainer
				onSuccess={async (data) => {
					const result = await loginRequest(data.email, data.password);

					if (result.success) {
						navigate("/dashboard");
					}

					setErrorOpen(true);
				}}
			>
				<TextFieldElement
					name={"email"}
					label={"Email"}
					required
					type={"email"}
				/>
				<TextFieldElement
					name={"password"}
					label={"Password"}
					required
					type={"password"}
				/>
				<Button type={"submit"} color={"primary"}>
					Login
				</Button>
				<Link href="/register">Register</Link>
			</FormContainer>
			{/* TODO: handle other error cases */}
			<Snackbar
				open={errorOpen}
				autoHideDuration={3000}
				message="Note archived"
			>
				<Alert severity="error" sx={{ width: "100%" }}>
					invalid
				</Alert>
			</Snackbar>
		</Container>
	);
}
