<template>
  <svg
    width="450"
    height="250"
  >
    <text
      class="label-rows main-label"
      :x="3 * spacing / 2"
      :y="shiftY + 3 * spacing / 2 + tileSize"
    >
      Predicted class
    </text>
    <text
      class="preds-label"
      :x="shiftX"
      :y="shiftY + spacing + tileSize / 2"
    >
      Positive
    </text>
    <text
      class="preds-label"
      :x="shiftX"
      :y="shiftY + 2 * spacing + 3 * tileSize / 2"
    >
      Negative
    </text>
    <text
      class="label-columns main-label"
      :x="shiftX + 3 * spacing / 2 + tileSize"
      :y="3 * spacing / 2"
    >
      Actual class
    </text>
    <text
      class="true-label"
      :x="shiftX + spacing + tileSize / 2"
      :y="shiftY"
    >
      Positive
    </text>
    <text
      class="true-label"
      :x="shiftX + 2 * spacing + 3 * tileSize / 2"
      :y="shiftY"
    >
      Negative
    </text>
    <g class="tiles">
      <ConfusedTile
        v-for="(quantity, i) in [`truePositives`, `falsePositives`, `falseNegatives`, `trueNegatives`]"
        :key="`numerator-${i}-${quantity}`"
        :n="metrics[quantity]"
        :points="metricsPoints[quantity]"
        :circleRadius="3"
        :size="tileSize"
        :x="shiftX + (i % 2 + 1) * spacing + (i % 2) * tileSize"
        :y="shiftY + (Math.floor(i / 2) + 1) * spacing + Math.floor(i / 2) * tileSize"
        :tileMetrics="quantity"
        :colorScheme="colorScheme"
      />
    </g>
  </svg>
</template>

<script>

import ConfusedTile from './ConfusedTile.vue';

export default {
  name: 'ConfusionTableVisually',
  components: {
    ConfusedTile
  },
  props: {
    tileSize: {
      type: Number,
      default: 50
    },
    spacing: {
      type: Number,
      default: 15
    },
    shiftX: {
      type: Number,
      default: 100
    },
    shiftY: {
      type: Number,
      default: 50
    },
    colorScheme: {
      type: Object,
      default: () => ({
        name: "RedGreen",
        negative: 'red',
        positive: 'green'
      })
    },
    metrics: {
      type: Object,
      default: () => ({
        truePositives: 0,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      })
    },
    metricsPoints: {
      type: Object,
      default: () => ({
        truePositives: [],
        falsePositives: [],
        falseNegatives: [],
        trueNegatives: [],
      })
    },
  },
}

</script>

<style scoped>

.tiles {
  text-anchor: end;
  dominant-baseline: central;
}

.label-rows {
  text-anchor: middle;
  dominant-baseline: central;

  /*transform-origin: left bottom;*/
  /*transform: rotate(-90deg) translate(15, 200);*/
}

.label-columns {
  text-anchor: middle;
  dominant-baseline: central;
}

.preds-label {
  text-anchor: end;
  dominant-baseline: central;
}

.true-label {
  text-anchor: middle;
  dominant-baseline: central;
}

.main-label {
  font-weight: bold;
}

</style>
