import Link from "next/link";

import styles from "./styles.module.scss";

interface Post {
	_id: string;
	title: string;
	body: string;
	slug: string;
	publish: string;
	created: string;
	updated: string;
}

interface Posts {
	posts: Post[];
	posts_total: number;
	pages_total: number;
	page: number;
	has_previus_page: boolean;
	has_next_page: boolean;
}

export default async function Page() {
	const data = await fetch(`${process.env.API_URL}/posts`);

	const posts: Posts = await data.json();

	return (
		<div className="container">
			<h1>Blog</h1>
			<div className={styles.posts}>
				{posts.posts.map((post, index) => {
					const date = new Date(post.created);
					const year = date.getFullYear();
					const month = date.getMonth() + 1;

					return (
						<div key={index} className={styles.post}>
							<span>
								{year} • {month.toString().padStart(2, "0")}
							</span>{" "}
							<Link href={`/blog/${post._id}`}>{post.title}</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}
