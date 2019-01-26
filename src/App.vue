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
      :width="500"
      :height="500"
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
          <td>True Positives: {{ truePositives }}</td>
          <td>False Positives: {{ falsePositives }}</td>
        </tr>
        <tr>
          <th>Negative</th>
          <td>False Negatives: {{ falseNegatives }}</td>
          <td>True Negatives: {{ trueNegatives }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import {computeTruePositives, computeFalsePositives, computeTrueNegatives, computeFalseNegatives} from "./metrics";

const k = 10;
const n = 50;

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

const tileSize = 1;

const tiles = range(k * k)
  .map((i) => {
    return {
      x: i % k,
      y: Math.floor(i / k),
      v: 0 // Math.random()
    };
  });

const points = range(n)
  .map(() => {
    const x = Math.random();
    const y = Math.random();

    return {
      x: k * x,
      y: k * y,
      v: +(y < Math.sin(4 * x))
    };
  });

const circle = range(n)
  .map(() => {
    const x = Math.random();
    const y = Math.random();

    return {
      x: k * x,
      y: k * y,
      v: +(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2) < 0.1)
    };
  });

export default {
  name: 'App',
  components: {
    Chart
  },
  data: function () {
    return {
      dataset: {name: "Sinish", points: points},
      points: points,
      tiles: tiles,
      options: [
        {name: "Sinish", points: points},
        {name: "Circle", points: circle},
        {name: "Empty", points: []},
      ],
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
    truePositives: function() {
        return computeTruePositives(this.dataset.points, this.tiles, tileSize);
    },
    falsePositives: function() {
        return computeFalsePositives(this.dataset.points, this.tiles, tileSize);
    },
    trueNegatives: function() {
        return computeTrueNegatives(this.dataset.points, this.tiles, tileSize);
    },
    falseNegatives: function() {
        return computeFalseNegatives(this.dataset.points, this.tiles, tileSize);
    }
  },
  methods: {
    resetSelection: function(targetValue) {
      this.tiles.forEach((d) => d.v = targetValue);
    },
    resetSelectionRandom: function() {
      this.tiles.forEach((d) => d.v = +(Math.random() > 0.5));
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
