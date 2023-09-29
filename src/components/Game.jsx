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
export default function Game() {
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [uniqueNumbers, setUniqueNumbers] = useState(new Set());

	useEffect(() => {
		if (cards.length === 0) {
			const existingNumbers = new Set(uniqueNumbers);
			const initialCards = [...Array(5)].map((_, i) => {
				const uniqueNumber = getRandomNumber(1000, existingNumbers);
				existingNumbers.add(uniqueNumber);
				return { apiID: uniqueNumber, pokemonName: null };
			});
			setCards(initialCards);
			setUniqueNumbers(existingNumbers);
		}
	}, []);

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
		setClickedCards([...clickedCards, pokemon]);
		console.log(clickedCards);
	};

	const checkDuplicate = (clickedCards, apiID) => {
		if (clickedCards.includes(apiID)) {
			console.log("game over");
		}
	};

	const addScore = () => {};

	const handleSaveClickAndShuffle = (apiID) => {
		handleShuffle();
		saveClick(apiID);
		checkDuplicate(clickedCards);
		console.log(cards);
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
							handleSaveClickAndShuffle(i);
						}}
					></Card>
				);
			})}
		</div>
	);
}
