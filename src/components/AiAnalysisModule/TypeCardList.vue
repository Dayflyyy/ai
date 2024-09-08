<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <h1>车型列表</h1>
    <!-- 骨架屏展示 -->
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">{{ typesanaly }}</p>
    </div>
    <!-- 渲染卡片组 -->
    <vs-card-group>
      <vs-card v-for="(type, index) in typelist" :key="index" @click="handleClick">
        <!-- 卡片标题展示车型名称 -->
        <template #title>
          <h3>{{ type.typename }}</h3>
        </template>
        <!-- 卡片中的图片展示 -->
        <template #img>
          <img src="../../assets/LOGOdayfly.jpg" alt="车型图片" />
          <!-- <img :src="type.picurl" alt="车型图片" /> -->
        </template>
        <!-- 卡片中的描述展示 -->
        <template #text>
          <p>{{ type.description }}</p>
        </template>
        <!-- 卡片的交互按钮 -->
        <template #interactions>
          <vs-button danger icon>
            <i class="bx bx-heart"></i>
          </vs-button>
          <vs-button class="btn-chat" shadow primary>
            <i class="bx bx-chat"></i>
            <span class="span">54</span>
          </vs-button>
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>

<script>
import axios from "../../axios.js";

export default {
  name: "TypeCardList",

  data() {
    return {
      typesanaly: "", // 分析的内容
      typelist: [], // 车型列表
      iscompleted: false, // 加载状态
    };
  },
  methods: {
    // 获取车型数据
    async gettypesanaly(question) {
      try {
        const response = await axios.post("/type_card", {
          question,
        });
        // 解析接口返回的数据
        this.typesanaly = response.data.content;
        this.typelist = response.data.typeinfolist; // 注意这里是 typeinfolist
        this.iscompleted = true;
      } catch (error) {
        console.error("获取车型分析失败:", error);
        this.typesanaly = "无法获取车型分析内容";
        this.iscompleted = true;
      }
    },

    // 点击处理事件
    handleClick() {
      this.$router.push("/TypeCardList");
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
