import React, { useEffect } from "react";
import * as d3 from "d3";

const MARGIN = {
  LEFT: 100,
  RIGHT: 10,
  TOP: 50,
  BOTTOM: 130,
};
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const buildingData = [
  { name: "Burj Khalifa", height: "828" },
  { name: "Shanghai Tower", height: "623" },
  { name: "Abraj Al-Bait Clock Tower", height: "601" },
  { name: "Ping An Finance Centre", height: "599" },
  { name: "Lotte World Tower", height: "544.5" },
  { name: "Burj Khalifaa", height: "828" },
  { name: "Shanghai Towera", height: "623" },
  { name: "Abraj Al-Bait Clock Towera", height: "601" },
  { name: "Ping An Finance Centrea", height: "599" },
  { name: "Lotte World Towera", height: "544.5" },
];
buildingData.forEach((data) => (data.height = Number(data.height)));

export default function ScatterPlot() {
  useEffect(() => {
    const max = d3.max(buildingData, (d) => d.height);
    const yScale = d3.scaleLinear().domain([0, max]).range([HEIGHT, 0]);
    const xScale = d3
      .scaleBand()
      .domain(buildingData.map((b) => b.name))
      .range([0, WIDTH])
      .paddingInner(0.2)
      .paddingOuter(0.2);
    const svg = d3
      .select("#scatter-area")
      .append("svg")
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT);

    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    const xAxisCall = d3.axisBottom(xScale);
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)");

    const yAxisCall = d3
      .axisLeft(yScale)
      .ticks(3)
      .tickFormat((d) => d + "m");

    g.append("g")

      .attr("class", "y axis")
      .call(yAxisCall);

    const rects = g.selectAll("rect").data(buildingData);
    rects
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(d.height))
      .attr("cx", (d, i) => xScale(d.name))
      .attr("r", 5);
    // .attr("color", "blue")
    // .attr("background-color", "blue");

    //X Label
    g.append("text")
      .attr("class", "x axis-label")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 110)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("The world's tallest buildings");

    // Y Label
    g.append("text")
      .attr("class", "y axis-label")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Height (m)");
  });

  return (
    <div
      style={{
        backgroundColor: "pink",
        height: "400px",
        width: "600px",
        margin: "100px auto",
      }}
      id="scatter-area"
    ></div>
  );
}
