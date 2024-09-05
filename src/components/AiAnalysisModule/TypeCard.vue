<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <h1>车型介绍</h1>
    <!-- <el-skeleton :rows="6" animated :loading="!iscompleted" /> -->
    <div class="analysispart">
      <p class="analysis">
        {{ typeanaly }}
      </p>
    </div>
    <div class="typecard">
      <vs-card type="3">
        <template #title>
          <h3>{{ typename }}</h3>
        </template>
        <template #img>
          <img src="../../assets/LOGOdayfly.jpg" alt="" />
        </template>
        <template #text>
          <p>{{ description }}</p>
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
  name: "TypeCard",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      typeanaly: "",
      typename: "",
      description: "",
      iscompleted: false,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.gettypeanaly(newQuestion);
      },
    },
  },
  methods: {
    async gettypeanaly(question) {
      try {
        const response = await axios.post("http://localhost:8000/type_card", {
          question,
        });
        this.typeanaly = response.data.content;
        console.log(this.typeanaly);
        this.typeinfo = response.data.typeinfo;
        this.typename = this.typeinfo.typename;
        console.log(this.typename);
        this.description = this.typeinfo.description;
        console.log(this.description);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch type analysis:", error);
        this.typeanaly = "无法获取车型分析内容";
      }
    },
  },
};
</script>
<style>
.typecard {
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
