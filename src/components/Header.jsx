import { useState } from "react";

export default function Header() {
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	return (
		<header>
			<div className="row">
				<div className="col-10">
					<h1>Memory card game</h1>
					<p>
						Get points by clicking on unique cards, but do not click on any more
						than once
					</p>
				</div>
				<div className="col-2 text-end">
					<p>Score: {score}</p>
					<p>High Score: {highScore}</p>
				</div>
			</div>
		</header>
	);
}
