import React, { useEffect } from "react";
import * as d3 from "d3";
import countriesJSON from "./countries.json";
import * as topojson from "topojson-client";
// console.log(countries);
export default function WorldMap() {
  useEffect(() => {
    const width = 900;
    const height = 600;
    const svg = d3
      .select("#world-map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoMercator()
      .scale(140)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);
    const g = svg.append("g");

    const countries = topojson.feature(
      countriesJSON,
      countriesJSON.objects.countries
    );
    g.selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path);
  });
  return <div id="world-map"></div>;
}
