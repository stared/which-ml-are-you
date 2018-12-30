<template>
  <div id="app">
    <h1>Draw classification</h1>

    <select v-model="dataset">
      <option disabled value="">Select dataset</option>
      <option v-for="option in options" v-bind:value="option">
        {{ option.name }}
      </option>
    </select>
    <span>Selected: {{ dataset.name }}</span>

    <h2>Draw here:</h2>

    <Chart
      v-bind:points="points"
      v-bind:tiles="tiles"
    />
    <p>Points: {{points.length}}</p>
    <p>Tiles up: {{tilesUp}}</p>
  </div>
</template>

<script>
// TODO: v-bind:points=dataset.data AND graph drawing in Vue

// TODO: consider https://mikerodham.github.io/vue-dropdowns/

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
  .map((i) => {
    const x = Math.random();
    const y = Math.random();

    return {
      x: k * x,
      y: k * y,
      v: y < Math.sin(4 * x)
    };
  })

export default {
  name: 'app',
  components: {
    Chart
  },
  data: function () {
    return {
      dataset: "",
      points: points,
      tiles: tiles,
      options: [
        {name: "Sinish", data: points},
        {name: "Another", data: [1]},
      ],
    };
  },
  computed: {
    tilesUp: function() {
      let counter = 0
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
