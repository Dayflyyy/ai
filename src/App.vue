<template>
  <div id="app">
    <vs-row justify="center">
      <vs-col>
        <!-- <AiModule /> -->
        <AiAnalysis />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import AiAnalysis from "./components/AiAnalysis.vue";

export default {
  name: "App",
  components: {
    AiAnalysis,
  },
};
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
