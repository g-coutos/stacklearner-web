"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import styles from "./styles.module.scss";

export default function Page() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleBodyChange = (value?: string) => {
		setBody(value || "");
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch("http://127.0.0.1:5000/posts/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					title,
					body,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					`Erro ${response.status}: ${errorData.error || "Erro desconhecido"}`
				);
			}

			if (response.ok) {
				const postData = await response.json();
				console.log(postData);
			}

			router.push("/admin/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<div className="breadcrumbs">
				<a href="/admin/dashboard">dashboard</a> / <span>new post</span>
			</div>

			<h1>Add New Post</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label htmlFor="title">title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={handleTitleChange}
					/>
				</div>

				<div>
					<label htmlFor="body">body</label>
					<MDEditor id="body" value={body} onChange={handleBodyChange} />
				</div>

				<div className={styles.actions}>
					<button type="submit">Save</button>
					{/* todo: redirect to new post */}
					<button type="button">Save && Add Another</button>
					{/* todo: redirect to actual blog post */}
					<button type="button">Save && Preview</button>
				</div>
			</form>
		</div>
	);
}
