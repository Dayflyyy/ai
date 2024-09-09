<template>
  <div class="root">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <el-container>
      <el-aside width="100px">
        <div class="avatar">
          <vs-avatar history badge :writing="!isCompleted" badge-color="primary">
            <img src="../../assets/avatar.jpg" alt="" />
          </vs-avatar>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <el-card padding="50px">
            <div>
              {{ currentChunk }}
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { fetchWithStream } from "../../axios"; // 从 axios.js 引入封装的流式响应方法

export default {
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentChunk: "", // 当前接收到的流式数据块,逐渐更新
      chunkIndex: 0, // 当前正在渲染的字符索引
      isCompleted: false, // 流式数据是否接收完成
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.sendQuestion(newQuestion);
      },
    },
  },
  methods: {
    async sendQuestion() {
      console.log("通用回答模块");
      console.log(this.question);
      if (this.question) {
        this.currentChunk = ""; // 清空当前块
        this.chunkIndex = 0; // 重置索引
        const data = { question: this.question };

        // 调用封装好的流式响应处理函数
        await this.readChatbotReply("/commonanswer", data);
      }
    },
    // 使用封装好的 fetchWithStream 处理流式响应
    async readChatbotReply(url, data = {}) {
      const response = await fetchWithStream(url, data);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      /* eslint-disable no-constant-condition */
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          this.isCompleted = true;
          break;
        }

        // 解码流式数据块
        const chunkValue = decoder.decode(value);
        // 每块数据是一个 SSE 格式的 `data: {json}`，需要解析每块
        chunkValue.split("\n").forEach((line) => {
          if (line.startsWith("data:")) {
            const jsonData = JSON.parse(line.replace("data: ", ""));
            // 检查是否有实际的内容
            if (jsonData.number !== "done" && jsonData.number) {
              this.currentChunk += jsonData.number; // 追加当前内容
              this.renderStreamedResponse(); // 调用逐字显示函数
            }
          }
        });
      }
      /* eslint-enable no-constant-condition */
    },
    renderStreamedResponse() {
      if (this.chunkIndex < this.currentChunk.length) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.chunkIndex++;
            this.renderStreamedResponse();
          }, 100); // 100毫秒延迟，可以根据需要调整
        });
      }
    },
  },
};
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
}
.root {
  max-width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
}
</style>
