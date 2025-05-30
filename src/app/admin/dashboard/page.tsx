"use client";

import { Posts, Post } from "@/interfaces/posts";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { Pagination } from "@/components/pagination";

export default function Page() {
	const router = useRouter();

	const [data, setData] = useState<Posts>({
		posts: [],
		posts_total: 0,
		pages_total: 0,
		page: 0,
		has_previus_page: false,
		has_next_page: false,
	});

	useEffect(() => {
		const data = fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?page=1`);

		data.then((response) => response.json()).then(setData);
	}, []);

	function handleLogout() {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});

		router.push("/admin/login");
	}

	return (
		<div className="container">
			<div className={styles.header}>
				<h1>Dashboard</h1>
				<button onClick={handleLogout}>Logout</button>
			</div>

			{data.posts.length > 0 ? (
				<>
					{data.pages_total > 1 && (
						<Pagination
							pages_total={data.pages_total}
							page={data.page}
							setData={setData}
						/>
					)}
					<span className={styles.subtitle}>
						<code>blog / posts</code>
					</span>
					<div className={styles.table}>
						<table>
							<thead>
								<tr>
									<th>title</th>
									<th>slug</th>
									<th>created</th>
									<th>updated</th>
								</tr>
							</thead>
							<tbody>
								{data.posts.map((post: Post) => (
									<tr key={post._id}>
										<td>
											<a href={`/admin/dashboard/posts/${post._id}`}>
												{post.title}
											</a>
										</td>
										<td>{post.slug}</td>
										<td>{post.created}</td>
										<td>{post.updated}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			) : (
				<p>0 posts found.</p>
			)}

			<div className={styles.footer}>
				<Link href="/admin/dashboard/posts/new">new post</Link>
			</div>
		</div>
	);
}
