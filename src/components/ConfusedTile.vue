<template>
  <g>
    <rect
      class="tile"
      :width="size"
      :height="size"
      :x="x"
      :y="y"
      :style="{fill: colorTile, opacity: 0.15}"
    />
    <circle
      v-for="(d, i) in points"
      :key="i"
      class="point"
      :cx="x + size * marginRelative + size * (1 - 2 * marginRelative) * d.dx"
      :cy="y + size * marginRelative + size * (1 - 2 * marginRelative) * d.dy"
      :r="circleRadius"
      :style="{fill: colorPoint}"
    />
  </g>
</template>

<script>

export default {
  name: 'ConfusionTable',
  props: {
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
    marginRelative: {
      type: Number,
      default: 0.1,
    },
    circleRadius: {
      type: Number,
      default: 4,
    },
    colorTile: {
      type: String,
      default: "red"
    },
    colorPoint: {
      type: String,
      default: "blue"
    }
  },
  computed: {
    points: function() {
      return [...Array(this.n).keys()]  // range(n)
        .map(() => ({
          dx: Math.random(),
          dy: Math.random(),
        }))
    }
  },

}

</script>

<style scoped>

.tile {
  cursor: pointer;
}

.point {
  stroke: white;
  stroke-width: 1;
  stroke-opacity: 0.8;
}

</style>
