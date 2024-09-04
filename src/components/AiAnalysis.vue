<template>
  <div>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <el-container>
      <el-header>
        <h4 class="not-margin">
          <i class="bx bx-support rightmargin"></i>通过简单的对话开始数据分析！
        </h4>
      </el-header>
      <el-main class="modulebox">
        <PresupposeProblem
          v-if="isfirstsend"
          @preposequestion="handlePreposeQuestion"
          padding-top="40px" 
        ></PresupposeProblem>
        <div class="scrollable-content">
          <ul class="infinite-list" v-infinite-scroll="load">
            <component
              :is="BrandCard"
              v-if="using[0]"
              :question="newquestion"
            ></component>
            <component
              :is="BrandCardList"
              v-if="using[1]"
              :question="newquestion"
            ></component>
            <component
              :is="ChargeMap"
              v-if="using[2]"
              :question="newquestion"
            ></component>
            <component :is="NewsList" v-if="using[3]" :question="newquestion"></component>
            <component
              :is="SalePredictYear"
              v-if="using[4]"
              :question="newquestion"
            ></component>
            <component
              :is="SalePredictMonth"
              v-if="using[5]"
              :question="newquestion"
            ></component>
            <component :is="TypeCard" v-if="using[6]" :question="newquestion"></component>
            <component
              :is="TypeCardList"
              v-if="using[7]"
              :question="newquestion"
            ></component>
          </ul>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
    <div class="content-inputs">
      <vs-input
        color="#7d33ff"
        v-model="question"
        label-placeholder="您想问什么问题？"
        shadow
      />
      <vs-button gradient @click="sendmessage()">
        发送 <i class="bx bxs-paper-plane leftmargin"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://127.0.0.1:8000", // 替换为你需要的 baseURL
  timeout: 10000, // 设置请求超时时间（可选）
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  name: "AiAnalysis",
  components: {
    PresupposeProblem: () => import("./PresupposeProblem.vue"),
  },
  data() {
    return {
      question: "",
      using: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      isfirstsend: true,
      active: false,
      answer: "",
      newquestion: "",
    };
  },
  computed: {
    // 使用计算属性动态加载组件
    BrandCard() {
      return this.using[0] ? () => import("./AiAnalysisModule/BrandCard.vue") : null;
    },
    BrandCardList() {
      return this.using[1] ? () => import("./AiAnalysisModule/BrandCardList.vue") : null;
    },
    ChargeMap() {
      return this.using[2] ? () => import("./AiAnalysisModule/ChargeMap.vue") : null;
    },
    NewsList() {
      return this.using[3] ? () => import("./AiAnalysisModule/NewsList.vue") : null;
    },
    SalePredictYear() {
      return this.using[4]
        ? () => import("./AiAnalysisModule/SalePredictYear.vue")
        : null;
    },
    SalePredictMonth() {
      return this.using[5]
        ? () => import("./AiAnalysisModule/SalePredictMonth.vue")
        : null;
    },
    TypeCard() {
      return this.using[6] ? () => import("./AiAnalysisModule/TypeCard.vue") : null;
    },
    TypeCardList() {
      return this.using[7] ? () => import("./AiAnalysisModule/TypeCardList.vue") : null;
    },
  },
  methods: {
    async handlePreposeQuestion(question) {
      this.active = true;
      this.question = question;
      await this.sendmessage(); // 等待发送完成
    },
    async sendmessage() {
      if (!this.question.trim()) {
        // 检查问题是否为空
        this.$vs.notify({
          title: "警告",
          text: "问题不能为空！",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
          position: "top-right",
        });
        return;
      }

      this.active = true;
      const loading = this.$vs.loading({
        type: "circles",
        target: this.$refs.dialog,
        text: "正在思考中...",
      });

      this.count++;
      console.log(this.question);
      try {
        const res = await customAxios.post("/analysis", { question: this.question });
        this.using = res.data.using; // 正确赋值
        console.log(this.using);

        this.newquestion = this.question;
      } catch (error) {
        console.error("请求失败:", error);
        this.answer = "抱歉，处理请求时出错了。";
      } finally {
        loading.close();
        this.request = this.question;
        this.isfirstsend = false;
        this.aftersendmessage = true;
        this.question = "";
      }
    },
  },
};
</script>

<style scoped>
.content-inputs {
  position: fixed;
  bottom: 20px; /* 将输入框上移 */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  width: 100%;
}

.not-margin {
  position: fixed;
  top: 20px; /* 将标题上移 */
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
}

.modulebox {
  position: fixed;
  top: 90px; /* 调整这个值来减少模块的顶部空间 */
  left: 0;
  right: 0;
  bottom: 90px; /* 调整这个值来减少模块的底部空间 */
  overflow: hidden;
}

.scrollable-content {
  height: 100%;
  overflow-y: auto;
  padding: 10px; /* 可选：调整内容与边界的间距 */
}
</style>
