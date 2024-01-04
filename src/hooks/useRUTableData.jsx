import productsData from "@/data/dataset.json";
import {
	checkDataValidity,
	parseDataAndArrangeProducts,
	separateDataGridWise,
} from "@/utils";

const useRUTableData = () => {
	// we can add async logic later, but for now, we'll just
	// process json file, arrange products, and return it

	const isDataValid = checkDataValidity(productsData);

	if (!isDataValid) {
		console.log("Error: Data is not valid");
		return { data: null, error: true };
	}

	const processedData = parseDataAndArrangeProducts(productsData);
	const gridWiseData = separateDataGridWise(processedData);

	return { data: { original: processedData, ...gridWiseData }, error: false };
};

export default useRUTableData;
