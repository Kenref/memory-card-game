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
	const [uniqueNumbers, setUniqueNumbers] = useState(new Set());

	// generating the initial cards
	useEffect(() => {
		const existingNumbers = new Set(uniqueNumbers);
		const initialCards = [...Array(10)].map((_, i) => {
			const uniqueNumber = getRandomNumber(1000, existingNumbers);
			existingNumbers.add(uniqueNumber);
			return { id: uniqueNumber, name: null };
		});
		setCards(initialCards);
		setUniqueNumbers(existingNumbers);
	}, []);

	const handleShuffle = () => {
		const shuffled = shuffleCards([...cards]);
		setCards(shuffled);
		console.log(shuffled);
	};

	return (
		<div className="row gap-4 text-center justify-content-center">
			{cards.map((card, i) => {
				// console.log(i);
				return <Card monster={card.id} key={i} onClick={handleShuffle}></Card>;
			})}
		</div>
	);
}
