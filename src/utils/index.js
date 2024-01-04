import { RU_TABLE_CONSTANTS } from "@/constants";

const { GRID_SIZE } = RU_TABLE_CONSTANTS;

// check data validity by checking if total product count is 80
export const checkDataValidity = (data) => {
	let sum = 0;

	data.forEach(({ repeat }) => {
		sum += repeat;
	});

	return sum === 80;
};

// https://stackoverflow.com/a/46545530
export const shuffleArray = (unshuffled) => {
	const shuffled = unshuffled
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	return shuffled;
};

// function to parse data and arrange products as per given constraints
export const parseDataAndArrangeProducts = (data) => {
	const result = [];

	// create grids placeholder of size 20 each
	const grid1 = new Array(GRID_SIZE).fill(null);
	const grid2 = new Array(GRID_SIZE).fill(null);
	const grid3 = new Array(GRID_SIZE).fill(null);
	const grid4 = new Array(GRID_SIZE).fill(null);

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
			// also shuffle the grids to effectively distribute the products
			const targetGrids =
				product === "Core i4" || product === "Core i5"
					? shuffleArray([grid1, grid2])
					: shuffleArray([grid1, grid2, grid3, grid4]);
			if (placeProductInGrid(product, targetGrids)) {
				continue;
			} else {
				// if product could not be placed in any grid, log error
				console.log(
					`Error: "${product}" could not be placed in any grid.`
				);
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

// separate data grid wise and sort by RU#
export const separateDataGridWise = (data) => {
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

export const sendTelegramAlert = async (message) => {
	try {
		// console.log(import.meta.env);

		const { VITE_APP_TELEGRAM_BOT_TOKEN, VITE_APP_TELEGRAM_BOT_CHAT_ID } =
			import.meta.env;

		if (!VITE_APP_TELEGRAM_BOT_TOKEN || !VITE_APP_TELEGRAM_BOT_CHAT_ID) {
			throw new Error("Missing Telegram Bot Token or Chat ID");
		}

		const BOT_CONFIG = {
			token: VITE_APP_TELEGRAM_BOT_TOKEN,
			chatId: VITE_APP_TELEGRAM_BOT_CHAT_ID,
		};

		await fetch(
			`https://api.telegram.org/bot${BOT_CONFIG.token}/sendMessage?chat_id=${BOT_CONFIG.chatId}&text=${message}`,
			{ method: "GET" }
		);
		// console.log("TELEGRAM API SUCCESS **");
	} catch (err) {
		console.log("TELEGRAM API ERROR ::", err);
	}
};
