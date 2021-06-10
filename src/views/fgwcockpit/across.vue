<template>
  <div class="across">
    <!-- 左侧 -->
    <div
      :class="{
        'left-container': true,
        'container-hide': !centerShow,
        'container-show': centerShow,
      }"
    >
      <div class="left-top">
        <dv-border-box-10>
          <div class="title">
            <h3>物资查询</h3>
            <div style="margin: 10px 20px 0 30px">
              <el-input
                style="width: 100%"
                v-if="inputShow"
                size="mini"
                v-model="value"
                :placeholder="select"
              >
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="查物资" value="查物资"></el-option>
                  <el-option label="查仓库" value="查仓库"></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-caret-right"
                  @click="inputShow = false"
                  size="mini"
                ></el-button>
              </el-input>
              <el-button
                type="primary"
                icon="el-icon-search"
                circle
                @click="inputShow = true"
                v-else
              ></el-button>
            </div>
          </div>
          <!-- 内容 -->
          <div class="left-top_container">
            <div
              :class="{ 'tab-item': true, active: active == 0 }"
              @click="itemClick(0)"
            >
              等级
            </div>
            <div
              :class="{ 'tab-item': true, active: active == 1 }"
              @click="itemClick(1)"
            >
              地区
            </div>
            <div
              :class="{ 'tab-item': true, active: active == 2 }"
              @click="itemClick(2)"
            >
              事件
            </div>
          </div>
          <div class="left-content_container">
            <div
              :class="{
                'c-item': true,
                'c-item_t': active == 2,
                active: cActive == index,
              }"
              v-for="(item, index) in options"
              :key="item.value"
              @click="cItemClick(index)"
            >
              {{ item.label }}
            </div>
          </div>
        </dv-border-box-10>
      </div>
      <div class="left-bottom">
        <dv-border-box-10>
          <div class="title">
            <h3>重点物资库存数据</h3>
            <div style="margin: 10px 20px 0 30px">
              <el-button type="primary" @click="changeEcharts"
                >主要按钮</el-button
              >
            </div>
          </div>
          <div id="main" class="echarts"></div>
        </dv-border-box-10>
      </div>
    </div>
    <!-- 右侧 -->
    <div
      :class="{
        'right-container': true,
        'container-hide': !centerShow,
        'container-show': centerShow,
      }"
    >
      <div class="right-top">
        <dv-border-box-10>
          <div class="title">
            <h3>全省应急物资储备年度支出</h3>
            <div style="margin: 10px 20px 0 30px">
              <el-button
                type="primary"
                icon="el-icon-s-operation"
                circle
                @click="numShowClick"
              ></el-button>
            </div>
          </div>
          <!-- 内容 -->
          <div class="content-container" v-if="numShow">
            <h4>物资总数（件）</h4>
            <dv-digital-flop
              :config="config"
              style="width: 330px; height: 130px; margin: 0 auto"
            />
            <div class="city-num">
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config1" style="height: 52px" />
                <div style="margin-top: -14px">省级</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config2" style="height: 52px" />
                <div style="margin-top: -14px">市级</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config3" style="height: 52px" />
                <div style="margin-top: -14px">县级</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config4" style="height: 52px" />
                <div style="margin-top: -14px">乡级</div>
              </div>
            </div>
          </div>
          <div class="content-container" v-else>
            <h4>新增物资总价值（元）</h4>
            <div style="display: flex">
              <div>
                <dv-digital-flop
                  :config="config5"
                  style="width: 300px; height: 130px"
                />
              </div>
              <div style="text-align: center">
                <dv-digital-flop
                  :config="config6"
                  style="width: 150px; height: 130px"
                />
                <div style="margin-top: -50px; font-size: 12px">同比降低</div>
              </div>
            </div>
            <div class="city-num">
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config7" style="height: 52px" />
                <div style="margin-top: -14px">第一季度</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config8" style="height: 52px" />
                <div style="margin-top: -14px">第二季度</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config9" style="height: 52px" />
                <div style="margin-top: -14px">第三季度</div>
              </div>
              <div style="flex: 1; text-align: center">
                <dv-digital-flop :config="config10" style="height: 52px" />
                <div style="margin-top: -14px">第四季度</div>
              </div>
            </div>
          </div>
        </dv-border-box-10>
      </div>
      <div class="right-bottom">
        <dv-border-box-10>
          <div class="title">
            <h3>全省物资实时储量监控</h3>
          </div>
          <dv-scroll-board
            :config="configData"
            style="width: 95%; height: 80%; margin: 20px auto"
          />
        </dv-border-box-10>
      </div>
    </div>

    <!-- 性情弹框 -->
    <div class="detail-dialog" v-if="detailShow">
      <dv-border-box-11 title="仓库详情">
        <el-form lable-width="130px" class="detailForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="0">
                <h3>衢州市应急物资储备库</h3>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属单位：">
                衢州市发改委（粮食物资局）
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位联系人：">
                毛建华（13376852290）
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库地址：">
                衢州市三衢路558号
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库管理员：">
                林青（18057085848）
              </el-form-item>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            style="width: 96%; margin: 20px auto 0 auto"
            max-height="400px"
            border
          >
            <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="物资名称"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="可调数量"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="contact" label="调拨联系人" align="center">
            </el-table-column>
          </el-table>
          <div class="btns">
            <el-button type="primary" @click="detailShow = false"
              >关闭</el-button
            >
          </div>
        </el-form>
      </dv-border-box-11>
    </div>
  </div>
