<template>
  <div id="app">
    <vs-row justify="center">
      <vs-col>
        <!-- <AiModule /> -->
        <AiAnalysis />
        <!-- <AiCommonAnswer /> -->
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
// import AiCommonAnswer from "./components/AiAnalysisModule/AiCommonAnswer.vue";

export default {
  name: "App",
  components: {
    // AiCommonAnswer,
    // TypeCard,
    // BrandCard,
     AiAnalysis,
    // ChargeMap,
  },
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
