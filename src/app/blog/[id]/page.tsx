import Link from "next/link";

import { remark } from "remark";
import html from "remark-html";

import styles from "./styles.module.scss";

interface Post {
	_id?: string;
	title: string;
	body: string;
	slug: string;
	publish: string;
	created: string;
	updated: string;
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const data = await fetch(`http://127.0.0.1:5000/posts?_id=${id}`);
	const post: Post = await data.json();

	const date = new Date(post.created);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate();

	const processed = await remark().use(html).process(post.body);
	post.body = processed.toString();

	return (
		<div className="container">
			<div className="breadcrumbs">
				<Link href="/blog">blog</Link> / <span>{post?.title}</span>
			</div>
			<h1 className={styles.title}>{post?.title}</h1>
			<div className={styles.date}>
				<span>
					{day}/{month}/{year} • by{" "}
					<Link
						href="https://www.linkedin.com/in/guilhermecouto-swe/"
						target="_blank"
					>
						Guilherme Couto
					</Link>
				</span>
			</div>
			<div
				className={styles.markdown}
				dangerouslySetInnerHTML={{ __html: post?.body }}
			></div>
		</div>
	);
}
