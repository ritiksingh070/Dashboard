import * as d3 from "d3";

export const createLineChart = (
  data,
  containerId,
  xField,
  yField,
  xLabel,
  yLabel
) => {
  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", 800)
    .attr("height", 400);

  const margin = { top: 20, right: 30, bottom: 50, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  const x = d3.scaleLinear().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d[xField]))
    .y((d) => y(d[yField]));

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  x.domain(d3.extent(data, (d) => d[xField]));
  y.domain(d3.extent(data, (d) => d[yField]));

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.bottom - 10)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text(xLabel);

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .text(yLabel);

  g.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "#ffab00")
    .attr("stroke-width", 2);

  // Tooltip
  const tooltip = d3
    .select(containerId)
    .append("div")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("padding", "5px 10px")
    .style("border", "1px solid #d4d4d4")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Hover interaction
  svg
    .append("rect")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mousemove", (event) => {
      const [xPos, yPos] = d3.pointer(event);
      const x0 = x.invert(xPos);
      const y0 = y.invert(yPos);
      const nearestData = data.reduce((a, b) =>
        Math.abs(b[xField] - x0) < Math.abs(a[xField] - x0) ? b : a
      );

      tooltip
        .style("opacity", 1)
        .html(
          `${xLabel}: ${nearestData[xField]}<br>${yLabel}: ${nearestData[yField]}`
        )
        .style("top", `${event.pageY - 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });
};

const createPieChart = (data, containerId, width, height, key) => {
  // Clear the previous content in the container
  d3.select(containerId).html("");

  // Filter out empty fields from the data
  const filteredData = data.filter((d) => d[key]);

  // Set up the SVG element
  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Process the data to get the count of each key
  const processedData = Array.from(
    d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d[key]
    ),
    ([key, value]) => ({ key, value })
  );

  // Set up the pie chart
  const pie = d3.pie().value((d) => d.value);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const arcs = pie(processedData);

  // Set up color scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add tooltip
  const tooltip = d3
    .select(containerId)
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "rgba(0, 0, 0, 0.7)")
    .style("color", "#fff")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("font-size", "12px");

  // Draw the pie chart
  svg
    .selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.key))
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .on("mouseover", function (event, d) {
      tooltip
        .style("visibility", "visible")
        .text(`${d.data.key}: ${d.data.value}`);
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", function (d) {
          const dist = 10;
          d.midAngle = (d.endAngle - d.startAngle) / 2 + d.startAngle;
          const x = Math.sin(d.midAngle) * dist;
          const y = -Math.cos(d.midAngle) * dist;
          return `translate(${x},${y})`;
        })
        .attr("stroke", "black")
        .attr("stroke-width", "3px");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.style("visibility", "hidden");
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", "translate(0,0)")
        .attr("stroke", "white")
        .attr("stroke-width", "2px");
    });
};

// Create pie charts for countries and regions
export const createCountryPieChart = (data, containerId, width, height) => {
  createPieChart(data, containerId, width, height, "country");
};

export const createRegionPieChart = (data, containerId, width, height) => {
  createPieChart(data, containerId, width, height, "region");
};

export const createGroupedBarChart = (
  data,
  containerId,
  xField,
  yField1,
  yField2,
  xLabel,
  yLabel
) => {
  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", 800)
    .attr("height", 400);

  const margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d[xField]))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => Math.max(d[yField1], d[yField2]))])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const color = d3
    .scaleOrdinal()
    .domain([yField1, yField2])
    .range(["steelblue", "orange"]);

  svg
    .selectAll("bar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d[xField]))
    .attr("y", (d) => y(d[yField1]))
    .attr("width", x.bandwidth() / 2)
    .attr("height", (d) => y(0) - y(d[yField1]))
    .attr("fill", color(yField1));

  svg
    .selectAll("bar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d[xField]) + x.bandwidth() / 2)
    .attr("y", (d) => y(d[yField2]))
    .attr("width", x.bandwidth() / 2)
    .attr("height", (d) => y(0) - y(d[yField2]))
    .attr("fill", color(yField2));

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .text(xLabel);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(yLabel);
};
