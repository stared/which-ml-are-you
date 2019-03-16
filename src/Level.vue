<template>
  <div id="level">
    <h1>Level {{ id }}</h1>

    <ul class="menu">
      <li><router-link :to="'/lvl/' + Math.max(1, lvlId - 1)">Previous</router-link></li>
      <li><router-link :to="'/lvl/' + Math.min(levelsLength, lvlId + 1)">Next</router-link></li>
    </ul>

    <h2>Draw classification</h2>

    <p>({{ mode }} mode)<p>

    <Chart
      :points="level[this.mode].points"
      :tiles="tiles"
      :width="500"
      :height="500"
      :colorScheme="selectedColorScheme"
      :editable="mode == 'train'"
    />

    <div>
      <button @click="resetSelection(0)">
        set all to: NO
      </button>
      <button @click="resetSelection(1)">
        set all to: YES
      </button>
      <button @click="resetSelectionRandom()">
        set all to: raNDoM
      </button>
    </div>

    <div>
      <button
        v-for="(classifier, i) in [`Nearest Neighbors`, `Linear SVM`, `RBF SVM`, `Gaussian Process`, `Decision Tree`, `Random Forest`, `Neural Net`, `AdaBoost`, `Naive Bayes`, `QDA`]"
        :key="`${i}-${classifier}`"
        @click="resetSelectionByClassifier(classifier)"
      >
        set all to: {{ classifier }}
      </button>
    </div>

    <div>
      <button @click="setMode('validation')">
        Validate!
      </button>
    </div>

    <ConfusionTableVisually
      :metrics="metrics"
      :metricsPoints="metricsPoints"
      :colorScheme="selectedColorScheme"
    />

    <ConfusionTableVisually
      v-if="mode == 'validation'"
      :metrics="metricsVal"
      :metricsPoints="metricsPointsVal"
      :colorScheme="selectedColorScheme"
    />

  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import ConfusionTableVisually from './components/ConfusionTableVisually.vue'
import {computeMetrics, splitByMetrics} from './metrics.js';
import {tiles} from './datasets.js'
import {levels} from './levels.js'
import {getPredictions} from './predictions.js';


export default {
  name: 'Level',
  components: {
    Chart,
    ConfusionTableVisually
  },
  props: {
    id: {type: String, required: true},
  },
  data: function () {
    return {
      // level: levels[parseInt(this.id)],
      mode: 'train',
      levelsLength: levels.length,
      tiles: tiles,
      colorSchemes: [
        {name: "RedGreen", negative: 'red', positive: 'green'},
        {name: "RedGreenWiki", negative: "#F3796F", positive: "#9DDB73"},
        {name: "TensorFlow", negative:  'rgb(245, 147, 34)', positive: 'rgb(8, 119, 189)'},
        {name: "sklearn", negative:  'rgb(255, 0, 0)', positive: 'rgb(0, 0, 255)'},
      ],
      selectedColorScheme: {name: "RedGreen", negative: 'red', positive: 'green'},
    };
  },
  computed: {
    level: function() {
      return levels[parseInt(this.id) - 1];
    },
    lvlId: function() {
      return parseInt(this.id);
    },
    metrics: function() {
      return computeMetrics(this.level['train'].points, this.tiles)
    },
    metricsPoints: function() {
      return splitByMetrics(this.level['train'].points, this.tiles)
    },
    metricsVal: function() {
      return computeMetrics(this.level['validation'].points, this.tiles)
    },
    metricsPointsVal: function() {
      return splitByMetrics(this.level['validation'].points, this.tiles)
    },
  },
  watch: {
    id: function() {
      this.mode = 'train';
      this.resetSelection(0);
    }
  },
  methods: {
    resetSelection: function(targetValue) {
      this.tiles.forEach((d) => d.v = targetValue);
    },
    resetSelectionRandom: function() {
      this.tiles.forEach((d) => d.v = +(Math.random() > 0.5));
    },
    resetSelectionByClassifier: function(classifierName) {
      getPredictions(this.tiles, this.level.train.name, classifierName);
    },
    setMode: function(mode) {
      this.mode = mode;
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
