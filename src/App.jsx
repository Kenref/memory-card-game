import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

export default function App() {
	const [gameState, setGameState] = useState("running");
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(
		localStorage.getItem("High Score")
	);

	const incrementScore = () => {
		if (gameState === "running") {
			setScore(score + 1);
		}
	};

	const setGameOver = () => {
		setGameState("over");
	};

	const setLocalStorageHighScore = () => {
		localStorage.setItem("High Score", highScore);
	};

	useEffect(() => {
		if (score >= highScore) {
			setHighScore(score);
			setLocalStorageHighScore();
		}
	}, [score, setLocalStorageHighScore]);

	return (
		<div className="container">
			<Header score={score} highScore={highScore}></Header>
			<Game
				incrementScore={incrementScore}
				setGameOver={setGameOver}
				gameState={gameState}
			></Game>
		</div>
	);
}

// need a way to change score to high score if score is higher than high score
// then after that store it into local storage.
