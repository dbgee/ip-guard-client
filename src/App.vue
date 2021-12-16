<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="200px" style="margin-bottom: 15px">
    <Server />
  </div>
</template>

<script>
import Server from "@/components/Server";
export default {
  name: 'App',
  components: {
    Server
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
