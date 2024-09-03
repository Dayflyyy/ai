<template>
  <div>
    <h1>新闻列表</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />

    <p>{{ newsanaly }}</p>

    <vs-card-group>
      <vs-card v-for="card in 6" :key="card.label" @click="handleClick">
        <template #title>
          <h3>{{ card }}</h3>
        </template>
        <template #img>
          <img src="../../assets/LOGOdayfly.jpg" alt="" />
        </template>
        <template #text>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
import axios from "axios";
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
      newsanaly: "",
      iscompleted: false,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getnewsanaly(newQuestion);
      },
    },
  },
  methods: {
    async getnewsanaly(question) {
      try {
        const response = await axios.post("http://localhost:8000/news_list", {
          question,
        });
        this.newsanaly = response.data.content;
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch news analysis:", error);
        this.newsanaly = "无法获取新闻分析内容";
      }
    },
  },
};
</script>
<style lang=""></style>