</template>

<script>
import PublicData from "@/utils/PublicData";
import chartData from "@/utils/echarts";
export default {
  name: "across",
  data() {
    return {
      tableData: [
        {
          name: "手电筒",
          num: "600只",
          contact: "郝胜军（13362031969）",
        },
        {
          name: "雨衣",
          num: "300件",
          contact: "毛建华（13376852290）",
        },
        {
          name: "手电筒",
          num: "600只",
          contact: "毛建华（13376852290）",
        },
        {
          name: "手电筒",
          num: "600只",
          contact: "毛建华（13376852290）",
        },
        {
          name: "手电筒",
          num: "600只",
          contact: "毛建华（13376852290）",
        },
        {
          name: "手电筒",
          num: "600只",
          contact: "毛建华（13376852290）",
        },
      ],
      centerShow: true,
      detailShow: false,
      loading: true,
      numShow: true,
      configData: {
        header: ['物资所属单位', '类型', '时间'],
        data: [
          ["省商业厅", "入库", "18:27:17"],
          ["省国资委", "出库", "18:22:05"],
          ["舟山消防救援", "报废", "18:16:53"],
          ["台州商务局", "入库", "18:11:41"],
          ["金华应急局", "入库", "18:06:29"],
          ["省粮食厅", "报废", "18:01:17"],
          ["杭州市应急局", "入库", "17:56:05"],
          ["宁波市粮食局  ", "入库", "17:50:53"],
          ["嘉兴市应急局", "报废", "17:45:41"],
          ["台州市应急局", "入库", "17:40:29"],
        ],
      },
      config: this.initNum(0, "个", {
        fontSize: 40,
      }),
      config1: this.initNum(0, "", {
        fontSize: 20,
      }),
      config2: this.initNum(0, "", {
        fontSize: 20,
      }),
      config3: this.initNum(0, "", {
        fontSize: 20,
      }),
      config4: this.initNum(0, "", {
        fontSize: 20,
      }),
      config5: this.initNum(0, "", {
        fontSize: 40,
      }),
      config6: this.initNum(0, "%", {
        fontSize: 20,
      }),
      config7: this.initNum(0, "", {
        fontSize: 20,
      }),
      config8: this.initNum(0, "", {
        fontSize: 20,
      }),
      config9: this.initNum(0, "", {
        fontSize: 20,
      }),
      config10: this.initNum(0, "", {
        fontSize: 20,
      }),
      inputShow: false,
      value: "",
      select: "查物资",
      active: 0,
      cActive: 0,
      myChart: null,
      regionData:[]
    };
  },
  computed: {
    options() {
      switch (this.active) {
        case 0:
          // this.regionData = chartData.
          return PublicData.level;
        case 1:
          return PublicData.region;
        case 2:
          return PublicData.event;
        default:
          return PublicData.level;
      }
    },
  },
  mounted() {
    this.regionData = chartData.region
    setTimeout(() => {
      this.initEcharts();
      this.initConfig();
    }, 2000);
  
  },
  methods: {
    numShowClick() {
      this.numShow = !this.numShow;
      this.configReset();
      this.loading = true;
      setTimeout(() => {
        this.initConfig();
        this.loading = false;
      }, 2000);
    },
    initConfig() {
      this.config = this.initNum(29916192, "个", {
        fontSize: 40,
      });

      this.config1 = this.initNum(3357942, "", {
        fontSize: 20,
      });

      this.config2 = this.initNum(3178231, "", {
        fontSize: 20,
      });

      this.config3 = this.initNum(17695298, "", {
        fontSize: 20,
      });

      this.config4 = this.initNum(5684721, "", {
        fontSize: 20,
      });

      this.config5 = this.initNum(9123938, "", {
        fontSize: 40,
      });

      this.config7 = this.initNum(1284242, "", {
        fontSize: 20,
      });

      this.config8 = this.initNum(1789233, "", {
        fontSize: 20,
      });

      this.config9 = this.initNum(4812344, "", {
        fontSize: 20,
      });

      this.config10 = this.initNum(1238119, "", {
        fontSize: 20,
      });


      this.config6 = {
        number: [0.48],
        toFixed: 2,
        content: "{nt}%",
        style: {
          fontSize: 20,
        },
      };
    },
    configReset() {
      this.config = this.initNum(0, "个", {
        fontSize: 40,
      });

      this.config1 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config2 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config3 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config4 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config5 = this.initNum(0, "", {
        fontSize: 40,
      });

      this.config7 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config8 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config9 = this.initNum(0, "", {
        fontSize: 20,
      });

      this.config10 = this.initNum(0, "", {
        fontSize: 20,
      });
      this.config6 = {
        number: [0],
        toFixed: 2,
        content: "{nt}%",
        style: {
          fontSize: 20,
        },
      };
    },
    initNum(number, type = "", style = {}) {
      return {
        number: [number],
        content: "{nt}" + type,
        style,
        formatter: (number) => {
          const numbers = number.toString().split("").reverse();
          const segs = [];

          while (numbers.length) segs.push(numbers.splice(0, 3).join(""));

          return segs.join(",").split("").reverse().join("");
        },
      };
    },
    changeEcharts() {
      this.flag = !this.flag;
      this.resetChart()
    },
    resetChart() {
      this.myChart.clear();
      if (this.flag) {
        this.echartsPie();
      } else {
        this.echartsBar();
      }
    },
    initEcharts() {
      this.echartsBar();
    },
    echartsPie() {
      var option;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("main"));
      option = {
        title: {
          text: "",
          subtext: "",
          left: "center",
          show: false,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          show: false,
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: this.regionData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.8)",
              },
            },
          },
        ],
      };

      option && this.myChart.setOption(option);
    },
    echartsBar() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("main"));

      // 类别
      var total = 1000; // 数据总数
      var datas = [];
      this.regionData.forEach((value) => {
        datas.push(value.value);
      });
      var option = {
        // backgroundColor: 'rgba(0,0,0,.5)',
        xAxis: {
          max: total,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              // width: 8, //这里是为了突出显示加上的
            },
          },
          axisLabel: {
            show: true,
            itemStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: true,
          },
        },
        grid: {
          left: 80,
          top: 20, // 设置条形图的边距
          right: 80,
          bottom: 20,
        },
        yAxis: [
          {
            type: "category",
            inverse: false,
            data: this.regionData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        series: [
          {
            // 内
            type: "bar",
            barWidth: 18,

            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                color: function (params) {
                  var color;
                  if (params.dataIndex == 19) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#EB5118", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#F21F02", // 100% 处的颜色
                        },
                      ],
                    };
                  } else if (params.dataIndex == 18) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FFA048", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#B25E14", // 100% 处的颜色
                        },
                      ],
                    };
                  } else if (params.dataIndex == 17) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#F8E972", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#E5C206", // 100% 处的颜色
                        },
                      ],
                    };
                  } else {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#1588D1", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0F4071", // 100% 处的颜色
                        },
                      ],
                    };
                  }
                  return color;
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: "left",
                formatter: "{b}",
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                },
              },
            },
            data: this.regionData,
            z: 1,
            animationEasing: "elasticOut",
          },
          {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#061348",
              },
            },
            symbolRepeat: "fixed",
            symbolMargin: 6,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [1, 21],
            symbolPosition: "start",
            symbolOffset: [1, -1],
            symbolBoundingData: this.total,
            data: this.regionData,
            z: 2,
            animationEasing: "elasticOut",
          },
          {
            // 外边框
            type: "pictorialBar",
            symbol: "rect",
            symbolBoundingData: total,
            itemStyle: {
              normal: {
                color: "none",
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  var text;
                  if (params.dataIndex == 1) {
                    console.log(params.data);
                    // text = "{a|  100%}{f|  " + params.data + "}";
                    text = "{a|  }{f|  " + params.data + "}";
                  } else if (params.dataIndex == 2) {
                    text = "{b|  }{f|  " + params.data + "}";
                  } else if (params.dataIndex == 3) {
                    text = "{c|  }{f|  " + params.data + "}";
                  } else {
                    text = "{d|  }{f|  " + params.data + "}";
                  }
                  return text;
                },
                rich: {
                  a: {
                    color: "red",
                  },
                  b: {
                    color: "blue",
                  },
                  c: {
                    color: "yellow",
                  },
                  d: {
                    color: "green",
                  },
                  f: {
                    color: "#ffffff",
                  },
                },
                position: "right",
                distance: 0, // 向右偏移位置
                show: true,
              },
            },
            data: datas,
            z: 0,
            animationEasing: "elasticOut",
          },
          {
            name: "外框",
            type: "bar",
            barGap: "-120%", // 设置外框粗细
            data: [
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
            ],
            barWidth: 25,
            itemStyle: {
              normal: {
                color: "transparent", // 填充色
                barBorderColor: "#1C4B8E", // 边框色
                barBorderWidth: 1, // 边框宽度
                // barBorderRadius: 0, //圆角半径
                label: {
                  // 标签显示位置
                  show: false,
                  position: "top", // insideTop 或者横向的 insideLeft
                },
              },
            },
            z: 0,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    itemClick(index) {
      this.active = index;
      this.cActive = 0;
    },
    cItemClick(index) {
      this.cActive = index;
      let data = []

      switch (this.cActive) {
        case 0:
          this.regionData = chartData.region
          break;
        case 1:
          chartData.region.forEach(item =>{
            data.push({
              ...item,
              value: item.sheng
            })
          })
          this.regionData = data
          break
        case 2:
          chartData.region.forEach(item =>{
            data.push({
              ...item,
              value: item.shi
            })
          })
          this.regionData = data
          break
        case 3:
          chartData.region.forEach(item =>{
            data.push({
              ...item,
              value: item.xian
            })
          })
          this.regionData = data
          break
        case 4:
          chartData.region.forEach(item =>{
            data.push({
              ...item,
              value: item.xiang
            })
          })
          this.regionData = data
          break
        default:
          this.regionData = chartData.region
          break;
      }
      this.resetChart()
    },
  },
};
</script>

