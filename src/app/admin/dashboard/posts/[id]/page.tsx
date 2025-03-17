"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";

import MDEditor from "@uiw/react-md-editor";
import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.scss";

interface Post {
	_id?: string;
	title: string;
	body: string;
	slug?: string;
	publish?: string;
	created?: string;
	updated?: string;
}

export default function Page() {
	const { id } = useParams<{ id: string }>();

	const router = useRouter();

	const [post, setPost] = useState<Post>({
		title: "",
		body: "",
		slug: "",
		created: "",
		updated: "",
		publish: "",
	});

	useEffect(() => {
		const data = fetch(`http://127.0.0.1:5000/posts?_id=${id}`);

		data.then((response) => response.json()).then(setPost);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const action = (event.nativeEvent as SubmitEvent)
			.submitter as HTMLButtonElement;

		try {
			const response = await fetch("http://127.0.0.1:5000/posts/", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(post),
			});

			if (!response.ok) {
				const data = await response.json();
				toast.error(`${data.error || "Unknown"}`);

				return;
			}

			switch (action.value) {
				case "save":
					router.push("/admin/dashboard");
					break;
				case "save_add":
					router.push("/admin/dashboard/posts/new");
					break;
				case "save_preview":
					router.push(`/blog/${id}`);
					break;
				default:
					break;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handlePostDelete = async () => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/posts/?_id=${id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				const data = await response.json();
				toast.error(`${data.error || "Unknown"}`);

				return;
			}

			router.push("/admin/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (post) {
			setPost({ ...post, title: event.target.value });
		}
	};

	const handleBodyChange = (value?: string) => {
		if (post) {
			setPost({ ...post, body: value || "" });
		}
	};

	return (
		<div className="container">
			<div className="breadcrumbs">
				<Link href="/admin/dashboard">dashboard</Link> /{" "}
				<span>{post?._id}</span>
			</div>

			<h1>Edit Post</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<label htmlFor="title">title</label>
				<input
					type="text"
					id="title"
					value={post?.title}
					onChange={handleTitleChange}
				/>

				<label htmlFor="body">body</label>
				<MDEditor id="body" value={post?.body} onChange={handleBodyChange} />

				<label htmlFor="slug">slug</label>
				<input type="text" id="slug" value={post?.slug} disabled />

				<label htmlFor="created">created</label>
				<input type="text" id="created" value={post?.created} disabled />

				<label htmlFor="updated">updated</label>
				<input type="text" id="updated" value={post?.updated} disabled />

				<label htmlFor="publish">publish</label>
				<input type="text" id="publish" value={post?.publish} disabled />

				<div className={styles.actions}>
					<button type="submit" value="save">
						Save
					</button>
					{/* todo: redirect to new post */}
					<button type="submit" value="save_add">
						Save && Add Another
					</button>
					{/* todo: redirect to actual blog post */}
					<button type="submit" value="save_preview">
						Save && Preview
					</button>
					<button type="button" onClick={handlePostDelete}>
						Delete
					</button>
				</div>
			</form>
			<Toaster />
		</div>
	);
}
