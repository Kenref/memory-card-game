import { useEffect, useState } from "react";
import Card from "./Cards";

function getRandomNumber(number) {
	return Math.floor(Math.random() * number);
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
	useEffect(() => {
		setCards(
			[...Array(2)].map((_, i) => ({ id: getRandomNumber(1000), name: null }))
		);
	}, []);

	return (
		<div className="row gap-4 text-center justify-content-center">
			{cards.map((card, i) => {
				console.log(i);
				return <Card monster={card.id} key={i}></Card>;
			})}
		</div>
	);
}
