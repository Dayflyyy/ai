<template>
  <div>
    <h1>
      车型卡片
      <!-- {{ description }} -->
    </h1>
    <p>{{ typeanaly }}</p>
    <vs-card type="3">
      <template #title>
        <h3>Pot with a plant</h3>
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
      } catch (error) {
        console.error("Failed to fetch type analysis:", error);
        this.typeanaly = "无法获取车型分析内容";
      }
    },
  },
};
</script>
<style lang=""></style>
