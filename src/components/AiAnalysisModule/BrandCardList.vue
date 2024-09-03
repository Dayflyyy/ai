<template>
  <div>
    <h1>
      品牌列表
      <!-- {{ description }} -->
    </h1>
    <vue-markdown :source="brandsanaly"></vue-markdown>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />

    <p>
      {{ brandsanaly }}
    </p>

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
import { VueMarkdown } from "vue-markdown";
export default {
  name: "BrandCardList",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  components: {
    VueMarkdown,
  },
  data() {
    return {
      brandsanaly: "",
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
        const response = await axios.post("http://localhost:8000/brand_card_list", {
          question,
        });
        console.log(response.data);
        console.log(response.data.content);
        this.brandsanaly = response.data.content;
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch brands analysis:", error);
        this.brandsanaly = "无法获取品牌分析内容";
      }
    },
  },
};
</script>
<style lang=""></style>
