<template>
  <div id="app">
    <Chart
      v-bind:points="points"
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
.map((i) => {
  const x = Math.random();
  const y = Math.random();

  return {
    x: k * x,
    y: k * y,
    v: y < Math.sin(4 * x)
  };
});

export default {
  name: 'app',
  components: {
    Chart
  },
  data: function () {
    return {
      points: points,
      tiles: tiles,
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
