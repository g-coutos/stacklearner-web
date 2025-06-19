import { IPosts } from "@/interfaces/posts";
import React from "react";
import styles from "./styles.module.scss";

interface PaginationProps {
	pages_total: number;
	page: number;
	setData: React.Dispatch<React.SetStateAction<IPosts>>;
}

export const Pagination = ({ pages_total, page, setData }: PaginationProps) => {
	const handlePage = async (page: number) => {
		const data = fetch(`{process.env.NEXT_PUBLIC_API_URL}/posts/?page=${page}`);

		data.then((response) => response.json()).then(setData);
	};

	return (
		<div className={styles.pagination}>
			{Array.from({ length: pages_total }, (_, index) => (
				<button
					key={index}
					className={page === index + 1 ? styles.active : ""}
					onClick={() => {
						handlePage(index + 1);
					}}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
};
