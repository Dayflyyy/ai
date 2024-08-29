<template>
  <div id="app">
    <vs-row justify="center">
      <vs-col>
        <AiModule />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import AiModule from "./components/AiModule.vue";

export default {
  name: "App",
  components: {
    AiModule,
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
