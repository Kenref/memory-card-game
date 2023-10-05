import { useEffect, useState } from "react";
import Card from "./Cards";

function getRandomNumber(number, existingNumbers) {
	let returnValue;
	do {
		returnValue = Math.floor(Math.random() * number) + 1;
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
export default function Game({ incrementScore, setGameOver, gameState }) {
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [uniqueNumbers, setUniqueNumbers] = useState(new Set());
	const [gameDifficulty, setGameDifficulty] = useState({
		easy: 5,
		medium: 10,
		hard: 15,
		hardest: 20,
	});

	useEffect(() => {
		initialiseCards();
	}, []);

	const initialiseCards = () => {
		if (cards.length === 0) {
			const existingNumbers = new Set(uniqueNumbers);
			const initialCards = [...Array(gameDifficulty.easy)].map((_, i) => {
				const uniqueNumber = getRandomNumber(1000, existingNumbers);
				existingNumbers.add(uniqueNumber);
				return { apiID: uniqueNumber, pokemonName: `TempName_${uniqueNumber}` };
			});
			setCards(initialCards);
			setUniqueNumbers(existingNumbers);
		}
	};

	const handleGetPokemonName = (pokemonName, apiID) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.apiID === apiID ? { ...card, pokemonName } : card
			)
		);
	};

	const handleShuffle = () => {
		const shuffled = shuffleCards([...cards]);
		setCards(shuffled);
	};

	const saveClick = (pokemon) => {
		setClickedCards((prevClickedCards) => {
			const newClickedCards = [...prevClickedCards, pokemon];
			return newClickedCards;
		});
	};

	const checkGameResult = (clickedCardsSnapshot) => {
		const uniquePokemon = new Set(clickedCardsSnapshot);
		console.log(clickedCardsSnapshot.length, cards.length);

		if (uniquePokemon.size < clickedCardsSnapshot.length) {
			console.log("game lose");
			setGameOver();
			return 1;
		} else if (
			clickedCardsSnapshot.length === cards.length &&
			clickedCardsSnapshot.length > 0
		) {
			console.log("game win");
			setGameOver();
			return 2;
		}
		return 3;
	};

	const handleCardClick = (card) => {
		if (gameState === "running") {
			// create copy of clicked cards to check result based clicked cards snapshot
			const clickedCardsSnapshot = [...clickedCards, card.pokemonName];
			if (
				checkGameResult(clickedCardsSnapshot) === 3 ||
				checkGameResult(clickedCardsSnapshot) === 2
			) {
				saveClick(card.pokemonName);
				incrementScore();
				handleShuffle();
			}
		}
	};

	return (
		<div className="row gap-4 text-center justify-content-center">
			{cards.map((card, i) => {
				return (
					<Card
						pokemonApiID={card.apiID}
						getPokemonName={(name) => handleGetPokemonName(name, card.apiID)}
						key={card.pokemonName}
						onClick={() => {
							handleCardClick(card);
						}}
					></Card>
				);
			})}
		</div>
	);
}
