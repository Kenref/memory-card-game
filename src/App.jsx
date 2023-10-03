import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

export default function App() {
	const [gameStatus, setGameStatus] = useState("running");
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const incrementScore = () => {
		setScore(score + 1);
	};

	return (
		<div className="container">
			<Header score={score} highScore={highScore}></Header>
			<Game incrementScore={incrementScore} setHighScore={setHighScore}></Game>
		</div>
	);
}
