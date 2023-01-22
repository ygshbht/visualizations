import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import ScatterPlot from "./ScatterPlot";
import Test from "./test/Test";
// import Svg from "./Svg";

import WorldMap from "./WorldMap/WorldMap";
function App() {
	return (
		<div className="App">
			{/* <BarGraph />
			<ScatterPlot />

			<LineGraph />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "50px auto",
				}}
			>
				<WorldMap />
			</div> */}
			<Test />
		</div>
	);
}

export default App;
