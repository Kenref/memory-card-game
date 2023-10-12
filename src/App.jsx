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
			style={{
				backgroundImage: "url(/bg.webp)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
			}}
		>
			<div
				className=" custom-bg"
				style={{
					minWidth: "500px",
				}}
			>
				<Header
					score={score}
					highScore={highScore}
					style={{ fontFamily: "Bangers, sans serif", maxWidth: "1200px" }}
					className={"py-2 fs-5 mx-auto "}
				/>
				<Game
					incrementScore={incrementScore}
					setGameOver={setGameOver}
					gameState={gameState}
					setGameState={setGameState}
					className={
						"row text-center gap-sm-1 gap-md-2 gap-lg-3 gap-xl-4 justify-content-center mx-auto"
					}
					style={{
						fontFamily: "Gill Sans, sans serif",
						maxWidth: "1200px",
						perspective: "1000px",
					}}
				/>
			</div>
		</div>
	);
}
