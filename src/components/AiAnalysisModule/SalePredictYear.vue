<template>
  <div>
    <h1>特定年份销售预测</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">{{ predictYear }}</p>
    </div>

    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "../../axios.js";

export default {
  name: "SalePredictYear",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      predictYear: "", // 用于存储从API获取的描述
      chartData: [], // 用于存储从API获取的图表数据
      iscompleted: false,
    };
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    question: {
      immediate: true,

      async handler(newQuestion) {
        await this.fetchYearPrediction(newQuestion);
        // this.renderChart(); // 在获取数据后渲染图表
      },
    },
  },
  methods: {
    async fetchYearPrediction(question) {
      try {
        const response = await axios.post("/sale_predict_year", {
          question,
        });
        this.predictYear = response.data.content; // 假设API返回的描述信息
        this.chartData = response.data.chartData; // 假设API返回的图表数据
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch year prediction:", error);
        this.predictYear = "无法获取销售预测数据";
        this.chartData = [];
      }
    },
    renderChart() {
      const chartDom = document.getElementById("chart");
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
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
