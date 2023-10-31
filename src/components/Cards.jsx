import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../card.css";

function capitalise(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Card({
	pokemonApiID,
	onClick,
	getPokemonName,
	cardFlipped,
}) {
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

	useEffect(() => {
		const imageUrl = "cardback.png";
		const img = new Image();
		img.src = imageUrl;
	}, []);

	return (
		<div
			className={`col-sm-2 col-3 custom-flip-card ${
				cardFlipped ? "flipped" : ""
			}`}
			style={{ maxHeight: window.innerWidth >= 1000 ? "210px" : "auto" }}
		>
			<div
				className="custom-card-front card"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					cursor: "pointer",
				}}
				onClick={onClick}
			>
				<img src={imageURL} alt={altText} className="custom-img" />
				<h4 className="fs-4">{cardName}</h4>
			</div>
			<div className="custom-card-back">
				<img
					src="cardback.png"
					alt="Pokemon card back"
					style={{ width: "100%", height: "100%" }}
				/>
			</div>
		</div>
	);
}

Card.propTypes = {
	pokemonApiID: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	getPokemonName: PropTypes.func.isRequired,
	cardFlipped: PropTypes.bool.isRequired,
};
