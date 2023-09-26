import { useState, useEffect } from "react";

function capitalise(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Card({ monster }) {
	const [cardName, setCardName] = useState("Card Name");
	const [imageURL, setImageURL] = useState(null);
	const altText = `${cardName} sprite`;

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${monster}/`, {
			mode: "cors",
		})
			.then((response) => response.json())
			.then((response) => {
				setImageURL(response.sprites.front_default);
				setCardName(capitalise(response.name));
			});
	}, [monster]);

	return (
		<div className="card border border-primary border-3 col-2">
			<img className="card-img-top" src={imageURL} alt={altText} />
			<h4 className="card-title">{cardName}</h4>
		</div>
	);
}
