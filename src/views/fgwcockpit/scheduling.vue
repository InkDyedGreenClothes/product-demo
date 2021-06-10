<template>
  <div class="scheduling">
    <!-- 左侧 -->
    <!-- 
        'container-hide': !centerShow,
        'container-show': centerShow, -->
    <div
      :class="{
        'left-container': true,
      }"
    >
      <div class="left-top">
        <dv-border-box-10>
          <div class="title">
            <h3>申请单管理</h3>
            <div style="margin: 10px 20px 0 30px"></div>
          </div>
          <div class="left-top_container">
            <div
              :class="{ 'tab-item': true, active: singleInd == 0 }"
              @click="handleSingle(0)"
            >
              接收申请
            </div>
            <div
              :class="{ 'tab-item': true, active: singleInd == 1 }"
              @click="handleSingle(1)"
            >
              发出申请
            </div>
          </div>

          <el-table
            :data="tableData"
            style="width: 96%; margin: 20px auto 0 auto"
            max-height="260px"
            border
            @row-click="rowClick(false, '申请单详情')"
          >
            <el-table-column
              prop="name"
              label="单位"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="物资件数"
              align="center"
              width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="contact"
              label="接收时间"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </dv-border-box-10>
      </div>
      <div class="left-bottom">
        <dv-border-box-10>
          <div class="title">
            <h3>调拨追踪</h3>
            <div style="margin: 10px 20px 0 30px"></div>
          </div>
          <div class="left-top_container">
            <div
              :class="{ 'tab-item': true, active: singleInd1 == 0 }"
              @click="handleSingle1(0)"
            >
              接收调拨
            </div>
            <div
              :class="{ 'tab-item': true, active: singleInd1 == 1 }"
              @click="handleSingle1(1)"
            >
              发出调拨
            </div>
          </div>

          <el-table
            :data="tableData"
            style="width: 96%; margin: 20px auto 0 auto"
            max-height="260px"
            border
            @row-click="rowClick1(true, '调拨单详情')"
          >
            <el-table-column
              prop="name"
              label="单位"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="物资件数"
              align="center"
              width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="contact"
              label="接收时间"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
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
            <h3>{{ rightTitle }}</h3>
            <div style="margin: 10px 20px 0 30px"></div>
          </div>
          <!-- 内容 -->
          <div class="content-container">
            <el-steps
              direction="vertical"
              :active="0"
              style="margin-left: 230px"
            >
              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">5</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 22:02:00</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">物资入库</h3>
                  <h3 style="margin-left: 20px">操作人：邵琦</h3>
                </template>
              </el-step>

              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">4</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 23:55:06</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">物资发车</h3>
                  <h3 style="margin-left: 20px">操作人：米彩色</h3>
                </template>
              </el-step>
              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">3</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 23:20:50</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">物资装车</h3>
                  <h3 style="margin-left: 20px">操作人：程世勇</h3>
                </template>
              </el-step>

              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">3</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 22:30:50</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">仓库货物准备</h3>
                  <h3 style="margin-left: 20px">操作人：陈克</h3>
                </template>
              </el-step>

              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">2</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 22:20:03</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">调度审批</h3>
                  <h3 style="margin-left: 20px">操作人：钱立遥</h3>
                </template>
              </el-step>

              <el-step title="步骤 1">
                <template slot="icon">
                  <span class="unActive">1</span>
                </template>
                <template slot="title">
                  <span class="steps-title">2021-06-05 22:02:00</span>
                </template>
                <template slot="description">
                  <h3 style="margin-top: 0; margin-left: 20px">申请调度</h3>
                  <h3 style="margin-left: 20px">操作人：王鹏飞</h3>
                </template>
              </el-step>
            </el-steps>
          </div>
        </dv-border-box-10>
      </div>
    </div>

    <div
      :class="{
        'right-container1': true,
        'container-hide': !centerShow1,
        'container-show1': centerShow1,
      }"
    >
      <dv-border-box-10>
        <div class="title">
          <h3>{{ rightTitle }}</h3>
          <div style="margin: 10px 20px 0 30px"></div>
        </div>
        <!-- 内容 -->
        <div class="content-container">
          <div class="text-item">
            <div class="title">申请编号</div>
            <div>CD20210504000009</div>
          </div>
          <div class="text-item">
            <div class="title">物资信息</div>
            <div>棉被   100 </div>
          </div>
          <div class="text-item">
            <div class="title">车辆信息</div>
            <div>等待物流系统接入</div>
          </div>
          <div class="text-item">
            <div class="title">运输人员</div>
            <div>等待物流系统接入</div>
          </div>
          <div class="text-item">
            <div class="title">预计抵达时间</div>
            <div>等待物流系统接入</div>
          </div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
