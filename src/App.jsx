import RUTable from "@/components/RUTable";

import "@/styles/_global.scss";

const App = () => {
	return (
		<>
			<div className="app">
				<h1 className="text-center">Floor Plan (RU Table)</h1>
				<RUTable />
			</div>
		</>
	);
};

export default App;
