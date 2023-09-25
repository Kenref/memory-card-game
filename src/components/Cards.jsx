import { SetState } from "react";

export default function Card() {
	const [cardName, setCardName] = SetState("Card Name");
	const [imageURL, setImageURL] = SetState("");
	return (
		<div>
			<img src={imageURL} alt="Card" />
			<h4>{cardName}</h4>
		</div>
	);
}