<style lang="scss" scoped>

.container-hide {
  transition: width 2s ease-out, opacity 1s ease-in, visibility 1s ease-in;
  width: 0;
  height: "80%";
  visibility: 0;
  opacity: 0;
}
.container-show {
  // 这是滑入状态
  transition: width 1s ease-out, opacity 2s ease-in, visibility 2s ease-in;
  opacity: 1;
  visibility: 1;
  width: 25%;
}
// 左侧
.left-container {
  position: absolute;
  left: 10px;
  top: 120px;
  height: 70%;
  z-index: 999;
  .left-top {
    height: 35%;
  }
  .left-bottom {
    margin-top: 20px;
    height: 65%;
  }
  .left-top_container {
    margin: 20px 30px 10px 30px;
    display: flex;
    align-items: center;
    .tab-item {
      padding: 5px 30px;
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;
      color: #409eff;
      background: #ecf5ff;
      border: 1px solid #b3d8ff;
    }
    .active {
      color: #fff;
      border: 1px solid #409eff;
      background: #409eff;
    }
  }
  .left-content_container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 30px;
    // height: 132px;
    max-height: 132px;
    overflow: auto;
    .c-item {
      padding: 5px 30px;
      border-radius: 5px;
      margin: 5px 0;
      margin-right: 10px;
      cursor: pointer;
      color: #409eff;
      background: #ecf5ff;
      border: 1px solid #409eff;
    }
    .c-item_t {
      flex: 30%;
      text-align: center;
    }
    .active {
      color: #fff;
      border: 1px solid #409eff;
      background: #409eff;
    }
  }
}
// 右侧
.right-container {
  position: absolute;
  right: 10px;
  top: 120px;
  height: 70%;
  z-index: 99;
  .right-top {
    height: 45%;
    width: 100%;
  }
  .right-bottom {
    margin-top: 20px;
    height: 55%;
    width: 100%;
  }
}
.city-num {
  display: flex;
  justify-content: center;
}

