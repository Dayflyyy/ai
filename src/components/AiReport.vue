<template>
  <div>
    <el-button @click="analysis" type="primary" style="margin-left: 16px">
      点我打开
    </el-button>

    <el-drawer
      ref="analy"
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {
    analysis(){
        this.drawer=true;
        const loading = this.$vs.loading({
        target: this.$refs.analy,
        color: "dark",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },

    },
};
</script>