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
  </div>
</template>

<script>

import Chart from './components/Chart.vue'

const k = 10;
const n = 50;

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

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
