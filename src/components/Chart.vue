<template>
  <svg class="chart">

  </svg>
</template>

<script>
import * as d3 from "d3";
// TODO: import only relevant parts of d3

export default {
  name: 'Chart',
  props: {
    msg: String,
    points: Array,
    tiles: Array,
  },
  mounted() {

    const size = 50;
    const k = 10;
    const n = 50;

    const width = k * size;
    const height = k * size;

    const svg = d3.select(this.$el)
      .attr("width", width + 50)
      .attr("height", width + 50);

    const xScale = d3.scaleLinear()
      .domain([0, k])
      .range([0, k * size]);

    const yScale = d3.scaleLinear()
      .domain([0, k])
      .range([0, k * size]);

    const color = d3.scaleLinear()
      .domain([0, 0.5, 1.])
      .range(['red', 'white', 'green']);

      if (true) {

        const padding = 0;

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height - 2 * padding})`)
          .call(d3.axisBottom(xScale));

        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + (width - 2 * padding) + ",0)")
          .call(d3.axisRight(yScale));
      }

    svg.append("g")
      .selectAll(".point")
      .data(this.points)
      .enter().append("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 2)
        .style("fill", d => color(d.v));

    const tileG = svg.append("g");

    const recolor = () => {
      tileG
        .selectAll(".tile")
        .data(this.tiles)
        .style("fill", d => color(d.v));
    }

    let isDown = false;

    tileG
      .selectAll(".tile")
      .data(this.tiles)
      .enter().append("rect")
        .attr("class", "tile")
        .attr("x", d => xScale(d.x))
        .attr("y", d => yScale(d.y))
        .attr("width", size)
        .attr("height", size)
        .style("fill", d => color(d.v))
        .style("opacity", 0.3)
        .on("mousedown", () => isDown = true)
        .on("mouseover", (d) => {
         if (isDown) {
           d.v = 1;
           recolor();
         }
        })
       .on("mouseup", () => isDown = false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
