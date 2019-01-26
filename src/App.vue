<template>
  <div id="app">
    <h1>Draw classification</h1>

    <select v-model="dataset">
      <option
        v-for="option in options"
        :key="option.name"
        :value="option"
      >
        {{ option.name }}
      </option>
    </select>
    <span>Selected: {{ dataset.name }}</span>

    <h2>Draw here:</h2>

    <Chart
      :points="dataset.points"
      :tiles="tiles"
    />
    <p>Points: {{ dataset.points.length }}</p>
    <p>Tiles up: {{ tilesUp }}</p>
    <table>
      <tbody>
        <tr>
          <th style="background:white; border:none;" colspan="2" rowspan="2"></th>
          <th colspan="3" style="background:none;">Actual class</th>
        </tr>
        <tr>
          <th>Positive</th>
          <th>Negative</th>
        </tr>
        <tr>
          <th rowspan="3" style="height:6em;">
            <div style="display: inline-block; -ms-transform: rotate(-90deg); -webkit-transform: rotate(-90deg); transform: rotate(-90deg);;">Predicted<br /> class</div>
          </th>
          <th>Positive</th>
          <td>True Positives: {{ metrics.truePositives }}</td>
          <td>False Positives: {{ metrics.falsePositives }}</td>
        </tr>
        <tr>
          <th>Negative</th>
          <td>False Negatives: {{ metrics.falseNegatives }}</td>
          <td>True Negatives: {{ metrics.trueNegatives }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import {computeMetrics} from "./metrics";
import {tiles, tileSize, generatedDatasets, fixedDatasets} from './datasets.js'

export default {
  name: 'App',
  components: {
    Chart
  },
  data: function () {
    return {
      dataset: {name: "Empty", points: []},
      points: [],
      tiles: tiles,
      options: generatedDatasets,
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
      return computeMetrics(this.dataset.points, this.tiles, tileSize)
    }
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
