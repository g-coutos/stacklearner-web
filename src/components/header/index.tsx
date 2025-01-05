import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Image src="/me.webp" alt="" width="30" height="30" />
			<Link href="/">stack learner</Link>

			<nav>
				<Link href="/blog">blog </Link> |{" "}
				<Link href="/services">services </Link> |{" "}
				<Link href="/projects">projects </Link> |{" "}
				<Link href="/contact">contact</Link>
			</nav>
		</header>
	);
};
