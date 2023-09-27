import React, { useState } from "react";
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
