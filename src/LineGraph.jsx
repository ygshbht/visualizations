import React, { useEffect } from "react";
import * as d3Module from "d3";
import d3tip from "d3-tip";

const d3 = {
  ...d3Module,
  tip: d3tip,
};

const tip = d3
  .tip()
  .attr("class", "d3-tip")
  .html((d) => {
    // console.log(d);
    return d.target.__data__.name;
  });

const MARGIN = {
  LEFT: 100,
  RIGHT: 10,
  TOP: 10,
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
];
buildingData.forEach((data) => (data.height = Number(data.height)));

export default function LineGraph() {
  useEffect(() => {
    const max = d3.max(buildingData, (d) => d.height);
    const yScale = d3.scaleLinear().domain([0, max]).range([0, HEIGHT]);
    const xScale = d3
      .scaleBand()
      .domain(buildingData.map((b) => b.name))
      .range([0, WIDTH])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const color = d3
      .scaleOrdinal()
      .domain(buildingData.map((d) => d.name))
      .range(d3.schemeCategory10);

    const svg = d3
      .select("#line-graph")
      .append("svg")
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT);

    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    g.call(tip);

    const xAxisCall = d3.axisBottom(xScale);
    const yAxisCall = d3
      .axisLeft(yScale)
      .ticks(3)
      .tickFormat((d) => d + "m");

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)");

    g.append("g").attr("class", "y axis").call(yAxisCall);

    const line = d3
      .line()
      .x((d) => xScale(d.name) + xScale.bandwidth() / 2)
      .y((d) => HEIGHT - yScale(d.height));
    // console.log(xScale.bandwidth()/2);
    g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", "3px")
      .attr("d", line(buildingData));

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

    //Legend
    // const legend = svg
    //   .append("g")
    //   .attr(
    //     "transform",
    //     `translate(${WIDTH + MARGIN.LEFT + MARGIN.RIGHT - 30}, ${HEIGHT - 90})`
    //   );
    // buildingData.forEach((building, i) => {
    //   const legendRow = legend
    //     .append("g")
    //     .attr("transform", `translate(0, ${i * 20})`);

    //   legendRow
    //     .append("rect")
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .attr("fill", color(building.name));

    //   legendRow
    //     .append("text")
    //     .attr("x", -10)
    //     .attr("y", 10)
    //     .attr("text-anchor", "end")
    //     .style("text-transform", "capitalize")
    //     .attr("font-size", "10")
    //     .text(building.name)
    //     .style("fill", color(building.name));
    // });
  });

  return (
    <div
      style={{
        backgroundColor: "lightyellow",
        height: "400px",
        width: "600px",
        margin: "100px auto",
      }}
      id="line-graph"
    ></div>
  );
}
