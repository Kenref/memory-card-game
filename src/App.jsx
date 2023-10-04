import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

export default function App() {
	const [gameState, setGameState] = useState("running");
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const incrementScore = () => {
		if (gameState === "running") {
			setScore((prevScore) => prevScore + 1);
		}
	};

	const setGameOver = () => {
		setGameState("over");
	};

	return (
		<div className="container">
			<Header score={score} highScore={highScore}></Header>
			<Game incrementScore={incrementScore} setGameOver={setGameOver}></Game>
		</div>
	);
}
