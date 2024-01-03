import { RU_TABLE_CONSTANTS, COLOR_MAP } from "@/constants";

const Header = () => {
	const { TABLE_HEADING, COLUMN_NAMES } = RU_TABLE_CONSTANTS;

	return (
		<>
			<thead>
				<tr className="row-1">
					<th
						className="cell-1"
						colSpan={80}
						style={{ backgroundColor: COLOR_MAP.TABLE.HEADER_BG }}
					>
						<span>{TABLE_HEADING}</span>
					</th>
				</tr>

				<tr className="row-2">
					{COLUMN_NAMES.map((column, index) => (
						<th
							key={index}
							className={`cell-${index + 1} ${
								column.isRotated ? "rotated" : ""
							}`}
							colSpan={column.span}
							style={{
								backgroundColor: COLOR_MAP.TABLE.HEADER_BG,
							}}
						>
							<span>{column.name}</span>
						</th>
					))}
				</tr>
			</thead>
		</>
	);
};

export default Header;
