import { useState, useEffect } from "react";
import productsData from "@/data/dataset.json";
// import { processedData } from "@/data/test";
import {
	checkDataValidity,
	parseDataAndArrangeProducts,
	separateDataGridWise,
} from "@/utils";

// custom hook to get data from JSON file and process it for the RU Table
const useRUTableData = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// we can add async logic later, but for now, we'll just
		// process json file, arrange products, and return it

		const isDataValid = checkDataValidity(productsData);

		if (!isDataValid) {
			console.log("Error: Data is not valid");
			setError(true);
			return;
		}

		const processedData = parseDataAndArrangeProducts(productsData);
		const gridWiseData = separateDataGridWise(processedData);

		setData({ original: processedData, ...gridWiseData });
		setError(false);
	}, []);

	return { data, error };
};

export default useRUTableData;
