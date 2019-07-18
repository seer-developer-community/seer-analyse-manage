<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-group"></i> 每日用户数据
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="issuer" placeholder="用户id" class="handle-input mr10" clearable></el-input>
        <el-input v-model="name" placeholder="用户名" class="handle-input mr10" clearable></el-input>
        <!-- <el-date-picker
          v-model="times"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
          class="mr10"
        ></el-date-picker>-->
        <el-date-picker
          v-model="times"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="mr10"
        ></el-date-picker>
        <el-select v-model="grepValue" clearable placeholder="过滤是否机器人" class="mr10">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
        <el-button type="primary" @click="downExcel">导出EXCEL</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="time" label="日期" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="用户名" align="center" sortable></el-table-column>
        <el-table-column prop="issuer" label="用户ID" align="center" sortable></el-table-column>
        <el-table-column prop="dailyPrtpCount" label="投注次数" align="center" sortable></el-table-column>
        <!--投注额-->
        <el-table-column prop="showAsset" :label="showAssetLabel" align="center" sortable></el-table-column>
        <el-table-column prop="dailyFee" label="手续费" align="center" sortable></el-table-column>
        <el-table-column prop="dailyProfit" label="DAPP收入" align="center" sortable></el-table-column>
        <!-- <el-table-column prop="bot" label="是否为机器人" align="center"></el-table-column> -->
        <!-- <el-table-column label="投注额" align="center">
          <el-table-column
            v-for="col in cols"
            :label="col.name"
            :key="col.name"
            align="center"
          >
            <template slot-scope="scope">{{scope.row[col.name]}}</template>
          </el-table-column>
          <template v-if="isShow">暂无可显示的资产</template>
        </el-table-column>-->
        <el-table-column
          prop="updateTime"
          label="更新时间"
          :formatter="formatter"
          align="center"
          sortable
        ></el-table-column>
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
import { dailyUser, exportDailyUser } from "../../api/api";
import { truncate } from "fs";
import { log } from "util";
export default {
  name: "dailyuser",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "机器人"
        },
        {
          value: "0",
          label: "非机器人"
        }
      ],
      tableData: [],
      issuer: "",
      name: "",
      times: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      cols: [],
      isShow: false,
      grepValue: "",
      asset: "",
      showAssetLabel: "投注额",
      defaultAsset: ""
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {}
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
        asset: this.asset,
        grepBot: this.grepValue,
        issuer: this.issuer,
        name: this.name
      };
      exportDailyUser(params).then(
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
    f5() {
      this.issuer = "";
      this.name = "";
      this.times = "";
      this.page.size = 10;
      this.grepValue = "";
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
      var params = {
        current: this.page.current,
        size: this.page.size,
        issuer: this.issuer,
        name: this.name,
        times: this.times,
        asset: this.asset,
        grepBot: this.grepValue
      };
      dailyUser(params).then(
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
            this.showAssetLabel = this.asset + " 投注额";
            if (result.data.cols.length !== 0) {
              this.cols = result.data.cols;
            } else {
              this.isShow = true;
            }
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

<style scoped>
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
</style>
