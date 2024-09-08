<template>
  <div class="root">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <div class="not-margin">
      <div class="title">
        <i class="bx bx-support rightmargin" margin-right="20px"></i>
        <h4>你好，我是绿驰智能</h4>
      </div>
      <p color="gray" class="subtitle">新能源汽车领域AI大模型助手，通过简单的对话开始数据分析！</p>
    </div>
    <div class="modulebox">
      <div class="preposeproblempart">
        <PresupposeProblem
          v-if="isfirstsend"
          @preposequestion="handlePreposeQuestion"
          class="preposeproblem"
        >
        </PresupposeProblem>
      </div>

      <div class="scrollable-content">
        <ul class="infinite-list" v-infinite-scroll="load">
          <component
            :is="AiCommonAnswer"
            :v-if="
              !(
                this.using[0] ||
                this.using[1] ||
                this.using[2] ||
                this.using[3] ||
                this.using[4] ||
                this.using[5] ||
                this.using[6] ||
                this.using[7] ||
                this.using[8] ||
                this.using[9]
              )
            "
            :question="newquestion"
          ></component>
          <component :is="BrandCard" v-if="using[0]" :question="newquestion"></component>
          <component
            :is="BrandCardList"
            v-if="using[1]"
            :question="newquestion"
          ></component>
          <component :is="ChargeMap" v-if="using[2]" :question="newquestion"></component>
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
    </div>

    <div id="down">
      <div class="content-inputs">
        <i class="bx bx-user" margin-right="20px"></i>
        <textarea
          cols="135"
          rows="1"
          placeholder="   试着问我：有哪些推荐的投资的新能源车企？   "
          v-model="question"
        ></textarea>
        <vs-button gradient @click="sendmessage()">
          发送 <i class="bx bxs-paper-plane leftmargin"></i>
        </vs-button>
      </div>
      <span>内容由 AI 大模型生成，请仔细甄别,其生成内容的准确性和完整性无法保证，不代表我们的态度或观点</span>
    </div>
  </div>
</template>

<script>
import axios from "../axios.js";


export default {
  name: "AiAnalysis",
  components: {
    PresupposeProblem: () => import("./PresupposeProblem.vue"),
  },
  data() {
    return {
      question: "",
      using: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

      isfirstsend: true,
      active: false,
      answer: "",
      newquestion: "",
    };
  },
  computed: {
    // 使用计算属性动态加载组件
    AiCommonAnswer() {
      return !(
        this.using[0] ||
        this.using[1] ||
        this.using[2] ||
        this.using[3] ||
        this.using[4] ||
        this.using[5] ||
        this.using[6] ||
        this.using[7] ||
        this.using[8] ||
        this.using[9]
      )
        ? () => import("./AiAnalysisModule/AiCommonAnswer.vue")
        : null;
    },

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
        const res = await axios.post("/analysis", { question: this.question });
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

<style>
.preposeproblempart {
  width: 65%;
  position: absolute;
  left: 17.5%;
  top: 30%;
}

.content-inputs textarea {
  font-family: "微软正黑体";
  resize: none;
  border: none;
  background-color: transparent;
  outline: none;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#down {
  position: fixed;
  bottom: 2%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  height: 20%;
}

.root {
  /* background: linear-gradient(to right, #9fe1fa, #f4edc9);
    height: 100%;
    /* 使背景色铺满屏幕
    width: 100%; */
  display: flex;
  flex-direction: column;
}

.content-inputs {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 80%;
  border-radius: 15px;
  box-shadow: -1px 1px 3px rgb(36, 36, 36);
  margin-bottom: 0.8%;
}

.not-margin {
  margin-top: 1%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  /* 保证标题显示在最上层 */
}

.not-margin i {
  font-size: 50px;
}

.title {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  padding-right: 20px;
}

.subtitle {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  color: rgb(110, 110, 110);
  /* 将 subtitle 紧贴在 title 之下 */
}

h4 {
  margin: 1% 0;
  top: 20px;
  font-size: 45px;
  font-weight: 900;
  font-family: "思源黑体";
}

.modulebox {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

#down span {
  color: rgb(110, 110, 110);
  font-size: 10px;
  padding-top: 20px; /* 增加上边距 */
  padding-bottom: 20px; /* 增加下边距 */
}

.scrollable-content {
  width: auto;
  overflow-y: auto;
  padding: 10px;
}
</style>
