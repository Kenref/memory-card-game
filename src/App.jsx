import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./app.css";

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
		<div
			className="border border-4"
			style={{
				backgroundImage: "url(/bg.webp)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "100vh",
			}}
		>
			<Header score={score} highScore={highScore} style={{}} />
			<Game
				incrementScore={incrementScore}
				setGameOver={setGameOver}
				gameState={gameState}
				className={"row text-center"}
			/>
		</div>
	);
}
// style={{
// 	backgroundImage: "url(/bg.webp)",
// 	backgroundSize: "cover",
// 	backgroundRepeat: "no-repeat",
// 	height: "100vh",
// }}
