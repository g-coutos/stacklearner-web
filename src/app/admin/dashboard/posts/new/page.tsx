"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Link from "next/link";

import MDEditor from "@uiw/react-md-editor";

import styles from "./styles.module.scss";

export default function Page() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		searchTags("");
	}, []);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleBodyChange = (value?: string) => {
		setBody(value || "");
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTags(e.target.value.split(",").map((tag) => tag.trim()));
	};

	const deleteTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const searchTags = async (inputValue: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/tags?search=${inputValue}`
			);

			if (!response.ok) {
				throw new Error("Erro ao buscar tags");
			}

			const data = await response.json();

			return data.map((tag: { id: number; name: string }) => ({
				value: tag.id,
				label: tag.name,
			}));
		} catch (error) {
			console.error("Erro ao buscar tags:", error);
			return [];
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					title,
					body,
					tags,
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
				<Link href="/admin/dashboard">dashboard</Link> / <span>new post</span>
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

				<div>
					<label htmlFor="tags">tags</label>
					<input
						type="text"
						id="tags"
						value={tags.join(", ")}
						onChange={handleTagChange}
						placeholder="add tags separated by commas"
					/>
					{tags.length > 0 && (
						<div className={styles.tags_container}>
							{tags.map((tag, index) => {
								return (
									tag !== "" && (
										<div key={index} className={styles.tag}>
											<span>{tag}</span>
											<button type="button" onClick={() => deleteTag(tag)}>
												x
											</button>
										</div>
									)
								);
							})}
						</div>
					)}
				</div>

				<div className={styles.actions}>
					<button type="submit">Save</button>
					<button type="button">Save && Add Another</button>
					<button type="button">Save && Preview</button>
				</div>
			</form>
		</div>
	);
}
