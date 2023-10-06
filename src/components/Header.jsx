import PropTypes from "prop-types";

export default function Header({
	score,
	highScore,
	style = {},
	className = {},
}) {
	return (
		<header style={style} className={className}>
			<div
				className="row container"
				style={{ minWidth: "450px", maxWidth: "1200px" }}
			>
				<div className="col">
					<img src="logo.png" alt="" className="img-fluid" />
				</div>
				<div className="col text-end pt-4">
					<p>Score: {score}</p>
					<p>High Score: {highScore}</p>
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	score: PropTypes.number,
	highScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
	className: PropTypes.string,
};
