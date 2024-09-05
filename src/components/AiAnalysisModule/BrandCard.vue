<template>
  <div>
    <h1>品牌分析</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <p>{{ brandanaly }}</p>
    <vs-card type="3">
      <template #title>
        <h3>{{ brandname }}</h3>
      </template>
      <template #img>
        <img src="../../assets/LOGOdayfly.jpg" alt="" />
      </template>
      <template #text>
        <p>有关{{ brandname }}的介绍</p>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BrandCard",
  props: {
    question: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      brandanaly: "",
      iscompleted: false,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getbrandanaly(newQuestion);
      },
    },
  },
  methods: {
    async getbrandanaly(question) {
      try {
        const response = await axios.post("http://localhost:8000/brand_card", {
          question,
        });
        this.brandanaly = response.data.content;
        console.log(this.brandanaly);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch brand analysis:", error);
        this.brandanaly = "无法获取品牌分析内容";
      }
    },
  },
};
</script>
