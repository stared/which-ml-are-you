<template>
  <svg
    class="chart"
    :width="width + 50"
    :height="height + 50"
  >
    <g>
      <circle
        v-for="(d, i) in points"
        :key="i"
        class="point"
        :cx="xScale(d.x)"
        :cy="yScale(d.y)"
        :r="2"
        :style="{fill: color(d.v)}"
      />
    </g>
    <g>
      <rect
        v-for="(d, i) in tiles"
        :key="i"
        class="tile"
        :x="xScale(d.x)"
        :y="yScale(d.y)"
        :width="size"
        :height="size"
        :style="{fill: color(d.v), opacity: 0.3}"
        @mousedown="tileMouseDown()"
        @mouseover="tileMouseOver(d)"
        @mouseup="tileMouseUp"
      />
    </g>
    <g class="x-axis" />
    <g class="y-axis" />
  </svg>
</template>

<script>
import * as d3 from "d3";
// TODO: import only relevant parts of d3

export default {
  name: 'Chart',
  props: {
    points: Array,
    tiles: Array,
    width: Number,
    height: Number,
    size: {type: Number, default: 50},
    k: {type: Number, default: 10},
    axisPadding: {type: Number, default: 0}
  },
  data: function () {
    return {
      xScale: d3.scaleLinear()
        .domain([0, this.k])
        .range([0, this.k * this.size]),
      yScale: d3.scaleLinear()
        .domain([0, this.k])
        .range([0, this.k * this.size]),
      color: d3.scaleLinear()
        .domain([0, 0.5, 1.])
        .range(['red', 'white', 'green']),
      isDown: false,
    };
  },
  mounted() {
    d3.select(this.$el).select("g.x-axis")
      .attr("transform", `translate(0,${this.height - 2 * this.axisPadding})`)
      .call(d3.axisBottom(this.xScale));

    d3.select(this.$el).select("g.y-axis")
      .attr("transform", "translate(" + (this.width - 2 * this.axisPadding) + ",0)")
      .call(d3.axisRight(this.yScale));

  },
  methods: {
    tileMouseDown: function() {
      this.isDown = true;
    },
    tileMouseOver: function(d) {
      if (this.isDown) {
        d.v = 1;
      }
    },
    tileMouseUp: function() {
      this.isDown = false;
    },
  },

}

</script>

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

.tile {
  cursor: pointer;
}
</style>
