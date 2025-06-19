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

				<span>Aprendendo / Escrevendo / Compartilhando</span>
				<h1>Stack Learner</h1>
				<h2>Construindo conhecimento em público.</h2>
			</div>

			<section className={home.about}>
				<p>
					Stack Learner é o <span>blog</span> / <span>portfólio</span> pessoal
					do{" "}
					<Link
						href="https://www.linkedin.com/in/guilhermecouto-swe/"
						target="_blank"
					>
						Guilherme,
					</Link>
					onde ele explora e compartilha insights sobre o mundo da Engenharia de
					Software por meio de código e aprendizado contínuo.
				</p>
			</section>
		</main>
	);
}
