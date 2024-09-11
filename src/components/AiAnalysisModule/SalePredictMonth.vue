<template>
  <div>
    <h1>特定月份的销售预测</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <p>{{ predictmonth }}</p>

    <div id="monthChart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import {setOption} from './predict.js';

export default {
  name: "SalePredictMonth",
  props: {
    question: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      predictmonth: "",
      chartData: [], // 用于存储从API获取的图表数据
      iscompleted: false, // 控制骨架屏显示
    };
  },
  watch: {
    question: {
      immediate: true,
      async handler(newQuestion) {
        await this.fetchMonthPrediction(newQuestion);
        // this.renderMonthChart(); // 在获取数据后渲染图表
      },
    },
  },
  mounted() {

  },
  methods: {
    async fetchMonthPrediction(question) {
      try {
        const response = await axios.post("http://localhost:8000/sale_predict_month", {
          question,
        });
        this.predictmonth = response.data.content;
        this.chartData = response.data.chartData; // 假设API返回的数据结构中包含chartData
        this.iscompleted = true; // 数据获取完成后，将iscompleted设置为true以隐藏骨架屏
        var chart = echarts.init(document.getElementById('monthChart'));
        setOption(chart, chartData);

      } catch (error) {
        console.error("Failed to fetch month prediction:", error);
        this.predictmonth = "无法获取销售预测数据";
        this.chartData = [];
      }
    },
  },
};
</script>

<style>
.analysispart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 20px;
}
.analysis {
  max-width: 700px;
}
</style>