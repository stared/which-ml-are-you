<template>
  <div class="hello">

  </div>
</template>

<script>
import * as d3 from "d3";

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {

    const size = 50;
    const k = 10;
    const n = 50;

    const width = k * size;
    const height = k * size;

    const svg = d3.select(this.$el)
      .append("svg")
      .attr("width", width + 50)
      .attr("height", width + 50);

    const tiles = range(k * k)
      .map((i) => {
        return {
          x: i % k,
          y: Math.floor(i / k),
          v: 0 // Math.random()
        };
      });

     const points = range(n)
      .map((i) => {
        const x = Math.random();
        const y = Math.random();

        return {
          x: k * x,
          y: k * y,
          v: y < Math.sin(4 * x)
        };
      })

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
      .data(points)
      .enter().append("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 2)
        .style("fill", d => color(d.v));

    const tileG = svg.append("g");

    const recolor = function() {
      tileG
        .selectAll(".tile")
        .data(tiles)
        .style("fill", d => color(d.v));
    }

    let isDown = false;

    tileG
      .selectAll(".tile")
      .data(tiles)
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
