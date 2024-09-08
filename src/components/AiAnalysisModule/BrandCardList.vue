<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <h1>品牌列表</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">
        {{ brandsanaly }}
      </p>
    </div>
    <vs-card-group>
      <vs-card v-for="(brand, index) in brandlist" :key="index" @click="handleClick">
        <template #title>
          <h3>{{ brand.brandname }}</h3>
        </template>
        <template #img>
          <img src="../../assets/LOGOdayfly.jpg" alt="" />
        </template>
        <template #text>
          <p>{{ brand.branddescription }}</p>
        </template>
        <template #interactions>
          <vs-button danger icon>
            <i class="bx bx-heart"></i>
          </vs-button>
          <vs-button class="btn-chat" shadow primary>
            <i class="bx bx-chat"></i>
            <span class="span"> 54 </span>
          </vs-button>
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>
<script>
import axios from "../../axios.js";
export default {
  name: "BrandCardList",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      brandsanaly: "",
      brandlist: [],
      iscompleted: false,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getbrandsanaly(newQuestion);
      },
    },
  },
  methods: {
    async getbrandsanaly(question) {
      try {
        const response = await axios.post("/brand_card_list", {
          question,
        });
        console.log(response.data);
        console.log(response.data.content);
        this.brandsanaly = response.data.content;
        this.brandlist = response.data.brandinfolist;
        console.log(this.brandlist);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch brands analysis:", error);
        this.brandsanaly = "无法获取品牌分析内容";
        this.iscompleted = true;
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
