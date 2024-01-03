import { useState, useEffect } from "react";

import Row from "@/components/RUTable/Row";

import useRUTableData from "@/hooks/useRUTableData";
import { RU_TABLE_CONSTANTS } from "@/constants";

const useRUTablePopulateRows = () => {
	const { GRID_SIZE } = RU_TABLE_CONSTANTS;

	const { data } = useRUTableData();

	const [grid1And2DataRows, setGrid1And2DataRows] = useState([]);
	const [grid3And4DataRows, setGrid3And4DataRows] = useState([]);

	const [activeUnmaskProduct, setActiveUnmaskProduct] = useState(null);

	useEffect(() => {
		const getPopulateRowsForGridPair = (gridX, gridY) => {
			const dataRows = [];

			for (let i = 0; i < GRID_SIZE; i++) {
				const elementX = data[gridX][i];
				const elementY = data[gridY][i];

				dataRows.push(
					<Row
						key={i}
						index={i}
						elementX={elementX}
						elementY={elementY}
						isGridCol={i === 0}
						activeUnmaskProduct={activeUnmaskProduct}
						setActiveUnmaskProduct={setActiveUnmaskProduct}
					/>
				);
			}

			return dataRows;
		};

		const dataRowsGrid1And2 = getPopulateRowsForGridPair("grid1", "grid2");
		const dataRowsGrid3And4 = getPopulateRowsForGridPair("grid3", "grid4");

		setGrid1And2DataRows(dataRowsGrid1And2);
		setGrid3And4DataRows(dataRowsGrid3And4);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeUnmaskProduct]);

	return { grid1And2DataRows, grid3And4DataRows };
};

export default useRUTablePopulateRows;
