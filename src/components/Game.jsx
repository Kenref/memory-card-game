import { useState } from "react";
import Card from "./Cards";

function getRandomNumber() {
	return Math.floor(Math.random() * 1000);
}

export default function Game() {
	return (
		<div className="card-group row gap-4 text-center justify-content-center">
			<Card monster="1000"></Card>
			<Card monster="pikachu"></Card>
			<Card monster="pikachu"></Card>
			<Card monster="pikachu"></Card>
			<Card monster="pikachu"></Card>
		</div>
	);
}
