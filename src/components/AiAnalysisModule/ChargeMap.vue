<template>
  <div>
    <h1>充电桩地图</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />

    <p>{{ chargeanaly }}</p>

    <h1>ChargeMap</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ChargeMap",
  props: {
    question: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      chargeanaly: "",
      iscompleted: false,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getchargeanaly(newQuestion);
      },
    },
  },
  methods: {
    async getchargeanaly(question) {
      try {
        const response = await axios.post("http://localhost:8000/charge_map", {
          question,
        });
        console.log(response.data);
        console.log(response.data.content);
        this.chargeanaly = response.data.content;
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch charge analysis:", error);
        this.chargeanaly = "无法获取品牌分析内容";
      }
    },
  },
};
</script>
<style></style>
