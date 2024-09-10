<template>
  <div>
    <h1>新闻列表</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />
    <div class="analysispart">
      <p class="analysis">
        {{ newsanaly }}
      </p>
    </div>

    <vs-card-group>
      <!-- 遍历新闻列表 -->
      <vs-card v-for="(news, index) in newslist" :key="index" @click="handleClick(news)">
        <template #title>
          <h3>{{ news.newstitle || "Default Title" }}</h3>
        </template>
        <template #img>
          <img src="../../assets/" alt="news image" />
        </template>
        <template #text>
          <p>{{ news.newsinfo || "Default info" }}</p>
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
    </vs-card-group>
  </div>
</template>
<script>
import axios from "../../axios.js";
export default {
  name: "BrandCardList",
  props: {
    question: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      newsanaly: "",
      newslist: [
        {
          newstitle: "中证新能源汽车主题指数报1947.69点，前十大权重包含亿纬锂能等",
          newspic: "../../assets/news1.jpg",
          newsinfo:
            "金融界9月10日消息，上证指数上涨0.28%，中证新能源汽车主题指数 (新能车主题，931450)报1947.69点。数据统计显示，中证新能源汽车主题指数近一个月下跌0.22%，近三个月下跌12.92%，年至今下跌20.38%。",
          newsurl:
            "https://www.baidu.com/link?url=6HzH9ACseekU7TP6rmYIkQOrFznnf36U-3N172GZ-rE3dU_e5JFBKK90dtN82OVDPHPgEaj48_H3kNWDFBlQE_zwVbWXPJ3sc2_HL9hGAee&wd=&eqid=df28b01f000280a60000000466e03fca",
        },
        {
          newstitle: "中汽协：新能源汽车销量快速增长，8月渗透率为44.8%",
          newspic: "../../assets/news2.jpg",
          newsinfo:
            "新京报贝壳财经讯（记者王琳琳）9月10日，新京报贝壳财经记者从中国汽车工业协会（简称“中汽协”）获悉，8月新能源汽车产销分别为109.2万辆和110万辆，同比分别增长29.6%和30%",
          newsurl:
            "https://www.baidu.com/link?url=6HzH9ACseekU7TP6rmYIkQOrFznnf36U-3N172GZ-rE3Ot-_flwPHrwe3H8nww48QQPcry3MtyG6NlHTQvCffMOYRpoUs_sy9dF3rKoa1NS&wd=&eqid=df28b01f000280a60000000466e03fca",
        },
        {
          newstitle: "中汽协：8月新能源汽车销量为110万辆 同比增长30%",
          newspic: "../../assets/news3.jpg",
          newsinfo:
            "【中汽协：8月新能源汽车销量为110万辆 同比增长30%】财联社9月10日电，中汽协数据显示，8月，新能源汽车产销分别完成109.2万辆和110万辆，同比分别增长29.6%和30%",
          newsurl:
            "https://www.baidu.com/link?url=6HzH9ACseekU7TP6rmYIkQOrFznnf36U-3N172GZ-rE3Ot-_flwPHrwe3H8nww486sLfMHXJ5Teby2R3l8CiqBCiCaGctYNBgErFCyA0u_a&wd=&eqid=df28b01f000280a60000000466e03fca",
        },
      ],
      iscompleted: false,
      newList: null,
    };
  },
  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getnewsanaly(newQuestion);
      },
    },
  },
  methods: {
    async getnewsanaly(question) {
      try {
        const response = await axios.post("/news_list", {
          question,
        });
        this.newsanaly = response.data.content;
        console.log(response.data.content);
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch news analysis:", error);
        this.newsanaly = "无法获取新闻分析内容";
      }
    },
    handleClick(news) {
      window.open(news.newsurl, "_blank"); // 打开新闻链接
    },
  },
};
</script>
<style>
.analysispart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 20px;
}
.analysis {
  max-width: 700px;
}
</style>
