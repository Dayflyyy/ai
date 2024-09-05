<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <h1>品牌分析</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">{{ brandanaly }}</p>
    </div>

    <div class="brandcard">
      <vs-card type="3">
        <template #title>
          <h3>{{ brandinfo.brandname }}</h3>
        </template>
        <template #img>
          <img src="../../assets/LOGOdayfly.jpg" alt="" />
        </template>
        <template #text>
          <p>{{ brandinfo.branddescription }}</p>
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
      brandinfo: "",
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
        this.brandinfo = response.data.brandinfo;
        console.log(this.brandinfo);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch brand analysis:", error);
        this.brandanaly = "无法获取品牌分析内容";
      }
    },
  },
};
</script>
<style>
.brandcard {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
}

/* 可根据需要设置卡片的最大宽度 */
vs-card {
  max-width: 400px; /* 设置卡片最大宽度 */
}

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
