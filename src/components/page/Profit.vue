<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 收益每日指标
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
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
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
        <el-button type="primary" @click="downExcel">导出EXCEL</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="time" label="日期" align="center" sortable></el-table-column>
        <el-table-column prop="dappProfit" label="Dapp收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.dappProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalDappProfit" label="累计dapp收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalDappProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="faucetProfit" label="DAPP水龙头收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.faucetProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFaucetProfit" label="累计DAPP水龙头收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalFaucetProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="feesProfit" label="手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.feesProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFeesProfit" label="累计手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalFeesProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dailySubsidy" label="dapp补贴" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.dailySubsidyShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalSubsidy" label="累计dapp补贴" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalSubsidyShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountBotprtpAmount" label="机器人总体支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.accountBotprtpAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAccountBotprtpAmount" label="累计机器人总体支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalAccountBotprtpAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roomprtpAmount" label="DAPP所有房间收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.roomprtpAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalRoomprtpAmount" label="累计DAPP所有房间收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalRoomprtpAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roomprtpSettle" label="DAPP所有房间支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.roomprtpSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalRoomprtpSettle" label="累计DAPP所有房间支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalRoomprtpSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="registeredFees" label="DAPP注册用户支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.registeredFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalRegisteredFees" label="累计DAPP注册用户支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalRegisteredFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transferCountFees" label="DAPP新注册用户转账支出" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.transferCountFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalTransferCountFees"
          label="累计DAPP新注册用户转账支出"
          align="center"
          sortable
        >
          <template slot-scope="props">
            <span>{{props.row.totalTransferCountFeesShow}}</span>
          </template>
        </el-table-column>
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
import { dailyProfit, exportDailyProfit } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "userTransaction",
  data () {
    return {
      tableData: [],
      times: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      asset: "",
      defaultAsset: ""
    };
  },
  created () {
    this.getData();
  },
  computed: {
    data () { }
  },
  filters: {
    fromatterTime: function (value) {
      if (!value) return "";
      return moment.unix(value / 1000).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    downExcel () {
      if (this.times === "") {
        this.$message.error("请选择要导出的日期");
        return;
      }
      var params = {
        beginTime: this.times[0],
        endTime: this.times[1],
        asset: this.asset
      };
      exportDailyProfit(params).then(
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
    f5 () {
      this.times = "";
      this.page.current = 1;
      this.page.size = 10;
      this.asset = this.defaultAsset;
      this.getData();
    },
    handleSizeChange (val) {
      this.page.size = val;
      this.getData();
    },
    handleCurrentChange (val) {
      this.page.current = val;
      this.getData();
    },
    getData () {
      var params = {
        current: this.page.current,
        size: this.page.size,
        asset: this.asset,
        times: this.times
      };
      dailyProfit(params).then(
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
    formatter (row, column) {
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
