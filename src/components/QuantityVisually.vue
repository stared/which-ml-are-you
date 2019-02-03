<template>
  <svg width="300" height="200">
    <text
      class="metrics-name"
      :x="80"
      :y="tileSize + 20">
      Precision =
    </text>
    <ConfusedTile
      :n="metrics.truePositives"
      :circleRadius="3"
      :size="tileSize"
      :x="90 + tileSize/2"
      :y="10"
      :colorTile="colorScheme.positive"
      :colorPoint="colorScheme.positive"
    />
    <line
      class="division-line"
      :x1="90"
      :y1="tileSize + 20"
      :x2="90 + 2 * tileSize"
      :y2="tileSize + 20"
    />
    <ConfusedTile
      :n="metrics.truePositives"
      :circleRadius="3"
      :size="tileSize"
      :x="90"
      :y="tileSize + 30"
      :colorTile="colorScheme.positive"
      :colorPoint="colorScheme.positive"
    />
    <ConfusedTile
      :n="metrics.falsePositives"
      :circleRadius="3"
      :size="tileSize"
      :x="90 + tileSize"
      :y="tileSize + 30"
      :colorTile="colorScheme.positive"
      :colorPoint="colorScheme.negative"
    />
    <text
      class="value-label"
      :x="100 + 2 * tileSize"
      :y="tileSize + 20">
      = {{ valuePercent }}%
    </text>
  </svg>
</template>

<script>

import ConfusedTile from './ConfusedTile.vue';

export default {
  name: 'QuantityVisually',
  components: {
    ConfusedTile
  },
  props: {
    tileSize: {
      type: Number,
      default: 50
    },
    colorScheme: Object,
    metrics: {
      type: Object,
      default: () => ({
        truePositives: 0,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      })
    }
  },
  computed: {
    valuePercent: function() {
      const m = this.metrics;
      const v = m.truePositives / (m.truePositives + m.falsePositives);
      return (100 * v).toFixed(1);
    }
  },

}

</script>

<style scoped>

.metrics-name {
  text-anchor: end;
  dominant-baseline: central;
}

.value-label {
  text-anchor: start;
  dominant-baseline: central;
}

.division-line {
  stroke: black;
  stroke-width: 2px;
}

</style>
