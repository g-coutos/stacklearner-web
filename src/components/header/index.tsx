import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Link
				href="https://www.linkedin.com/in/guilhermecouto-swe/"
				target="_blank"
			>
				<Image
					src="https://avatars.githubusercontent.com/u/88390899?v=4"
					alt=""
					width="30"
					height="30"
				/>
			</Link>
			<Link href="/">stack learner</Link>

			<nav>
				<Link href="/blog">blog </Link> | <Link href="/contact">contact</Link>
			</nav>
		</header>
	);
};
