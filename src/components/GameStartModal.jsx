import React, { useEffect, useRef, forwardRef } from "react";
import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";

const GameStartModal = forwardRef((props, ref) => {
	const { gameDifficulty, setGameDifficulty, setGameDifficultyAndLoadCards } =
		props;

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
							onClick={() => setGameDifficultyAndLoadCards(easy)}
						></button>
					</div>
					<div className="modal-body">
						<p>
							Select every pokemon to win, but do not pick any more than once!
						</p>
					</div>
					<div className="modal-footer justify-content-around">
						<button
							type="button"
							className="btn btn-primary col-2"
							data-bs-dismiss="modal"
						>
							Easy
						</button>
						<button
							type="button"
							className="btn btn-success col-2"
							data-bs-dismiss="modal"
						>
							Medium
						</button>
						<button
							type="button"
							className="btn btn-warning col-2"
							data-bs-dismiss="modal"
						>
							Hard
						</button>
						<button
							type="button"
							className="btn btn-danger col-3"
							data-bs-dismiss="modal"
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
