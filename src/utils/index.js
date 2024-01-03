export const separateDataGridWise = (data) => {
	// TODO:
	// const GRIDS = [1, 2, 3, 4];
	// const GRIDS = { 1: "grid1", 2: "grid2", 3: "grid3", 4: "grid4" };
	// const modifiedData = Object.keys(GRIDS).map((grid_num) =>
	// 	data
	// 		.filter((item) => item.grid === grid_num)
	// 		.sort((a, b) => a.ru - b.ru)
	// );
	// console.log(modifiedData);
	// return modifiedData;

	const grid1 = data
		.filter((item) => item.grid === 1)
		.sort((a, b) => a.ru - b.ru);
	const grid2 = data
		.filter((item) => item.grid === 2)
		.sort((a, b) => a.ru - b.ru);
	const grid3 = data
		.filter((item) => item.grid === 3)
		.sort((a, b) => a.ru - b.ru);
	const grid4 = data
		.filter((item) => item.grid === 4)
		.sort((a, b) => a.ru - b.ru);

	return { grid1, grid2, grid3, grid4 };
};
