"use client";

import { IChangeEvent } from "@/interfaces/change-event";
import { ILogin } from "@/interfaces/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function Page() {
	const router = useRouter();

	const [data, setData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e: IChangeEvent) => {
		const { name, value } = e.target;
		setData((prev: ILogin) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!data.username || !data.password) {
			setError("* fill in all fields *");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) throw new Error("* login failed *");

			router.push("/admin/dashboard");
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	return (
		<div className="container login">
			<div className={styles.form}>
				<span>Sign in</span>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">username</label>
					<input
						name="username"
						value={data.username}
						onChange={handleChange}
						type="text"
					/>
					<label htmlFor="password">password</label>
					<input
						name="password"
						value={data.password}
						onChange={handleChange}
						type="password"
					/>

					{error && <span>{error}</span>}

					<button type="submit">Let&apos;s Go</button>
				</form>
			</div>
		</div>
	);
}
