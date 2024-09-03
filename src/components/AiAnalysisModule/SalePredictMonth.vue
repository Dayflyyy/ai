<template>
  <div>
    <h1>特定月份的销售预测</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />

    <p>{{ predictmonth }}</p>

    <div id="monthChart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

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
    this.renderMonthChart();
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
      } catch (error) {
        console.error("Failed to fetch month prediction:", error);
        this.predictmonth = "无法获取销售预测数据";
        this.chartData = [];
      }
    },
    renderMonthChart() {
      const chartDom = document.getElementById("monthChart");
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: "category",
          data: ["Week 1", "Week 2", "Week 3", "Week 4"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 180],
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
