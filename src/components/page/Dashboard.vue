<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:152px;">
          <div class="user-info">
            <img src="../../assets/img/admin.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <!-- <div class="user-info-list">本次登录时间：<span>2018-01-01 12:12:56</span></div> -->
          <!-- <div class="user-info-list">
            本次登录终端：
            <span>web网页端</span>
          </div>
          <div class="user-info-list">
            本次登录方式：
            <span>账号密码登陆</span>
          </div>-->
        </el-card>
        <el-card shadow="hover" style="height:370px;">
          <div slot="header" class="clearfix">
            <span>区块扫描情况</span>
          </div>
          <div style="margin-bottom:8px">区块高度 -- {{currentBlock}} / {{lastBlock}}</div>
          <el-progress :percentage="point" :stroke-width="18" :text-inside="true"></el-progress>
          <div style="margin-top:15px">
            区块扫描状态：
            <el-radio-group v-model="syncStatus" @change="selectSync">
              <el-radio label="0">开启</el-radio>
              <el-radio label="1">停止</el-radio>
            </el-radio-group>
          </div>
          <div style="margin-top:15px">
            是否保存区块信息：
            <el-radio-group v-model="isSaveBlock" @change="selectSaveBlock">
              <el-radio label="0">保存</el-radio>
              <el-radio label="1">不保存</el-radio>
            </el-radio-group>
          </div>
          <div style="margin-top:15px">
            是否保存交易信息：
            <el-radio-group v-model="isSaveTx" @change="selectSaveTx">
              <el-radio label="0">保存</el-radio>
              <el-radio label="1">不保存</el-radio>
            </el-radio-group>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" style="height:545px;">
          <div slot="header" class="clearfix">
            <span>用户预设参数配置（注：使用ID，请勿使用账户名或资产名；房主账户请不要用平台账户；多个ID时使用英文逗号 ',' 隔开 请勿使用中文逗号）</span>
            <el-button
              style="float: right; padding: 3px 0; font-size:18px;"
              type="text"
              @click="dialogFormVisible = true"
            >编辑</el-button>
          </div>
          <el-table
            :data="todoList"
            :show-header="false"
            height="520"
            style="width: 100%;font-size:14px;"
          >
            <el-table-column>
              <template slot-scope="scope">
                <!-- :class="{'todo-item-del': scope.row.status}" -->
                <div class="todo-item" v-if="scope.row.status===false">
                  {{scope.row.title}}
                  <span
                    style="float: right;margin-right:10px;"
                  >{{scope.row.text}}</span>
                </div>
                <div v-else>
                  {{scope.row.title}}
                  <el-popover
                    placement="top-start"
                    title="机器人账号列表"
                    width="400"
                    trigger="hover"
                    :content="scope.row.text"
                    style="float: right;margin-right:30px;"
                  >
                    <el-button slot="reference">显示更多详情列表</el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="bar" class="schart" canvasId="bar" :data="txs" type="bar" :options="options"></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :data="actives"
            type="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="更新用户配置表"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="水龙头账户">
          <el-input v-model="form.faucet"></el-input>
        </el-form-item>
        <el-form-item label="网关及承兑">
          <el-input v-model="form.gateways"></el-input>
        </el-form-item>
        <el-form-item label="统计资产ID">
          <el-input v-model="form.assets"></el-input>
        </el-form-item>
        <el-form-item label="房主账户">
          <el-input v-model="form.houses"></el-input>
        </el-form-item>
        <el-form-item label="机器人账号列表">
          <el-input v-model="form.seerBots"></el-input>
        </el-form-item>
        <el-form-item label="默认显示的资产">
          <el-input v-model="form.defaultAsset"></el-input>
        </el-form-item>
        <el-form-item label="默认显示的房主账户">
          <el-input v-model="form.defaultOwner"></el-input>
        </el-form-item>
        <el-form-item label="白名单账户（不会被统计）">
          <el-input v-model="form.whiteAccounts"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="updateClick">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  updateConfig,
  getSync,
  userConfig,
  indexInfo,
  updateSync
} from "../../api/api";
import Schart from "vue-schart";
import bus from "../common/bus";
import { truncate } from "fs";
export default {
  name: "dashboard",
  data () {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "水龙头账户",
          text: "",
          status: false
        },
        {
          title: "网关及承兑",
          text: "",
          status: false
        },
        {
          title: "统计资产ID",
          text: "",
          status: false
        },
        {
          title: "房主账户",
          text: "",
          status: false
        },
        {
          title: "机器人账号列表",
          text: "",
          status: true
        },
        {
          title: "默认显示的资产",
          text: "",
          status: false
        },
        {
          title: "默认显示的房主账户",
          text: "",
          status: false
        },
        {
          title: "白名单账户（不会被统计）",
          text: "",
          status: false
        }
      ],
      txs: [
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        }
      ],
      actives: [
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        },
        {
          name: "2019-xx-xx",
          value: 0
        }
      ],
      options: {
        title: "最 近 七 天 的 区 块 操 作 笔 数",
        showValue: true,
        fillColor: "rgb(45, 140, 240)",
        bottomPadding: 30,
        topPadding: 30
      },
      options2: {
        title: "最 近 七 天 用 户 活 跃 趋 势",
        fillColor: "#FC6FA1",
        axisColor: "#008ACD",
        contentColor: "#EEEEEE",
        bgColor: "#F5F8FD",
        bottomPadding: 30,
        topPadding: 30
      },
      timer: "",
      currentBlock: 0,
      lastBlock: 0,
      point: 0,
      syncStatus: "0",
      isSaveBlock: "1",
      isSaveTx: "0",
      dialogFormVisible: false,
      form: {
        seerBots: "",
        faucet: "",
        gateways: "",
        houses: "",
        assets: "",
        defaultAsset: "",
        defaultOwner: "",
        whiteAccounts: ""
      }
    };
  },
  components: {
    Schart
  },
  computed: {
    role () {
      return this.name === "super-admin" ? "超级管理员" : "普通用户";
    }
  },
  created () {
    this.handleListener();
    this.getIndexInfo();
    this.getUserConfig();
    this.syncInfo();
  },
  mounted () {
    this.timer = setInterval(this.getIndexInfo, 3000);
  },
  beforeDestroy () {
    console.log("取消定时");
    clearInterval(this.timer);
  },
  activated () {
    this.handleListener();
  },
  deactivated () {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    cancelUpdate () {
      this.dialogFormVisible = false;
      this.form.faucet = this.todoList[0].text;
      this.form.gateways = this.todoList[1].text;
      this.form.assets = this.todoList[2].text;
      this.form.houses = this.todoList[3].text;
      this.form.seerBots = this.todoList[4].text;
      this.form.defaultAsset = this.todoList[5].text;
      this.form.defaultOwner = this.todoList[6].text;
      this.form.whiteAccounts = this.todoList[7].text;
    },
    updateClick () {
      var that = this;
      this.dialogFormVisible = false;
      updateConfig(this.form).then(
        data => {
          var result = data.data;
          if (result.code == 200) {
            that.getUserConfig();
            this.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            console.log(result.msg);
            that.cancelUpdate();
            this.$message.error(result.msg);
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    syncInfo () {
      getSync().then(
        data => {
          var result = data.data;
          if (result.code == 200) {
            console.log(result);
            this.syncStatus = result.data.status + "";
            this.isSaveBlock = result.data.saveBlock + "";
            this.isSaveTx = result.data.saveTx + "";
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    selectSync (var1) {
      this.syncStatus = var1;
      this.toUpdateSync();
    },
    selectSaveBlock (var1) {

      this.isSaveBlock = var1;
      this.toUpdateSync();
    },
    selectSaveTx (var1) {
      this.isSaveTx = var1;
      this.toUpdateSync();
    },
    toUpdateSync () {
      if (this.isSaveBlock === "0") {
        this.isSaveBlock = "1"
        this.$message({
          message: '请不要保存区块信息，如有疑问请联系管理员',
          type: 'warning'
        });
        return;
      }
      if (this.isSaveTx === "1") {
        this.isSaveTx = "0"
        this.$message({
          message: '务必保存交易信息，如有疑问请联系管理员',
          type: 'warning'
        });
        return;
      }
      var params = {
        saveBlock: this.isSaveBlock,
        saveTx: this.isSaveTx,
        syncStatus: this.syncStatus
      };
      updateSync(params).then(
        data => {
          var result = data.data;
          if (200 == result.code) {
            this.$message({
              message: "更新成功",
              type: "success"
            });
          }
        },
        error => {
          console.log(error);
          this.$message.error("更新失败，稍后再试");
          this.syncStatus = result.data.status;
          this.isSaveBlock = result.data.saveBlock;
          this.isSaveTx = result.data.saveTx;
        }
      );
    },
    getIndexInfo () {
      indexInfo().then(
        data => {
          if (200 == data.data.code) {
            this.point = data.data.data.point;
            this.currentBlock = data.data.data.current;
            this.lastBlock = data.data.data.last;
            this.txs = data.data.data.txs;
            this.actives = data.data.data.actives;
          } else {
            console.log(data.data.msg);
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    getUserConfig () {
      userConfig().then(
        data => {
          if (200 == data.data.code) {
            this.todoList[0].text = data.data.data.faucetAccounts;
            this.form.faucet = data.data.data.faucetAccounts;
            this.todoList[1].text = data.data.data.gateways;
            this.form.gateways = data.data.data.gateways;
            this.todoList[2].text = data.data.data.assets;
            this.form.assets = data.data.data.assets;
            this.todoList[3].text = data.data.data.houses;
            this.form.houses = data.data.data.houses;
            this.todoList[4].text = data.data.data.seerBots;
            this.form.seerBots = data.data.data.seerBots;
            this.todoList[5].text = data.data.data.defaultAsset;
            this.form.defaultAsset = data.data.data.defaultAsset;
            this.todoList[6].text = data.data.data.defaultOwner;
            this.form.defaultOwner = data.data.data.defaultOwner;
            this.todoList[7].text = data.data.data.whiteAccounts;
            this.form.whiteAccounts = data.data.data.whiteAccounts;
          }
        },
        error => {
          console.log(error);
          this.$message.error("服务器连接失败");
        }
      );
    },
    handleListener () {
      bus.$on("collapse", this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
      window.addEventListener("resize", this.renderChart);
    },
    handleBus (msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart () {
      this.$refs.bar.renderChart();
      this.$refs.line.renderChart();
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 16px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
