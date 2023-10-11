import React, { useEffect, useRef, forwardRef } from "react";
// import { Modal } from "bootstrap";
// import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";

const GameStartModal = forwardRef((props, ref) => {
	const { gameDifficulty, setDifficultyAndLoadCards } = props;

	return (
		<div className="modal modal-lg" tabIndex="-1" ref={ref}>
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
						<h5 className="modal-title">Instructions</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<p>Select each Pokemon to win. Select any twice and you lose.</p>
					</div>
					<div className="modal-footer justify-content-around">
						<button
							type="button"
							className="btn btn-primary col-2"
							data-bs-dismiss="modal"
							onClick={() => setDifficultyAndLoadCards(gameDifficulty.easy)}
						>
							Easy
						</button>
						<button
							type="button"
							className="btn btn-success col-2"
							data-bs-dismiss="modal"
							onClick={() => setDifficultyAndLoadCards(gameDifficulty.medium)}
						>
							Medium
						</button>
						<button
							type="button"
							className="btn btn-warning col-2"
							data-bs-dismiss="modal"
							onClick={() => setDifficultyAndLoadCards(gameDifficulty.hard)}
						>
							Hard
						</button>
						<button
							type="button"
							className="btn btn-danger col-3"
							data-bs-dismiss="modal"
							onClick={() =>
								setDifficultyAndLoadCards(gameDifficulty.impossible)
							}
						>
							Impossible
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

GameStartModal.displayName = "GameStartModal";
export default GameStartModal;

GameStartModal.propTypes = {
	gameDifficulty: PropTypes.shape({
		easy: PropTypes.number,
		medium: PropTypes.number,
		hard: PropTypes.number,
		impossible: PropTypes.number,
	}).isRequired,
	setDifficultyAndLoadCards: PropTypes.func.isRequired,
};
