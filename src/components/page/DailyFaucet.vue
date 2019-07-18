<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 每日总体指标 PLUS / 水龙头账户统计
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-date-picker
          v-model="times"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
          class="mr30"
        ></el-date-picker>-->
        <el-date-picker
          v-model="times"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="mr10"
        ></el-date-picker>展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>
        <!-- <el-radio-group v-model="showModel" class="mr30" @change="selectAsset">
          <el-radio :label="1" border>展示指定的资产</el-radio>
          <el-radio :label="2" border>展示全部</el-radio>
        </el-radio-group>-->
        <!-- <el-input
          v-model="asset"
          placeholder="要显示的资产ID"
          class="handle-input mr10"
          :disabled="!isSelectAsset"
        ></el-input>-->
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
        <el-button type="primary" @click="downExcel">导出EXCEL</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="register-table-expand">
              <el-form-item label="新增注册用户">
                <span>{{ props.row.dailyRegistered }}</span>
              </el-form-item>
              <el-form-item label="累计注册用户">
                <span>{{ props.row.totalRegistered }}</span>
              </el-form-item>
              <el-form-item label="新增注册且投注用户数">
                <span>{{ props.row.dailyTrueplayers }}</span>
              </el-form-item>
              <el-form-item label="新增投注用户">
                <span>{{ props.row.dailyPlayers }}</span>
              </el-form-item>
              <el-form-item label="累计投注用户">
                <span>{{ props.row.totalPlayers }}</span>
              </el-form-item>
              <el-form-item label="活跃投注用户">
                <span>{{ props.row.totalActivePlayer }}</span>
              </el-form-item>
              <el-form-item label="累计DAPP注册用户支出">
                <span>{{ props.row.totalRegisteredFees }}</span>
              </el-form-item>
              <el-form-item label="DAPP注册用户支出">
                <span>{{ props.row.registeredFees }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | fromatterTime}}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime | fromatterTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="日期" width="120" align="center" sortable></el-table-column>
        <el-table-column
          prop="dailyDepositCount"
          label="充值笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="充值笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">充值笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyDepositCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalTransferCountFees"
          label="累计DAPP新注册用户转账支出"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="累计DAPP新注册用户转账支出"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计DAPP新注册用户转账支出</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalTransferCountFeesList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalDepositCount"
          label="累计充值笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计充值笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计充值笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalDepositCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyDepositAmount"
          label="充值额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="充值额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">充值额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyDepositAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalDepositAmount"
          label="累计充值额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计充值额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计充值额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalDepositAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyTransferCount"
          label="转账笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="转账笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">转账笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyTransferCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalTransferCount"
          label="累计转账笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计转账笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计转账笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalTransferCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyTransferAmount"
          label="转账额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="转账额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">转账额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyTransferAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalTransferAmount"
          label="累计转账额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计转账额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计转账额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalTransferAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="transferCountFees"
          label="DAPP新注册用户转账支出"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="DAPP新注册用户转账支出"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">DAPP新注册用户转账支出</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.transferCountFeesList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10,,50, 100, 300]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { dailyFaucet, exportDailyFaucet } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "dailyroom",
  data() {
    return {
      tableData: [],
      asset: "1.3.0",
      times: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      showModel: 1,
      isSelectAsset: true,
      asset: "",
      defaultAsset: ""
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {}
  },
  filters: {
    fromatterTime: function(value) {
      if (!value) return "";
      return moment.unix(value / 1000).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    downExcel() {
      if (this.times === "") {
        this.$message.error("请选择要导出的日期");
        return;
      }
      var params = {
        beginTime: this.times[0],
        endTime: this.times[1],
        asset: this.asset
      };
      exportDailyFaucet(params).then(
        data => {
          var filename = data.headers["content-disposition"];
          filename = filename.split("=")[1];
          filename = decodeURIComponent(filename, "utf-8");
          const blob = new Blob([data.data]);
          let url = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        },
        error => {
          console.log(error);
          this.$message.error("下载异常，请稍后再试");
        }
      );
    },
    selectAsset(var1) {
      //开启选择资产
      if (var1 === 1) {
        this.isSelectAsset = true;
      } else {
        this.isSelectAsset = false;
      }
    },
    f5() {
      this.asset = "1.3.0";
      this.times = "";
      this.page.current = 1;
      this.page.size = 10;
      this.asset = this.defaultAsset;
      this.getData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getData();
    },
    getData() {
      // if (this.asset == "" && this.isSelectAsset) {
      //   this.$message.error("请输入需要显示的资产ID");
      //   return;
      // }
      var params = {
        current: this.page.current,
        size: this.page.size,
        asset: this.asset,
        times: this.times
      };
      dailyFaucet(params).then(
        data => {
          var result = data.data;
          if (200 == result.code) {
            this.tableData = result.data.records;
            this.page.current = result.data.current;
            this.page.size = result.data.size;
            this.page.total = result.data.total;
            if (this.defaultAsset === "") {
              this.defaultAsset = result.data.asset;
            }
            this.asset = result.data.asset;
          }
        },
        error => {
          console.log(error);
          this.$message.error("服务器连接失败");
        }
      );
    },
    formatter(row, column) {
      return moment.unix(row.updateTime / 1000).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style>
.register-table-expand {
  font-size: 0;
}
.register-table-expand label {
  width: 250px;
  color: blue;
}
.register-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 150px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.mr30 {
  margin-right: 30px;
}
</style>
