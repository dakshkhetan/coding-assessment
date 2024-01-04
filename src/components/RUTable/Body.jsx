import useRUTablePopulateRows from "@/hooks/useRUTablePopulateRows";
import { RU_TABLE_CONSTANTS } from "@/constants";

const Body = () => {
	const { grid1And2DataRows, grid3And4DataRows, error } =
		useRUTablePopulateRows();
	const { MIDHALF_TEXT, MISC_BLOCK_TEXT } = RU_TABLE_CONSTANTS;

	if (error) return <h1>Error in provided data</h1>;

	return (
		<>
			<tbody>
				{grid1And2DataRows}

				<tr className="row-separator">
					<td className="cell-1" colSpan={80}>
						{MIDHALF_TEXT}
					</td>
				</tr>

				{grid3And4DataRows}

				<tr className="row-misc-block">
					<td className="cell-1" colSpan={4} />
					<td className="cell-2" colSpan={72}>
						{MISC_BLOCK_TEXT}
					</td>
					<td className="cell-3" colSpan={4} />
				</tr>
			</tbody>
		</>
	);
};

export default Body;
