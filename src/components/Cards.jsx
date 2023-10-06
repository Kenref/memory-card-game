import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../card.css";

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
				window.location.reload();
			});
	}, [pokemonApiID]);

	return (
		<div
			className=" col-2 border border-warning custom-card card"
			style={{
				backgroundColor: "rgba(0, 0, 0, 0.3)",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			<img src={imageURL} alt={altText} className="custom-img" />
			<h4 className="fs-4">{cardName}</h4>
		</div>
	);
}

Card.propTypes = {
	pokemonApiID: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	getPokemonName: PropTypes.func.isRequired,
};

//TODO when the game is finished opeen a modal - look at built in bootstrap modals
