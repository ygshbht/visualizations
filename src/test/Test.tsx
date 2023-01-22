import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Test() {
	useEffect(() => {
		d3.select("#test")
			.transition()
			.duration(1000)
			
	}, []);
	return (
		<div
			style={{ width: "150px", height: "150px", backgroundColor: "red" }}
			id="test"
		>
			Test
		</div>
	);
}
