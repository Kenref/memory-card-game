import { useState } from "react";
import PropTypes from "prop-types";

export default function ListGroup({ items = [], heading = "No Heading" }) {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<>
			<h1 key={heading}>{heading}</h1>
			{items.length === 0 && <p>No Item round</p>}
			<ul className="list-group">
				{items.map((item, index) => (
					<li
						key={item}
						className={
							selectedIndex === index
								? "list-group-item active"
								: "list-group-item"
						}
						onClick={() => {
							setSelectedIndex(index);
						}}
					>
						{item}
					</li>
				))}
			</ul>
			<button className="btn btn-success">Button</button>
		</>
	);
}

ListGroup.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string),
	heading: PropTypes.string,
};
