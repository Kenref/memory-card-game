import React, { useState } from "react";
import ListGroup from "./components/ListGroup";
import Header from "./components/Header";
import Game from "./components/Game";

export default function App() {
	return (
		<div className="container">
			<Header></Header>
			<Game></Game>
		</div>
	);
}
