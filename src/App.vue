<template>
  <div id="app">
    <vs-row justify="center">
      <vs-col>
        <!-- <AiModule /> -->
        <AiAnalysis />

        <!-- <ChargeMap></ChargeMap> -->

        <!-- 单组件 -->
       <!-- <TypeCard></TypeCard> -->
        <!-- <BrandCard></BrandCard>  -->
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import AiAnalysis from "./components/AiAnalysis.vue";
// import ChargeMap from './components/AiAnalysisModule/ChargeMap.vue';
// import BrandCard from './components/AiAnalysisModule/BrandCard.vue';
// import TypeCard from './components/AiAnalysisModule/TypeCard.vue';


export default {
  name: "App",
  components: {
    //TypeCard,
    // BrandCard,
    AiAnalysis,
    // ChargeMap,
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
