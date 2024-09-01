<template>
  <div id="ai">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <div class="entry" @click="entrychat()">
      <AiEntry></AiEntry>
    </div>

    <vs-dialog ref="dialog" overflow-hidden full-screen v-model="active">
      <template #header>
        <h4 class="not-margin">
          <i class="bx bx-support rightmargin"></i>通过简单的对话开始数据分析！
        </h4>
      </template>

      <transition name="fade" v-if="aftersendmessage">
        <div class="Usermessage">
          <vs-alert shadow>
            <template #title> You </template>
            {{ request }}
          </vs-alert>
        </div>
      </transition>
      <div class="AiMessage">
        <transition v-if="aftersendmessage" name="fade">
          <vs-alert relief>
            <template #title> The ROBOT </template>
            <vue-markdown :source="answer"></vue-markdown>
            <!-- {{ answer }} -->
          </vs-alert>
        </transition>
      </div>
      <PresupposeProblem v-if="isfirstsend"></PresupposeProblem>

      <template #footer>
        <div
          :class="['content-inputs', { 'content-inputs-centered': !aftersendmessage }]"
        >
          <vs-input
            color="#7d33ff"
            state="dark"
            v-model="question"
            label-placeholder="您想问什么问题？"
            shadow
          />
          <vs-button gradient @click="sendmessage">
            发送 <i class="bx bxs-paper-plane leftmargin"></i>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import PresupposeProblem from "./PresupposeProblem.vue";
import AiEntry from "./AiEntry.vue";
import axios from "axios";
import VueMarkdown from 'vue-markdown';

const customAxios = axios.create({
  baseURL: "http://127.0.0.1:8000", // 替换为你需要的 baseURL
  timeout: 10000, // 设置请求超时时间（可选）
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  name: "AiModule",
  components: {
    PresupposeProblem,
    AiEntry,
    VueMarkdown
  },
  props: {
    msg: String,
  },
  data() {
    return {
      question: "",
      active: false,
      aftersendmessage: false,
      answer: "",
      request: "",
      isfirstsend: true,
      count: 0,
    };
  },
  methods: {
    entrychat() {
      this.active = true;
      this.aftersendmessage = false;
      this.question = "";
      this.isfirstsend = true;
    },
    async sendmessage() {
      console.log(this.question);
      const loading = this.$vs.loading({
        type: "circles",
        target: this.$refs.dialog,
        text: "正在思考中...",
      });
      this.isfirstsend = false;
      this.count++;
      try {
        const res = await customAxios.post("/chat", { question: this.question });
        this.response = res.data.message;
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        loading.close();
        this.request = this.question;
        this.answer = this.response;
        this.aftersendmessage = true;
        this.question = "";
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active for <=2.1.8 */ {
  opacity: 0;
}
.Usermessage {
  padding: 10px;
  margin-bottom: 30px;
  margin-right: 40px;
  word-wrap: break-word; /* 强制换行 */
  white-space: pre-wrap; /* 保留换行符和空白字符 */
}
.AiMessage {
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 40px;
  word-wrap: break-word; /* 强制换行 */
  white-space: pre-wrap; /* 保留换行符和空白字符 */
}

.box {
  display: block;
}
.not-margin {
  font-size: xx-large;
}
.leftmargin {
  margin-left: 10px;
}
.rightmargin {
  margin-right: 10px;
}
.content-inputs {
  padding: 10px;
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
}
.cardquestion {
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
}
.content-inputs-centered {
  position: absolute;
  transform-origin: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
</style>
