import { useEffect, useState, useRef } from "react";
import Card from "./Cards";
import GameModal from "./GameModal";
import PropTypes from "prop-types";
import * as bootstrap from "bootstrap";

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueNumber(number, existingNumbers) {
	let returnValue;
	do {
		returnValue = getRandomNumber(1, number);
	} while (existingNumbers.has(returnValue));
	return returnValue;
}

//Fisher-Yates shuffle algorithm
function shuffleCards(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export default function Game({
	incrementScore,
	setGameOver,
	gameState,
	setGameState,
	setScore,
	score,
	style = {},
	className = {},
}) {
	const [modalTitle, setModalTitle] = useState("Instructions");
	const [modalBody, setModalBody] = useState(
		"Select each Pokemon to win. Select any twice and you lose."
	);
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [uniqueNumbers, setUniqueNumbers] = useState(new Set());
	const [cardFlipped, setCardFlipped] = useState(true);
	const [gameDifficulty, setGameDifficulty] = useState({
		easy: 5,
		medium: 10,
		hard: 15,
		impossible: 20,
	});
	//Dom modal ref
	const modalRef = useRef(null);
	//bootstrap modal ref
	const modalInstanceRef = useRef(null);

	// Initialize the modal instance only once
	useEffect(() => {
		if (modalRef.current && !modalInstanceRef.current) {
			modalInstanceRef.current = new bootstrap.Modal(modalRef.current);
			modalInstanceRef.current.show();
		}
	}, []);

	// Show the modal when the game state changes
	useEffect(() => {
		if (gameState === "over" && modalInstanceRef.current) {
			modalInstanceRef.current.show();
		}
	}, [gameState]);

	const setDifficultyAndLoadCards = (newDifficulty) => {
		setGameDifficulty({ ...gameDifficulty, difficulty: newDifficulty });
		initialiseGame(newDifficulty);
	};

	const initialiseGame = (difficulty) => {
		setGameState("running");
		setCards([]);
		setClickedCards([]);
		setScore(0);
		const existingNumbers = new Set(uniqueNumbers);
		const initialCards = [...Array(difficulty)].map((_, i) => {
			const uniqueNumber = getUniqueNumber(1000, existingNumbers);
			existingNumbers.add(uniqueNumber);
			return { apiID: uniqueNumber, pokemonName: `TempName_${uniqueNumber}` };
		});
		setCards(initialCards);
		setUniqueNumbers(existingNumbers);
	};

	const handleGetPokemonName = (pokemonName, apiID) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.apiID === apiID ? { ...card, pokemonName } : card
			)
		);
	};

	const handleShuffle = () => {
		setTimeout(() => {
			const shuffled = shuffleCards([...cards]);
			setCards(shuffled);
		}, 1000);
	};

	const saveClick = (pokemon) => {
		setClickedCards((prevClickedCards) => {
			const newClickedCards = [...prevClickedCards, pokemon];
			return newClickedCards;
		});
	};

	const checkGameResult = (clickedCardsSnapshot) => {
		const uniquePokemon = new Set(clickedCardsSnapshot);
		if (uniquePokemon.size < clickedCardsSnapshot.length) {
			setGameState("over");
			setModalTitle("You lose");
			setModalBody(`Your score was ${score}. Pick a difficulty to play again`);
			return "lose";
		} else if (
			clickedCardsSnapshot.length === cards.length &&
			clickedCardsSnapshot.length > 0
		) {
			setGameState("over");
			setModalTitle("You Win");
			setModalBody(`Your score was ${score}. Pick a difficulty to play again`);
			return "win";
		}
		return "continue";
	};

	const handleFlip = () => {
		// Wait a bit before flipping
		setTimeout(() => {
			setCardFlipped(true);

			// Wait before flipping back
			setTimeout(() => {
				setCardFlipped(false);
			}, 1200);
		}, 100);
	};

	const handleCardClick = (card) => {
		if (gameState === "running") {
			// create copy of clicked cards to check result based clicked cards snapshot
			const clickedCardsSnapshot = [...clickedCards, card.pokemonName];
			if (
				checkGameResult(clickedCardsSnapshot) === "continue" ||
				checkGameResult(clickedCardsSnapshot) === "win"
			) {
				saveClick(card.pokemonName);
				incrementScore();
				handleFlip();
				handleShuffle();
			}
		}
	};

	//TODO need to make the card stop flipping when the game is won
	//TODO need to make it so that cards will stay flipped until all cards are loaded

	return (
		<>
			<GameModal
				ref={modalRef}
				gameDifficulty={gameDifficulty}
				setGameDifficulty={setGameDifficulty}
				setDifficultyAndLoadCards={setDifficultyAndLoadCards}
				handleFlip={handleFlip}
				modalTitle={modalTitle}
				modalBody={modalBody}
				gameState={gameState}
				setGameState={setGameState}
				setClickedCards={setClickedCards}
				setCards={setCards}
			/>
			<div className={className} style={style}>
				{cards.map((card) => {
					return (
						<Card
							pokemonApiID={card.apiID}
							getPokemonName={(name) => handleGetPokemonName(name, card.apiID)}
							key={card.pokemonName}
							cardFlipped={cardFlipped}
							onClick={() => {
								handleCardClick(card);
							}}
						></Card>
					);
				})}
			</div>
		</>
	);
}

Game.propTypes = {
	incrementScore: PropTypes.func,
	setGameOver: PropTypes.func,
	gameState: PropTypes.string,
	setGameState: PropTypes.func,
	style: PropTypes.object,
	className: PropTypes.string,
};
