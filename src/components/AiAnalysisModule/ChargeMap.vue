<template>
  <div>
    <h1>充电桩地图</h1>
    <el-skeleton :rows="6" animated :loading="!iscompleted" />

    <p>{{ chargeanaly }}</p>
    <el-card class="box-card" shadow="always">
      <baidu-map
        class="bm-view"
        :zoom="15"
        :center="center"
        inertial-dragging
        @ready="mapReady"
        :scroll-wheel-zoom="true"
      >
        <!-- 定位控件 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <!-- 地区检索 -->
        <bm-local-search
          ref="localSearch"
          :keyword="keyword"
          :location="location"
          @searchcomplete="onSearchComplete"
          :auto-viewport="true"
          :pageCapacity="2"
          class="search"
        ></bm-local-search>
        <!-- 缩放控件 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      </baidu-map>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { BaiduMap, BmLocalSearch, BmGeolocation } from "vue-baidu-map";

export default {
  name: "ChargeMap",
  props: {
    question: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      chargeanaly: "",
      location: "南京",//只能到城市
      iscompleted: false,
      center: {}, // 定位位置信息
      keyword: "充电桩", // 默认检索关键字
      map: null,
      markers: [],
    };
  },

  components: {
    BaiduMap,
    BmLocalSearch,
    BmGeolocation,
  },

  watch: {
    question: {
      immediate: true,
      handler(newQuestion) {
        this.getchargeanaly(newQuestion);
      },
    },
  },

  // mounted() {
    
  // },

  methods: {
    async getchargeanaly(question) {
      try {
        const response = await axios.post("http://localhost:8000/charge_map", {
          question,
        });
        console.log(response.data);
        console.log(response.data.content);
        this.chargeanaly = response.data.content;
        this.area = response.data.area || "南京";
        this.initMap();
        this.searchKeyword();
        this.iscompleted = true;
      } catch (error) {
        console.error("Failed to fetch charge analysis:", error);
        this.chargeanaly = "无法获取充电桩分析内容";
      }
    },

    mapReady({ BMap, map }) {
      // 保存地图实例
      this.map = map;

      // 自动定位并设置中心点
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((r) => {
        // if (this.getStatus() === ) {
        this.center = {
          lng: r.point.lng,
          lat: r.point.lat,
        };
        // };
        // } else {
        //   console.error("定位失败：" + this.getStatus());
        // }
      });
    },

    searchKeyword() {
      if (this.area) {
        this.$refs.localSearch.search(this.keyword, { region: this.area });
      } else {
        console.error("Area not specified for search.");
      }
    },

    onSearchComplete({ results, BMap }) {
      this.clearMarkers(); // 清除之前的标记

      // if (results.getStatus() === 0) {
      const data = results.getPoiArray();
      data.forEach((result) => {
        const point = new BMap.Point(result.point.lng, result.point.lat);
        const marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
        this.markers.push(marker);
      });
      // } else {
      //   console.error("检索失败：" + results.getStatus());
      // }
    },

    clearMarkers() {
      this.markers.forEach((marker) => {
        this.map.removeOverlay(marker);
      });
      this.markers = [];
    },
  },
};
</script>

<style>
/* 样式调整 */
.box-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.bm-view {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 10px 10px 40px;
}
</style>
