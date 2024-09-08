<template>
  <div class="layout">
    <vs-card type="4" @click="preposequestion('查看全球新能源汽车销量')">
      <template #title>
        <h3>查看全球新能源汽车销量</h3>
      </template>
      <template #img>
        <img src="../assets/LOGOdayfly.jpg" alt="" />
      </template>
      <template #text>
        <p>统计全球汽车销量，计算销量环比同比，预测销量走势</p>
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
    <vs-card type="4" @click="preposequestion('目前全国的新能源充电桩分布在哪些城市')">
      <template #title>
        <h3>查看全国充电桩分布</h3>
      </template>
      <template #img>
        <img src="../assets/LOGOdayfly.jpg" alt="" />
      </template>
      <template #text>
        <p>查看全国新能源汽车充电桩分布，查看省保有量排名</p>
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
    <vs-card type="4" @click="preposequestion('查看新能源最新资讯')">
      <template #title>
        <h3>查看新能源最新资讯</h3>
      </template>
      <template #img>
        <img src="../assets/LOGOdayfly.jpg" alt="" />
      </template>
      <template #text>
        <p>查看新能源领域全球资讯，最新政策，产业年报</p>
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
export default {
  name: "PresupposeProblem",
  methods: {
    preposequestion(question) {
      this.$emit("preposequestion", question);
    },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
}
</style>