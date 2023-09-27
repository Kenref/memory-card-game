import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function capitalise(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Card({ monster, onClick }) {
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
				const name = capitalise(response.name);
				setCardName(name);
			})
			.catch((error) => {
				console.log(`Fetch error for monster ID ${monster}:`, error);
			});
	}, [monster]);

	return (
		<div
			className="card border border-primary border-3 col-2"
			onClick={onClick}
		>
			<img className="card-img-top" src={imageURL} alt={altText} />
			<h4 className="card-title">{cardName}</h4>
		</div>
	);
}

Card.propTypes = {
	monster: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};
