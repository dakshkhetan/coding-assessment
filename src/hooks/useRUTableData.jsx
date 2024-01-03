import productsData from "@/data/dataset.json";
import { separateDataGridWise } from "@/utils";

const parseDataAndArrangeProducts = (data) => {
	const result = [];

	// create grids placeholder of size 20 each
	const grid1 = new Array(20).fill(null);
	const grid2 = new Array(20).fill(null);
	const grid3 = new Array(20).fill(null);
	const grid4 = new Array(20).fill(null);

	// function to check if no 2 products are adjacent to each other and then only place it in a grid
	const placeProductInGrid = (product, ...grids) => {
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
	for (let i = 0; i < data.length; i++) {
		const { product, repeat } = data[i];

		for (let j = 0; j < repeat; j++) {
			// place the i4 and i5 products in grid 1 and 2 first
			if (product === "Core i4" || product === "Core i5") {
				if (placeProductInGrid(product, grid1, grid2)) continue;
			} else {
				// place all other products in all grids
				if (placeProductInGrid(product, grid1, grid2, grid3, grid4))
					continue;
				else {
					// product could not be placed
					// throw an error maybe?
				}
			}
		}
	}

	// add all grids to the result array
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

	const processedData = parseDataAndArrangeProducts(productsData);
	const gridWiseData = separateDataGridWise(processedData);

	return { data: { original: processedData, ...gridWiseData } };
};

export default useRUTableData;
