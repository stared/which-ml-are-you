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
      <button @click="setMode('validation')">
        Validate!
      </button>
    </div>

    <div class="row">
      <div class="column">
        <h3>Train results</h3>
        <ConfusionTableVisually
          :metrics="metrics"
          :metricsPoints="metricsPoints"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Accuracy')[0]"
          :metrics="metrics"
          :metricsPoints="metricsPoints"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Precision')[0]"
          :metrics="metrics"
          :metricsPoints="metricsPoints"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Recall')[0]"
          :metrics="metrics"
          :metricsPoints="metricsPoints"
          :colorScheme="selectedColorScheme"
        />
      </div>
      <div class="column" v-if="mode == 'validation'">
        <h3>Validation results</h3>
        <ConfusionTableVisually
          :metrics="metricsVal"
          :metricsPoints="metricsPointsVal"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Accuracy')[0]"
          :metrics="metricsVal"
          :metricsPoints="metricsPointsVal"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Precision')[0]"
          :metrics="metricsVal"
          :metricsPoints="metricsPointsVal"
          :colorScheme="selectedColorScheme"
        />
        <QuantityVisually
          :formula="confusionMatrixMetrics.filter((d) => d.name == 'Recall')[0]"
          :metrics="metricsVal"
          :metricsPoints="metricsPointsVal"
          :colorScheme="selectedColorScheme"
        />
      </div>
    </div>




  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import ConfusionTableVisually from './components/ConfusionTableVisually.vue'
import QuantityVisually from './components/QuantityVisually.vue'
import {computeMetrics, splitByMetrics, confusionMatrixMetrics} from './metrics.js';
import {tiles} from './datasets.js'
import {levels} from './levels.js'
import {getPredictions, datasetHasPredictions} from './predictions.js';


export default {
  name: 'Level',
  components: {
    Chart,
    ConfusionTableVisually,
    QuantityVisually
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
      confusionMatrixMetrics: confusionMatrixMetrics,
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
    datasetHasPredictions: function() {
      return datasetHasPredictions(this.level.name);
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

.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
