import Link from "next/link";

import { FaLayerGroup } from "react-icons/fa";

import home from "./home.module.scss";

export default function Home() {
	return (
		<main className="container">
			<div className={home.hero}>
				<div className={home.icon}>
					<FaLayerGroup size={25} />
				</div>

				<span>Learning / Writing / Sharing</span>
				<h1>Stack Learner</h1>
				<h2>Building knowledge in public.</h2>
			</div>

			<section className={home.about}>
				<p>
					Stack Learner is{" "}
					<Link
						href="https://www.linkedin.com/in/guilhermecouto-swe/"
						target="_blank"
					>
						Guilherme&apos;s
					</Link>{" "}
					personal <span>journal</span> / <span>portfolio</span>, where he
					explores and shares insights about the world of Software Engineering
					through code and continuous learning.
				</p>
			</section>
		</main>
	);
}
