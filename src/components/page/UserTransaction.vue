<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 用户和交易每日指标
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
        <el-table-column prop="dailyRegistered" label="新增注册用户" align="center" sortable></el-table-column>
        <el-table-column prop="totalRegistered" label="累计注册用户" align="center" sortable></el-table-column>
        <el-table-column prop="dailyTrueplayers" label="新增注册且投注用户数" align="center" sortable></el-table-column>
        <el-table-column prop="dailyPlayers" label="新增投注用户" align="center" sortable></el-table-column>
        <el-table-column prop="totalPlayers" label="累计投注用户" align="center" sortable></el-table-column>
        <el-table-column prop="totalActivePlayer" label="活跃投注用户" align="center" sortable></el-table-column>
        <el-table-column prop="dailyDepositCount" label="充值笔数" align="center" sortable></el-table-column>
        <el-table-column prop="totalDepositCount" label="累计充值笔数" align="center" sortable></el-table-column>
        <el-table-column prop="dailyDepositAmount" label="充值额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.dailyDepositAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalDepositAmount" label="累计充值额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalDepositAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dailyTransferCount" label="转账笔数" align="center" sortable></el-table-column>
        <el-table-column prop="totalTransferCount" label="累计转账笔数" align="center" sortable></el-table-column>
        <el-table-column prop="dailyTransferAmount" label="转账额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.dailyTransferAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalTransferAmount" label="累计转账额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalTransferAmountShow}}</span>
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
import { userTx, exportUserTx } from "../../api/api";
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
      exportUserTx(params).then(
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
      userTx(params).then(
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
