<template>
  <div id="map"></div>
</template>

<script>
import { styleJson } from "./style";
export default {
  data() {
    return {
      map: null,
      point: [],
      trackAni: null,
      iconImage: {
        red: require("./image/red.png"),
        green: require("./image/green.png"),
        orange: require("./image/orange.png"),
      },
    };
  },
  mounted() {
    var path = [
      {
        lng: 120.160156,
        lat: 30.271396,
      },
      {
        lng: 120.1629934,
        lat: 30.272071,
      },
      {
        lng: 120.161543,
        lat: 30.276487,
      },
      {
        lng: 120.15973809,
        lat: 30.27536524,
      },
      {
        lng: 120.154021,
        lat: 30.273328,
      },
      {
        lng: 120.154656,
        lat: 30.271671,
      },
      {
        lng: 120.157359,
        lat: 30.269708,
      },
      {
        lng: 120.158396,
        lat: 30.270601,
      },
      {
        lng: 120.159415,
        lat: 30.268479,
      },
      {
        lng: 120.158695,
        lat: 30.268123,
      },
    ];
    this.point = [];
    for (var i = 0; i < path.length; i++) {
      this.point.push(new BMapGL.Point(path[i].lng, path[i].lat));
    }
    this.init();
  },
  methods: {
    init() {
      this.map = new BMapGL.Map("map");
      this.map.centerAndZoom(
        new BMapGL.Point(120.10373122597868,29.330442120240864),
        9
      ); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.setMapStyleV2({ styleJson: styleJson }); // 设置地图样式
      // setTimeout(this.start, 3000);
    },
    setCenter(lng, lat, zoom = 17) {
      this.map.centerAndZoom(new BMapGL.Point(lng, lat), zoom);
    },
    addMarker(lng, lat, imgName) {
      let that = this;
      // 创建小车图标
      var myIcon = new BMapGL.Icon(
        this.iconImage[imgName],
        new BMapGL.Size(52, 126)
      );
      // 创建信息窗口
      var opts = {
        width: 200,
        height: 100,
        title: "故宫博物院",
      };
      // 创建Marker标注，使用小车图标
      var pt = new BMapGL.Point(lng, lat);
      var marker = new BMapGL.Marker(pt, {
        icon: myIcon,
      });

      var infoWindow = new BMapGL.InfoWindow(
        "地址：北京市东城区王府井大街88号乐天银泰百货八层",
        opts
      );
      marker.addEventListener("click", function () {
        // this.map.openInfoWindow(infoWindow, pt); // 开启信息窗口
        that.$emit("handleMarker");
      });
      // 将标注添加到地图
      this.map.addOverlay(marker);
    },
    customIcon() {},
    DrivingRoute() {
      let that = this
      var p1 = new BMapGL.Point(119.647277,29.079056);
      var p2 = new BMapGL.Point(121.420737,28.655768);

      var driving = new BMapGL.DrivingRoute(that.map, {
        renderOptions: { map: that.map, autoViewport: true },
      });
      driving.search(p1, p2);
      this.setCenter(119.647277,29.079056,10);
    },
    start() {
      var pl = new BMapGL.Polyline(this.point, {
        strokeColor: "red",
        // 43b7db
        strokeWeight: 6,
        strokeOpacity: 0.5,
      });
      this.trackAni = new BMapGLLib.TrackAnimation(this.map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 30, // 轨迹播放的角度，默认为55
        duration: 20000, // 动画持续时长，默认为10000，单位ms
        delay: 300, // 动画开始的延迟，默认0，单位ms
      });
      this.trackAni.start();
    },
    pauseAni() {
      this.trackAni.pause();
    },
    continueAni() {
      this.trackAni.continue();
    },
    clearOverlays() {
      this.map.clearOverlays();
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>