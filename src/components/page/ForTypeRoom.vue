<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 分类型房间每日指标
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
        <el-table-column prop="pvpProfit" label="pvp抽成收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvpProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvpProfit" label="累计pvp抽成收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvpProfitShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvpPlayAmount" label="PVP投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvpPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvpPlayAmount" label="累计PVP投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvpPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvpSettle" label="PVP派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvpSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvpSettle" label="累计PVP派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvpSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvpFees" label="PVP房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvpFees" label="累计PVP房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvpPrtpFees" label="PVP房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvpPrtpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvpPrtpFees" label="累计PVP房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvpPrtpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvdPlayAmount" label="PVD投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvdPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvdSettle" label="PVD派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvdSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvdPlayAmount" label="累计PVD投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvdPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvdSettle" label="累计PVD派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvdSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvdFees" label="PVD房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvdFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvdFees" label="累计PVD房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvdFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pvdPrtpFees" label="PVD房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.pvdPrtpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPvdPrtpFees" label="累计PVD房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPvdPrtpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advPlayAmount" label="高级投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.advPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAdvPlayAmount" label="累计高级投注总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalAdvPlayAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advSettle" label="高级派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.advSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAdvSettle" label="累计高级派奖总额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalAdvSettleShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advFees" label="高级房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.advFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAdvFees" label="累计高级房间手续费" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalAdvFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advPrtpFees" label="高级房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.advPrtpFeesShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAdvPrtpFees" label="累计高级房间手续费收入" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalAdvPrtpFeesShow}}</span>
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
import { typeRoom, exportTypeRoom } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "userTransaction",
  data () {
    return {
      tableData: [],
      asset: "1.3.0",
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
      exportTypeRoom(params).then(
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
      this.asset = "1.3.0";
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
      typeRoom(params).then(
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
