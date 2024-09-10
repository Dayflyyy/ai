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
          <img :src="brand.brandpicurl" alt="" />
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
      brandlist: [{
        brandname: "特斯拉",
        brandpicurl: "https://disher-img.obs.cn-east-3.myhuaweicloud.com/Screenshots/tesla.png",
        branddescription: "特斯拉是全球知名的电动汽车和清洁能源公司，以创新技术和产品推动全球向可持续能源转变。公司以交流电、无线电之父尼古拉·特斯拉的名字命名，致力于通过各类日益经济实惠的电动汽车加速全世界向电动出行的转变。",
      },{
        brandname: "蔚来",
        brandpicurl: "https://disher-img.obs.cn-east-3.myhuaweicloud.com/Screenshots/weilai.png",
        branddescription: "蔚来是一家中国的新能源汽车制造商，以提供智能电动汽车和智能出行解决方案为使命。蔚来汽车采用先进的电池技术，提供高性能、长续航和智能驾驶体验。蔚来汽车还提供智能充电、智能停车和智能驾驶等智能出行服务。",
      },{
        brandname: "比亚迪",
        brandpicurl: "https://disher-img.obs.cn-east-3.myhuaweicloud.com/Screenshots/byd.png",
        branddescription: "比亚迪是一家中国的新能源汽车制造商，以提供高性能、长续航和智能驾驶体验为使命。比亚迪汽车采用先进的电池技术，提供经济实惠、环保友好的电动汽车。比亚迪汽车还提供智能充电、智能停车和智能驾驶等智能出行服务。",
      },{
        brandname: "理想汽车",
        brandpicurl: "https://disher-img.obs.cn-east-3.myhuaweicloud.com/Screenshots/lixiang.png",
        branddescription: "理想汽车是一家中国的新能源汽车制造商，以提供高性能、长续航和智能驾驶体验为使命。理想汽车采用先进的电池技术，提供经济实惠、环保友好的电动汽车。理想汽车还提供智能充电、智能停车和智能驾驶等智能出行服务。",
      },],
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
