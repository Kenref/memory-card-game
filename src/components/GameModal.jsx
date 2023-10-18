import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const GameModal = forwardRef((props, ref) => {
	const {
		gameDifficulty,
		setDifficultyAndLoadCards,
		handleFlip,
		modalTitle,
		gameState,
		setGameState,
	} = props;

	const onButtonClick = (difficulty) => {
		handleFlip();
		setDifficultyAndLoadCards(difficulty);
		if (gameState !== "running") {
			setGameState("running");
		}
	};

	return (
		<div
			className="modal modal-lg"
			data-bs-backdrop="static"
			tabIndex="-1"
			ref={ref}
		>
			<div
				className="modal-dialog "
				style={{
					position: "relative",
					top: "50%",
					transform: "translateY(-50%)",
				}}
			>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{modalTitle}</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body col">
						<img src="squirtle.jpg" alt="squirtle picture" className=" col-3" />
						<img
							src="bulbasaur.png"
							alt="bulbasaur picture"
							className=" col-3"
						/>
						<img
							src="charmander.png"
							alt="Charmander picture"
							className=" col-3"
						/>
						<img src="pikachu.png" alt="pikachu picture" className=" col-3" />
					</div>
					<div className="modal-footer justify-content-around">
						<button
							type="button"
							className="btn btn-primary col-2"
							data-bs-dismiss="modal"
							onClick={() => {
								onButtonClick(gameDifficulty.easy);
							}}
						>
							Easy
						</button>
						<button
							type="button"
							className="btn btn-success col-2"
							data-bs-dismiss="modal"
							onClick={() => {
								onButtonClick(gameDifficulty.medium);
							}}
						>
							Medium
						</button>
						<button
							type="button"
							className="btn btn-danger col-2"
							data-bs-dismiss="modal"
							onClick={() => {
								onButtonClick(gameDifficulty.hard);
							}}
						>
							Hard
						</button>
						<button
							type="button"
							className="btn btn-warning col-3"
							data-bs-dismiss="modal"
							onClick={() => {
								onButtonClick(gameDifficulty.impossible);
							}}
						>
							Impossible
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

GameModal.displayName = "GameModal";
export default GameModal;

GameModal.propTypes = {
	gameDifficulty: PropTypes.shape({
		easy: PropTypes.number,
		medium: PropTypes.number,
		hard: PropTypes.number,
		impossible: PropTypes.number,
	}).isRequired,
	setDifficultyAndLoadCards: PropTypes.func.isRequired,
	handleFlip: PropTypes.func.isRequired,
	modalTitle: PropTypes.string,
	modalBody: PropTypes.string,
	gameState: PropTypes.string,
	setGameState: PropTypes.func,
};
