<template>
  <g>
    <rect
      class="tile"
      :width="size"
      :height="size"
      :x="x"
      :y="y"
      :style="{fill: colorScheme[colorTile]}"
    />
    <circle
      v-for="(d, i) in pointsToShow"
      :key="i"
      class="point"
      :cx="x + scale(d.x)"
      :cy="y + scale(d.y)"
      :r="circleRadius"
      :style="{fill: colorScheme[colorPoint]}"
    />
  </g>
</template>

<script>

import {scaleLinear} from "d3-scale";

export default {
  name: 'ConfusionTable',
  props: {
    points: {
      type: Array,  // ([{x: 0, y: 0}, ...])
      default: () => ([])
    },
    n: {
      type: Number,
      default: 3
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    contraction: {
      type: Number,
      default: 0.9,
    },
    circleRadius: {
      type: Number,
      default: 4,
    },
    tileMetrics: {
      type: String,
      default: "truePositives"
    },
    colorScheme: {
      type: Object,
      default: () => ({
        name: "RedGreen",
        negative: 'red',
        positive: 'green'
      })
    }
  },
  data: function() {
    return {
      scale: scaleLinear()
        .domain([-1/this.contraction, 1/this.contraction])
        .range([0, this.size])
    };
  },
  computed: {
    colorTile: function() {
      return {
        truePositives: "positive",
        falsePositives: "positive",
        falseNegatives: "negative",
        trueNegatives: "negative",
      }[this.tileMetrics];
    },
    colorPoint: function() {
      return {
        truePositives: "positive",
        falsePositives: "negative",
        falseNegatives: "positive",
        trueNegatives: "negative",
      }[this.tileMetrics];
    },
    pointsToShow: function() {
      if (this.points.length > 0) {
        return this.points;
      } else {
        // maybe also some semi-deterministic way?
        return [...Array(this.n).keys()]  // range(n)
        .map(() => ({
          x: 2 * Math.random() - 1,
          y: 2 * Math.random() - 1,
        }))
      }
    }
  },

}

</script>

<style scoped>

.tile {
  cursor: pointer;
  opacity: 0.15;
}

.point {
  stroke: white;
  stroke-width: 1;
  stroke-opacity: 0.8;
}

</style>
