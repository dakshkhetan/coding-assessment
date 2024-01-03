import Header from "./Header";
import Body from "./Body";

import "@/styles/ru-table.scss";

const RUTable = () => {
	return (
		<>
			<div className="table-container">
				<table className="ru-table">
					<Header />
					<Body />
				</table>
			</div>
		</>
	);
};

export default RUTable;
