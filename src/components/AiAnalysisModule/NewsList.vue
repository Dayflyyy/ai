<template>
  <div>
    <h1>新闻列表</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">
        {{ newsanaly }}
      </p>
    </div>

    <vs-card-group>
      <!-- 遍历新闻列表 -->
      <vs-card v-for="(news, index) in newslist" :key="index" @click="handleClick(news)">
        <template #title>
          <h3>{{ news.newstitle || "Default Title" }}</h3>
        </template>
        <template #img>
          <img src="../../assets/news1.jpg" alt="news image" />
        </template>
        <template #text>
          <p>{{ news.newsinfo || "Default info" }}</p>
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
      newsanaly: "",
      newslist: [],
      iscompleted: false,
      newList: null,
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
        const response = await axios.post("/news_list", {
          question,
        });
        this.newsanaly = response.data.content;
        this.newslist = response.data.newslist;
        console.log(response.data.content);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch news analysis:", error);
        this.newsanaly = "无法获取新闻分析内容";
      }
    },
    handleClick(news) {
      window.open(news.newsurl, "_blank"); // 打开新闻链接
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
