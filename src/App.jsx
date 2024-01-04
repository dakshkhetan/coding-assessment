import RUTable from "@/components/RUTable";

import useWebsiteVisitNotifier from "@/hooks/useWebsiteVisitNotifier";

import "@/styles/_global.scss";

const App = () => {
	useWebsiteVisitNotifier();

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
