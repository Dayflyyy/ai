<template>
  <div class="root">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <el-container>
      <el-header>
        <div class="not-margin"></div>
        <div class="title">
          <i class="bx bx-support rightmargin" margin-right="10px"></i>
          <h4>你好，我是绿驰智能体</h4>
        </div>
        <p color="gray" class="subtitle">通过简单的对话开始数据分析！</p>
      </el-header>
      <el-main class="modulebox">
        <div class="preposeproblempart">
          <PresupposeProblem
            v-if="isfirstsend"
            @preposequestion="handlePreposeQuestion"
            padding-top="40px"
          ></PresupposeProblem>
        </div>

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

<style>
.root{
  background: linear-gradient(to right, #9fe1fa, #f4edc9);
}

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
}
.title{
  position: fixed;
  top: 20px; /* 将标题上移 */
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  padding-right: 20px;
}
.input-wrap {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.input-wrap input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;

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
