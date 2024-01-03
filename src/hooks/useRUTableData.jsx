import { processedData } from "@/data/processedData";
import { separateDataGridWise } from "@/utils";

const useRUTableData = () => {
	// We can add async logic later, but for now, we'll just
	// process json file and return the data

	// TODO: process data here from JSON file

	const gridWiseData = separateDataGridWise(processedData);

	return { data: { original: processedData, ...gridWiseData } };
};

export default useRUTableData;