export default {
  name: "scheduling",
  data() {
    return {
      centerShow1: false,
      transfersShow: true,
      rightTitle: "申请单详情",
      centerShow: false,
      singleInd: 0,
      singleInd1: 0,
      tableData: [
        {
          name: "杭州市富阳区民政救助站",
          num: "600",
          contact: "2021-06-04 10:32",
        },
        {
          name: "衢江区应急仓库",
          num: "2",
          contact: "2021-06-05 10:22",
        },
        {
          name: "建德市救灾物资储备库",
          num: "2",
          contact: "2021-06-05 10:22",
        },
        {
          name: "衢江区应急仓库",
          num: "30",
          contact: "2021-06-06 13:22",
        },
      ],
    };
  },
  methods: {
    rowClick(flag, title) {
      this.centerShow = false;
      this.centerShow1 = true;
      this.transfersShow = flag;
      this.rightTitle = title;
    },
    rowClick1(flag, title) {
      this.centerShow1 = false;
      this.centerShow = true;
      this.transfersShow = flag;
      this.rightTitle = title;
      this.$emit("start");
    },
    handleSingle(index) {
      this.singleInd = index;
    },
    handleSingle1(index) {
      this.singleInd1 = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-hide {
  transition: width 2s ease-out, opacity 1s ease-in, visibility 1s ease-in;
  width: 0;
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
/deep/.el-step__title.is-process {
  color: #fff;
}
/deep/.el-step__description.is-process {
  color: #fff;
}

.steps-title {
  position: absolute;
  left: -182px;
  display: block;
  width: 170px;
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
  height: 90%;
  color: #bde0ff;
  margin: 0;
  margin-top: 14px;
  padding: 3px 20px;
  // border-radius: 50px;
  background: rgba(9, 47, 93, 0.8);
}
.left-top_container {
  margin: 20px 30px 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .tab-item {
    flex: 1;
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
// 左侧
.left-container {
  position: absolute;
  left: 10px;
  top: 120px;
  height: 70%;
  z-index: 999;
  width: 25%;

  .left-top {
    height: 50%;
  }
  .left-bottom {
    margin-top: 20px;
    height: 50%;
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
      color: #67c23a;
      background: #ecf5ff;
      border: 1px solid #67c23a;
    }
    .c-item_t {
      flex: 30%;
      text-align: center;
    }
    .active {
      color: #fff;
      border: 1px solid #67c23a;
      background: #67c23a;
    }
  }
}
.container-hide {
  transition: width 2s ease-out, opacity 1s ease-in, visibility 1s ease-in;
  width: 0;
  visibility: 0;
  opacity: 0;
}
.container-show {
  // 这是滑入状态
  transition: width 1s ease-out, opacity 2s ease-in, visibility 2s ease-in;
  opacity: 1;
  visibility: 1;
  width: 28%;
}
.container-show1 {
  // 这是滑入状态
  transition: width 1s ease-out, opacity 2s ease-in, visibility 2s ease-in;
  opacity: 1;
  visibility: 1;
  width: 25%;
}

// 右侧
.right-container {
  position: absolute;
  right: 10px;
  top: 120px;
  height: 72%;
  z-index: 99;
  .right-top {
    height: 100%;
    width: 100%;
  }
  .right-top1 {
    height: 100%;
    width: 100%;
  }
}
.right-container1 {
  position: absolute;
  right: 10px;
  top: 120px;
  height: 32%;
  z-index: 99;

  .content-container {
    height: 80%;
    color: #bde0ff;
    margin: 0;
    margin-top: 14px;
    padding: 3px 20px;
    // border-radius: 50px;
    background: rgba(9, 47, 93, 0.8);
    .text-item {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        flex: 2;
        text-align: center;
        padding: 8px 20px;
      }
      .title {
        flex: 1;
        color: #51ffff;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .right-top {
    height: 80%;
    width: 100%;
  }
  .right-top1 {
    height: 100%;
    width: 100%;
  }
}
/deep/.el-table th {
  background: rgba(9, 47, 93, 0.8);
  color: #fff;
}
/deep/.el-table tr {
  cursor: pointer;
  background: rgba(9, 47, 93, 0.8);
  color: #fff;
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(9, 47, 93, 0.8) !important;
}
</style>