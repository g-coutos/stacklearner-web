"use client";

import { IDate } from "@/interfaces/date";
import { IPost } from "@/interfaces/posts";

import { useParams } from "next/navigation";
import Link from "next/link";

import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

<<<<<<< HEAD
import styles from "./styles.module.scss";
=======
console.log(process.env.NEXT_PUBLIC_API_URL);
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
>>>>>>> 90bada6beb3eaae9308e1a718029acf198020af7

export default function Page() {
	const params = useParams();

	const [date, setDate] = useState<IDate | null>(null);
	const [post, setPost] = useState<IPost | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchPost = async () => {
		const id = params.id;
		const data = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/posts/by-id?_id=${id}`
		);
		const post: IPost = await data.json();

		const date = new Date(post.created);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

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

					<div className={styles.tags_container}>
						<div className={styles.tag}>
							{post?.tags?.map((tag, index) => (
								<p key={index}>{tag.name}</p>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
