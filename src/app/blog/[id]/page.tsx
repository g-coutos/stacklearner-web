"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Link from "next/link";

import styles from "./styles.module.scss";

import MarkdownPreview from "@uiw/react-markdown-preview";

interface Post {
	_id?: string;
	title: string;
	body: string;
	slug: string;
	publish: string;
	created: string;
	updated: string;
}
interface Date {
	year: number;
	month: string;
	day: number;
}

export default function Page() {
	const params = useParams();

	const [date, setDate] = useState<Date | null>(null);
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchPost = async () => {
		const id = (await params).id;
		const data = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/posts?_id=${id}`
		);
		const post: Post = await data.json();

		const date = new Date(post.created);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate();

		setDate({ year, month, day });
		setPost(post);
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<div className={styles.loader}></div>
			) : (
				<div className="container">
					<div className={styles.breadcrumbs}>
						<Link href="/blog">blog</Link> / <span>{post?.title}</span>
					</div>
					<h1 className={styles.title}>{post?.title}</h1>
					<div className={styles.date}>
						<span>
							{date?.day}/{date?.month}/{date?.year} • by{" "}
							<Link
								href="https://www.linkedin.com/in/guilhermecouto-swe/"
								target="_blank"
							>
								Guilherme Couto
							</Link>
						</span>
					</div>

					<MarkdownPreview source={post?.body} />
				</div>
			)}
		</>
	);
}
