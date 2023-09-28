import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function capitalise(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Card({ pokemonApiID, onClick, getPokemonName }) {
	const [cardName, setCardName] = useState("Card Name");
	const [imageURL, setImageURL] = useState(null);
	const altText = `${cardName} sprite`;
	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonApiID}/`, {
			mode: "cors",
		})
			.then((response) => response.json())
			.then((response) => {
				setImageURL(response.sprites.front_default);
				const name = capitalise(response.name);
				setCardName(name);
				getPokemonName(name);
			})
			.catch((error) => {
				console.log(
					`Fetch error for pokemon monster api ID ${pokemonApiID}:`,
					error
				);
				// window.location.reload();
			});
	}, [pokemonApiID, getPokemonName]);

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
	pokemonApiID: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	getPokemonName: PropTypes.func.isRequired,
};
