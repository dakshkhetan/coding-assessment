import productsData from "@/data/dataset.json";
import { checkDataValidity, separateDataGridWise } from "@/utils";

const parseDataAndArrangeProducts = (data) => {
	const result = [];

	// create grids placeholder of size 20 each
	const grid1 = new Array(20).fill(null);
	const grid2 = new Array(20).fill(null);
	const grid3 = new Array(20).fill(null);
	const grid4 = new Array(20).fill(null);

	// function to check if no 2 products are adjacent to each other and then only place it in a grid
	const placeProductInGrid = (product, grids) => {
		for (let grid of grids) {
			for (let i = 0; i < grid.length; i++) {
				if (
					!grid[i] &&
					(i === 0 || grid[i - 1] !== product) &&
					(i === grid.length - 1 || grid[i + 1] !== product)
				) {
					grid[i] = product;
					return true;
				}
			}
		}
		return false;
	};

	// loop over data and place products in grids
	// check for Core i4 and Core i5 products first to satisfy given constraint
	data.forEach(({ product, repeat }) => {
		for (let j = 0; j < repeat; j++) {
			// place the i4 and i5 products in grid 1 and 2 first
			// and then place other products in all grids
			const grids =
				product === "Core i4" || product === "Core i5"
					? [grid1, grid2]
					: [grid1, grid2, grid3, grid4];
			if (placeProductInGrid(product, grids)) {
				continue;
			} else {
				// product could not be placed
				// error
			}
		}
	});

	// add all grids to the result array, notice the order: Grid 1 -> 3 -> 2 -> 4
	grid1.forEach((product, i) => {
		result.push({ product, grid: 1, ru: i });
	});
	grid3.forEach((product, i) => {
		result.push({ product, grid: 3, ru: i + 20 });
	});
	grid2.forEach((product, i) => {
		result.push({ product, grid: 2, ru: i + 40 });
	});
	grid4.forEach((product, i) => {
		result.push({ product, grid: 4, ru: i + 60 });
	});

	return result;
};

const useRUTableData = () => {
	// We can add async logic later, but for now, we'll just
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
