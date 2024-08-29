<template>
  <div id="ai">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <div class="entry" @click="entrychat()">
      <AiEntry></AiEntry>
    </div>

    <vs-dialog overflow-hidden full-screen v-model="active">
      <template #header>
        <h4 class="not-margin"><i class='bx bx-support rightmargin' ></i>通过简单的对话开始数据分析！</h4>
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
            {{ answer }}
          </vs-alert>
        </div>
      </transition>

      <PresupposeProblem v-if="isfirstsend"></PresupposeProblem>

      <template #footer>
        <div
          :class="['content-inputs', { 'content-inputs-centered': !aftersendmessage }]"
        >
          <vs-input
            color="#7d33ff"
            state="您想问什么问题？"
            v-model="value"
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

export default {
  name: "AiModule",
  components: {
    PresupposeProblem,
    AiEntry,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      value: "",
      active: false,
      aftersendmessage: false,
      message: ["你好，我是机器人，有什么可以帮助你的吗？",
        "另外一条测试语句",
        "新能源车（英语：new energy vehicle），或称替代燃料车（alternative fuel vehicle），是指采用非常规（非化石燃料）的能源作为动力来源（或使用常规的车用燃料、采用新型车载动力装置），综合车辆的动力控制和驱动方面的先进技术，形成的技术原理先进、具有新技术、新结构的车辆。新能源车包括五大类型：混合动力电动汽车（HEV，主要分油电混动车和插混电动车两类）、纯电动车（BEV）与太阳能车、燃料电池车（FCEV）、增程式电动车（REEV）[1]、其他新能源包括机械能（如超级电容器、飞轮、压缩空气等高效储能器）车等，与非常规的车用燃料指除汽油、柴油之外的燃料，如天然气（NG）、液化石油气（LPG）、乙醇汽油（EG）、甲醇、二甲醚、氢燃料[2][3]，另外有一些冷门的方案，如斯特林发动机和六冲程内燃机等增加燃烧效率的设计，甚至核能等。",
      ],
      answer:"",
      request: "",
      isfirstsend: true,
      count: 0,
    };
  },
  methods: {
    entrychat() {
      this.active = true;
      this.aftersendmessage = false;
      this.value = "";
      this.isfirstsend = true;
    },
    sendmessage() {
      const loading = this.$vs.loading({
        type: "circles",
        target: this.$refs.dialog,
        text: "正在思考中...",
      });
      this.isfirstsend = false;
      this.count++;
      setTimeout(() => {
        loading.close();
        this.request = this.value;
        this.answer = this.message[this.count % 3];
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

.box {
  display: block;
}
.not-margin {
  font-size: xx-large;
}
.leftmargin {
  margin-left: 10px;
}
.rightmargin{
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
