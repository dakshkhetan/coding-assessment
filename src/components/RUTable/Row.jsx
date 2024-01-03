/* eslint-disable react/prop-types */

import { useState } from "react";

import { RU_TABLE_CONSTANTS, COLOR_MAP } from "@/constants";

const Row = ({
	index,
	elementX,
	elementY,
	isGridCol = false,
	activeUnmaskProduct,
	setActiveUnmaskProduct,
}) => {
	const { GRID_SIZE } = RU_TABLE_CONSTANTS;

	const [isDiodeXActive, setIsDiodeXActive] = useState(false);
	const [isDiodeYActive, setIsDiodeYActive] = useState(false);

	const changeDiodeXBgColor = () => {
		setIsDiodeXActive((prev) => !prev);
	};

	const changeDiodeYBgColor = () => {
		setIsDiodeYActive((prev) => !prev);
	};

	const unmaskCellHandler = (e) => {
		const targetProduct = e.currentTarget.dataset.product;

		if (targetProduct === activeUnmaskProduct) {
			setActiveUnmaskProduct(null);
		} else {
			setActiveUnmaskProduct(targetProduct);
		}
	};

	return (
		<>
			<tr className={`row-${index + 1}`}>
				{isGridCol ? (
					<td
						className="cell-1 grid-name rotated"
						rowSpan={GRID_SIZE}
						colSpan={2}
						style={{
							backgroundColor:
								COLOR_MAP.TABLE.GRIDS_BG[elementX.grid],
						}}
					>
						<span>{elementX.grid}</span>
					</td>
				) : null}
				<td
					className={`cell-2 diode ${isDiodeXActive ? "active" : ""}`}
					colSpan={2}
					onClick={changeDiodeXBgColor}
				/>
				<td
					className={`cell-3 unmask ${
						elementX.product === activeUnmaskProduct ? "active" : ""
					}`}
					colSpan={2}
					onClick={unmaskCellHandler}
					data-product={elementX.product}
				/>
				<td className="cell-4 ru-num" colSpan={2}>
					{elementX.ru}
				</td>
				<td
					className="cell-5 product-name"
					colSpan={31}
					style={{
						backgroundColor: COLOR_MAP.PRODUCT_BG[elementX.product],
						color:
							COLOR_MAP.PRODUCT_TEXT[elementX.product] || "#000",
					}}
				>
					{elementX.product}
				</td>

				{/* Grid Separator Cell */}
				<td className="cell-6 grid-separator-cell" colSpan={2} />

				<td
					className="cell-7 product-name"
					colSpan={31}
					style={{
						backgroundColor: COLOR_MAP.PRODUCT_BG[elementY.product],
						color:
							COLOR_MAP.PRODUCT_TEXT[elementY.product] || "#000",
					}}
				>
					{elementY.product}
				</td>
				<td className="cell-8 ru-num" colSpan={2}>
					{elementY.ru}
				</td>
				<td
					className={`cell-9 unmask ${
						elementY.product === activeUnmaskProduct ? "active" : ""
					}`}
					colSpan={2}
					onClick={unmaskCellHandler}
					data-product={elementY.product}
				/>
				<td
					className={`cell-10 diode ${
						isDiodeYActive ? "active" : ""
					}`}
					colSpan={2}
					onClick={changeDiodeYBgColor}
				/>
				{isGridCol ? (
					<td
						className="cell-11 grid-name rotated"
						rowSpan={GRID_SIZE}
						colSpan={2}
						style={{
							backgroundColor:
								COLOR_MAP.TABLE.GRIDS_BG[elementY.grid],
						}}
					>
						<span>{elementY.grid}</span>
					</td>
				) : null}
			</tr>
		</>
	);
};

export default Row;
