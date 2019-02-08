<template>
  <svg width="450" height="150">
    <text
      class="metrics-name"
      :x="shiftX"
      :y="tileSize + 2 * spacing">
      {{ formula.name }} =
    </text>
    <g class="numerator">
      <ConfusedTile
        v-for="(quantity, i) in formula.numerator"
        :key="`numerator-${i}-${quantity}`"
        :n="metrics[quantity]"
        :circleRadius="3"
        :size="tileSize"
        :x="shiftX + spacing + (i + (maxLength - formula.numerator.length)/2) * tileSize"
        :y="spacing"
        :tileMetrics="quantity"
        :colorScheme="colorScheme"
      />
    </g>
    <line
      class="division-line"
      :x1="shiftX + spacing"
      :y1="tileSize + 2 * spacing"
      :x2="shiftX + spacing + maxLength * tileSize"
      :y2="tileSize + 2 * spacing"
    />
    <g class="denominator">
      <ConfusedTile
        v-for="(quantity, i) in formula.denominator"
        :key="`denominator-${i}-${quantity}`"
        :n="metrics[quantity]"
        :circleRadius="3"
        :size="tileSize"
        :x="shiftX + spacing + (i + (maxLength - formula.denominator.length)/2) * tileSize"
        :y="tileSize + 3 * spacing"
        :tileMetrics="quantity"
        :colorScheme="colorScheme"
      />
    </g>
    <text
      class="value-label"
      :x="shiftX + 2 * spacing + maxLength * tileSize"
      :y="tileSize + 2 * spacing">
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
    formula: {
      type: Object,
      default: () => ({
        name: "Precision",
        numerator: ["truePositives"],
        denominator: ["truePositives", "falsePositives"],
      })
    },
    tileSize: {
      type: Number,
      default: 50
    },
    spacing: {
      type: Number,
      default: 10
    },
    shiftX: {
      type: Number,
      default: 100
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
    maxLength: function() {
      return Math.max(
        this.formula.numerator.length,
        this.formula.denominator.length
      );
    },
    valuePercent: function() {
      const m = this.metrics;

      const x = this.formula.numerator
        .map((quantity) => m[quantity])
        .reduce((a, b) => a + b, 0);

      const y = this.formula.denominator
        .map((quantity) => m[quantity])
        .reduce((a, b) => a + b, 0);

      return (100 * x / y).toFixed(1);
    },
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
