import PropTypes from "prop-types";

export default function Header({
	score,
	highScore,
	style = {},
	className = {},
}) {
	return (
		<header style={style} className={className}>
			<div className="row">
				<div className="col-9">
					<h1>Memory card game</h1>
					<p>
						Get points by clicking on unique cards, but do not click on any more
						than once
					</p>
				</div>
				<div className="col-3 text-end">
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