.title {
  height: 40px;
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 10px 20px 0 30px;
    color: #fff;
  }
}
.content-container {
  height: 75%;
  color: #bde0ff;
  margin: 0;
  margin-top: 14px;
  padding: 3px 20px;
  // border-radius: 50px;
  background: rgba(9, 47, 93, 0.8);
}
#main {
  margin-top: 20px;
  background: rgba(9, 47, 93, 0.8);
  border-radius: 20px;
}
.echarts {
  height: 86%;
  width: 100%;
}

.detail-dialog {
  height: 60%;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  .detailForm {
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96%;
    height: 87%;
    color: #b6d3f3;
    background: rgba(9, 47, 93, 0.8);
    font-size: 30px;
    font-weight: 600;
  }
  h3 {
    margin: 0;
    text-indent: 20px;
    padding: 10px;
    font-size: 26px;
  }
  .btns {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}

/deep/.el-form-item__label {
  font-size: 18px;
  text-indent: 30px;
  color: #b6d3f3 !important;
}
/deep/.el-form-item__content {
  font-size: 16px;
}
/deep/.el-form-item {
  margin-bottom: 0;
}
.left-content_container::-webkit-scrollbar {
  width: 5px;
}
.left-content_container::-webkit-scrollbar-track {
  background-color: #12223d;
  -webkit-border-radius: 2px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.left-content_container::-webkit-scrollbar-thumb {
  background-color: #409eff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.dv-loading {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 9999;
}
</style>