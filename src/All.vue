<template>
  <div id="all">
    <h1>Draw classification</h1>

    <div>
      <span>Choose dataset:</span>
      <select v-model="dataset">
        <option
          v-for="option in options"
          :key="option.name"
          :value="option"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <Chart
      :points="dataset.points"
      :tiles="tiles"
      :width="500"
      :height="500"
      :colorScheme="selectedColorScheme"
    />

    <div>
      <span>Reset all to: </span>
      <button @click="resetSelection(0)">
        NO
      </button>
      <button @click="resetSelection(1)">
        YES
      </button>
      <button @click="resetSelectionRandom()">
        raNDoM
      </button>
    </div>
    <div v-if="datasetHasPredictions">
      <span>Classifier predicitions: </span>
      <button
        v-for="(classifier, i) in [`Nearest Neighbors`, `Linear SVM`, `RBF SVM`, `Gaussian Process`, `Decision Tree`, `Random Forest`, `Neural Net`, `AdaBoost`, `Naive Bayes`, `QDA`]"
        :key="`${i}-${classifier}`"
        @click="resetSelectionByClassifier(classifier)"
      >
        {{ classifier }}
      </button>
    </div>

    <div>
      <span>Choose color theme:</span>
      <select v-model="selectedColorScheme">
        <option
          v-for="colorScheme in colorSchemes"
          :key="colorScheme.name"
          :value="colorScheme"
        >
          {{ colorScheme.name }}
        </option>
      </select>
    </div>

    <QuantityVisually
      v-for="formula in confusionMatrixMetrics"
      :key="`qv-${formula.name}`"
      :formula="formula"
      :metrics="metrics"
      :metricsPoints="metricsPoints"
      :colorScheme="selectedColorScheme"
    />

    <ConfusionTable :metrics="metrics"/>
    <ConfusionTableVisually
      :metrics="metrics"
      :metricsPoints="metricsPoints"
      :colorScheme="selectedColorScheme"
    />
  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import ConfusionTable from './components/ConfusionTable.vue'
import ConfusionTableVisually from './components/ConfusionTableVisually.vue'
import QuantityVisually from './components/QuantityVisually.vue'
import {computeMetrics, confusionMatrixMetrics, splitByMetrics} from './metrics.js';
import {tiles, allDatasets} from './datasets.js'
import {datasetHasPredictions, getPredictions} from './predictions.js'

export default {
  name: 'All',
  components: {
    Chart,
    ConfusionTable,
    QuantityVisually,
    ConfusionTableVisually
  },
  data: function () {
    return {
      dataset: allDatasets[0],
      points: [],
      tiles: tiles,
      options: allDatasets,
      colorSchemes: [
        {name: "RedGreen", negative: 'red', positive: 'green'},
        {name: "RedGreenWiki", negative: "#F3796F", positive: "#9DDB73"},
        {name: "TensorFlow", negative:  'rgb(245, 147, 34)', positive: 'rgb(8, 119, 189)'},
        {name: "sklearn", negative:  'rgb(255, 0, 0)', positive: 'rgb(0, 0, 255)'},
      ],
      selectedColorScheme: {name: "RedGreen", negative: 'red', positive: 'green'},
      confusionMatrixMetrics: confusionMatrixMetrics
    };
  },
  computed: {
    tilesUp: function() {
      let counter = 0;
      this.tiles.forEach(
        (d) => counter += d.v
      );
      return counter;
    },
    metrics: function() {
      return computeMetrics(this.dataset.points, this.tiles)
    },
    metricsPoints: function() {
      return splitByMetrics(this.dataset.points, this.tiles)
    },
    datasetHasPredictions: function() {
      return datasetHasPredictions(this.dataset.name);
    },
  },
  methods: {
    resetSelection: function(targetValue) {
      this.tiles.forEach((d) => d.v = targetValue);
    },
    resetSelectionRandom: function() {
      this.tiles.forEach((d) => d.v = +(Math.random() > 0.5));
    },
    resetSelectionByClassifier: function(classifierName) {
      getPredictions(this.tiles, this.dataset.name, classifierName);
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
