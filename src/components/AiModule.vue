<template>

  <div id="ai">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <vs-card type="2">
      <template #title>
        <h3>NEVCHAT</h3>
      </template>
      <template #img>
        <img src="../assets/LOGOdayfly.jpg" alt="" @click="active = !active" />
      </template>
      <template #text>
        <p>智谱AI</p>
        <p>---------------为您的数据分析提供更好建议------------</p>
      </template>
      <template #interactions>
        <vs-button class="btn-chat" shadow primary>
          <i class="bx bx-chat"></i>
          <span class="span"> 54 </span>
        </vs-button>
      </template>
    </vs-card>
    <vs-dialog overflow-hidden full-screen v-model="active">
      <template #header>
        <h4 class="not-margin">通过简单的对话开始数据分析！</h4>
      </template>
      
      <transition name="fade">
        <div class="Usermessage">
          <div class="center grid" v-if="aftersendmessage">
            <vs-alert shadow>
              <template #title> You </template>
              {{ request }}
            </vs-alert>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="AiMessage" v-if="aftersendmessage">
          <vs-alert relief closable>
            <template #title> The ROBOT </template>
            {{ message }}
          </vs-alert>
        </div>
      </transition>

      <template #footer>
        <div class="center content-inputs">
          <vs-input
            color="#7d33ff"
            state="您想问什么问题？"
            v-model="value"
            label-placeholder="您想问什么问题？"
            shadow
          />
          <vs-button gradient :active="active == 0" @click="sendmessage">
            发送 <i class="bx bxs-paper-plane leftmargin"></i>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "AiModule",
  props: {
    msg: String,
  },
  data() {
    return {
      value: "",
      active: false,
      aftersendmessage: false,
      message: "你好，我是机器人，有什么可以帮助你的吗？",
      request: "",
      sending: false,
      success: false,

      loadingFace: false,
      successFace: false,
    };
  },
  methods: {
    sendmessage() {
      const loading = this.$vs.loading({
        type: "circles",
        target: this.$refs.dialog,
        text: "正在思考中...",
      });
      setTimeout(() => {
        loading.close();
        
        this.request = this.value;
        this.aftersendmessage = true;
        this.value = "";
      }, 1000);
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
  margin-bottom: 10px;
  margin-right: 40px;
}
.AiMessage {
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 40px;
}
.content-inputs {
  padding: 10px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  scale:200%;
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

</style>
