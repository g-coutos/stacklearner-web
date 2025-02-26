"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

export default function Page() {
	const [data, setData] = useState<Post[]>([]);

	useEffect(() => {
		const data = fetch("http://localhost:5000/posts/");

		data.then((response) => response.json()).then(setData);
	}, []);

	const router = useRouter();

	function handleLogout() {
		fetch("http://localhost:5000/auth/logout", {
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

			{data.length > 0 ? (
				<>
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
								{data.map((post: Post) => (
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
				<p>0 items found.</p>
			)}

			<div className={styles.footer}>
				<a href="/admin/dashboard/posts/new">new post</a>
			</div>
		</div>
	);
}
