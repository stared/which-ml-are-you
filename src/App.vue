<template>
  <div id="app">
    <h1>Draw classification</h1>

    <select v-model="dataset">
      <option v-for="option in options" v-bind:value="option">
        {{ option.name }}
      </option>
    </select>
    <span>Selected: {{ dataset.name }}</span>

    <h2>Draw here:</h2>

    <Chart
      v-bind:points="dataset.points"
      v-bind:tiles="tiles"
    />
    <p>Points: {{points.length}}</p>
    <p>Tiles up: {{tilesUp}}</p>
    <p>True Positives: {{truePositives}}</p>
    <p>False Positives: {{falsePositives}}</p>
    <p>True Negatives: {{trueNegatives}}</p>
    <p>False Negatives: {{falseNegatives}}</p>
  </div>
</template>

<script>

import Chart from './components/Chart.vue'

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
      v: y < Math.sin(4 * x)
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

function isPointInsideTile(point, tile) {
  return tile.x <= point.x && point.x < tile.x + tileSize
    && tile.y <= point.y && point.y < tile.y + tileSize;
}

function truePositive(point, tile) {
  return point.v && (tile.v === point.v);
}

function falsePositive(point, tile) {
  return !point.v && (tile.v !== point.v);
}

function trueNegative(point, tile) {
  return !point.v && (tile.v === point.v);
}

function falseNegative(point, tile) {
  return point.v && (tile.v !== point.v);
}

function computeMetric(points, tiles, metric) {
  return points.reduce(
    function (counter, point) {
      let isCorrect = false;
      tiles.forEach(
        function(tile) {
          if (isPointInsideTile(point, tile)) {
            isCorrect = metric(point, tile);
          }
        }
      );
      return counter + isCorrect;
    },
    0);
}

export default {
  name: 'app',
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
        {name: "Empy", points: []},
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
        return computeMetric(this.points, this.tiles, truePositive);
    },
    falsePositives: function() {
        return computeMetric(this.points, this.tiles, falsePositive);
    },
    trueNegatives: function() {
        return computeMetric(this.points, this.tiles, trueNegative);
    },
    falseNegatives: function() {
        return computeMetric(this.points, this.tiles, falseNegative);
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
