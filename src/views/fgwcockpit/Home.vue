<template>
  <div class="home">
    <dv-full-screen-container>
      <!-- <dv-loading v-if="loading">Loading...</dv-loading> -->
      <!-- 头部 -->
      <dv-decoration-5 class="top-bg"></dv-decoration-5>
      <div class="top-title">浙江省应急物资保障系统</div>
      <Map ref="map" @handleMarker="handleDetail"></Map>
      <!-- 统览视图 -->
      <Across ref="Across" v-if="activeInd == 1"></Across>
      <!-- 调度视图 -->
      <Scheduling ref="Scheduling" v-if="activeInd == 2"></Scheduling>

      <!-- 底部切换 -->
      <div class="bottom-tab">
        <div @click="buttomTab(0)" :class="{ active: activeInd == 0 }">
          <span>统计视图</span>
        </div>
        <div @click="buttomTab(1)" :class="{ active: activeInd == 1 }">
          <span>统览视图</span>
        </div>
        <div @click="buttomTab(2)" :class="{ active: activeInd == 2 }">
          <span>调度视图</span>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import Util from "@/utils";
import Map from "@/components/Map";
import Across from "./across.vue";
import Scheduling from "./scheduling.vue";

export default {
  name: "Home",
  components: {
    Map,
    Across,
    Scheduling,
  },
  data() {
    return {
      activeInd: 2,
      flag: false,
      lnglat: [
        {
          name: "钱塘江管理局",
          lnglat: [120.20415276623143, 30.248947722642285],
        },
        {
          name: "浙江省委",
          lnglat: [120.16013700493394, 30.271614657552973],
        },
        {
          name: "浙江省应急厅",
          lnglat: [120.15950176230716, 30.275062360607585],
        },
        {
          name: "浙江省政府",
          lnglat: [120.15950897773592, 30.272457406664483],
        },
      ],
    };
  },
  mounted() {
    Util.currentTime();
    setTimeout(() => {
      this.lnglat.forEach((item) => {
        let lngLat = item.lnglat;
        this.$refs.map.addMarker(lngLat[0], lngLat[1], "red");
      });
    }, 2000);
  },
  methods: {
    // 切换底部tab
    buttomTab(index) {
      this.activeInd = index;
      this.$refs.map.init();
      if (this.$refs.map.trackAni) {
        this.$refs.map.pauseAni();
      }
      switch (index) {
        case 0:
          this.$refs.Across.centerShow = false;

          break;
        case 1:
          this.$refs.Across.centerShow = true;
          this.lnglat.forEach((item) => {
            let lngLat = item.lnglat;
            this.$refs.map.addMarker(lngLat[0], lngLat[1], "red");
          });
          break;

        case 2:
          this.$refs.Across.centerShow = false;
          setTimeout(() => {
            this.$refs.map.start();
          }, 5000);
          break;

        default:
          break;
      }
    },
    // 详情显示
    handleDetail() {
      this.detailShow = true;
      // this.centerShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.top-bg {
  width: 600px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
}
.top-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
}

// 底部tab
.bottom-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translate(-50%, 0);
  color: #fff;
  font-weight: 600;
  div {
    padding: 15px 20px;
    border: 2px solid #409eff;
    margin: 5px;
    cursor: pointer;
    box-shadow: 0 0 40px #409eff inset;
    opacity: 0.6;
    transform: skew(-30deg);
    span {
      display: inline-block;
      transform: skew(30deg);
    }
  }
  .active {
    opacity: 1;
    border: 2px solid #43b7db;
    margin: 5px;
    cursor: pointer;
    box-shadow: 0 0 40px #43b7db inset;
  }
}
</style>
