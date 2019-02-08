<template>
  <svg
    class="chart"
    :width="width + 2 * margin"
    :height="height + 2 * margin"
  >
    <g>
      <circle
        v-for="(d, i) in points"
        :key="i"
        class="point"
        :cx="xScale(d.x)"
        :cy="yScale(d.y)"
        :r="4"
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
        :width="sizeX"
        :height="sizeY"
        :style="{fill: color(d.v)}"
        @mousedown="tileMouseDown(d)"
        @mouseover="tileMouseOver(d)"
        @mouseup="tileMouseUp()"
      />
    </g>
    <g class="x-axis" />
    <g class="y-axis" />
  </svg>
</template>

<script>
import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";
import {axisBottom, axisRight} from "d3-axis";
const d3 = { select, scaleLinear, axisBottom, axisRight };

export default {
  name: 'Chart',
  props: {
    points: {type: Array, default: () => ([])},
    tiles: {type: Array, default: () => ([{
      x: -1,
      y: -1,
      dx: 2,
      dy: 2,
      v: 0
    }])},
    width: {type: Number, default: 500},
    height: {type: Number, default: 500},
    margin: {type: Number, default: 50},
    colorNegative: {type: String, default: "red"},
    colorPositive: {type: String, default: "green"},
  },
  data: function () {
    return {
      isDown: false,
      brushValue: 1,
      xScale: d3.scaleLinear()
                .domain([-1, 1])
                .range([this.margin, this.margin + this.width]),
      yScale: d3.scaleLinear()
                .domain([-1, 1])
                .range([this.margin, this.margin + this.height])

    };
  },
  computed: {
    sizeX: function() {
      return this.xScale(this.tiles[0].dx) - this.xScale(0);
    },
    sizeY: function() {
      return this.yScale(this.tiles[0].dy) - this.yScale(0);
    },
    color: function() {
      return d3.scaleLinear()
        .domain([0, 0.5, 1.])
        .range([this.colorNegative, 'white', this.colorPositive]);
    },
  },
  mounted() {
    d3.select(this.$el).select("g.x-axis")
      .attr("transform", `translate(0,${this.margin + this.height})`)
      .call(d3.axisBottom(this.xScale));

    d3.select(this.$el).select("g.y-axis")
      .attr("transform", `translate(${this.margin + this.width},0)`)
      .call(d3.axisRight(this.yScale));

  },
  methods: {
    tileMouseDown: function(d) {
      this.isDown = true;
      this.brushValue = 1 - d.v;
      d.v = this.brushValue;
    },
    tileMouseOver: function(d) {
      if (this.isDown) {
        d.v = this.brushValue;
      }
    },
    tileMouseUp: function() {
      this.isDown = false;
    },
  },

}

</script>

<style scoped>

.tile {
  cursor: pointer;
  opacity: 0.15;
}

.tile:hover {
  opacity: 0.1;
}

.point {
  stroke: white;
  stroke-width: 1;
  stroke-opacity: 0.8;
}

</style>
