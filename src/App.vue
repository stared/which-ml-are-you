<template>
  <div id="app">
    <ul class="menu">
      <li><router-link to="/">Playground</router-link></li>
      <li><router-link to="/lvl/1">Level 1</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
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

ul.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

.menu li {
  display: inline;
}

.menu li a {
  display: inline;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

.menu li a:hover {
  background-color: #555;
  color: white;
}

</style>
