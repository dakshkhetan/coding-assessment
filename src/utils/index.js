// check data validity by checking if total product count is 80
export const checkDataValidity = (data) => {
	let sum = 0;

	data.forEach(({ repeat }) => {
		sum += repeat;
	});

	return sum === 80;
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
	const BOT_CONFIG = {
		token: "5600989116:AAHKKeN2XrDoYN33pkwYuekp2t9GzqBFXWc",
		chatId: "-814581546",
	};

	try {
		await fetch(
			`https://api.telegram.org/bot${BOT_CONFIG.token}/sendMessage?chat_id=${BOT_CONFIG.chatId}&text=${message}`,
			{ method: "GET" }
		);
		// console.log("** TELEGRAM API SUCCESS **");
	} catch (err) {
		console.log("** TELEGRAM API ERROR ::", err);
	}
};
