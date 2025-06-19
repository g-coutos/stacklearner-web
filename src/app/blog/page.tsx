import { IPosts } from "@/interfaces/posts";
import Link from "next/link";
import styles from "./styles.module.scss";

export default async function Page() {
	let posts: IPosts;

	try {
		const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
		posts = await data.json();
	} catch (error) {
		console.error("Failed to fetch posts:", error);

		posts = {
			posts: [],
			posts_total: 0,
			pages_total: 0,
			page: 1,
			has_previus_page: false,
			has_next_page: false,
		};
	}

	return (
		<div className="container">
			<h1>Blog</h1>
			<div className={styles.posts}>
				{posts.posts_total !== 0 ? (
					posts.posts.map((post, index) => {
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
					})
				) : (
					<p>Nenhum post disponível</p>
				)}
			</div>
		</div>
	);
}
