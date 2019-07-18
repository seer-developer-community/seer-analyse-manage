<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-group"></i> 用户信息 PLUS / 基础信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="issuer" placeholder="账户ID" class="handle-input mr10"></el-input>
        <el-input v-model="name" placeholder="账户名" class="handle-input mr10"></el-input>展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="base-table-expand">
              <el-form-item label="推荐人手续费分成百分比">
                <span>{{ props.row.referrerPercent }}</span>
              </el-form-item>
              <el-form-item label="手续费总耗">
                <span>{{ props.row.totalFees }}</span>
              </el-form-item>
              <el-form-item label="已领取水龙头收入">
                <span>{{ props.row.claimedFaucetProfit }}</span>
              </el-form-item>
              <el-form-item label="已领取手续费分成">
                <span>{{ props.row.claimedFeesProfit }}</span>
              </el-form-item>
              <el-form-item label="最近投注时间">
                <span v-if="props.row.recentPlayTime === 0">暂无投注</span>
                <span v-else>{{ props.row.recentPlayTime | fromatterTime }}</span>
              </el-form-item>
              <!-- <el-form-item label="注册时间">
                <span>{{ props.row.regTime | fromatterTime }}</span>
              </el-form-item> -->
              <el-form-item label="推荐人">
                <span>{{ props.row.referrer }}</span>
              </el-form-item>
              <el-form-item label="注册人">
                <span>{{ props.row.registrar }}</span>
              </el-form-item>
              <el-form-item label="是否为投注用户">
                <span>{{ props.row.isPlayer | formatterIs}}</span>
              </el-form-item>
              <el-form-item label="是否为机器人">
                <span>{{ props.row.isSeerbot | formatterIs}}</span>
              </el-form-item>
              <!-- <el-form-item label="累计注册用户">
                <span>{{ props.row.registered }}</span>
              </el-form-item>
              <el-form-item label="累积投注次数">
                <span>{{ props.row.accountPrtpCount }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="账户ID" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="账户名" align="center" sortable></el-table-column>
        <el-table-column prop="showPrtpAmount" label="投注金额" align="center" sortable></el-table-column>
        <el-table-column prop="showTransfer" label="转账支出" align="center" sortable></el-table-column>
        <el-table-column prop="registered" label="累计注册用户" align="center" sortable></el-table-column>
        <el-table-column prop="accountPrtpCount" label="累积投注次数" align="center" sortable></el-table-column>
        <!-- <el-table-column label="投注金额" align="center">
          <el-table-column v-for="col in cols" :label="col.name" :key="col.name" align="center">
            <template slot-scope="scope">{{scope.row['prtp.'+col.name]}}</template>
          </el-table-column>
          <template v-if="isShow">暂无可显示的资产</template>
        </el-table-column>
        <el-table-column label="转账支出" align="center">
          <el-table-column v-for="col in cols" :label="col.name" :key="col.name" align="center">
            <template slot-scope="scope">{{scope.row['transfer.'+col.name]}}</template>
          </el-table-column>
          <template v-if="isShow">暂无可显示的资产</template>
        </el-table-column>-->
        <el-table-column
          prop="regTime"
          label="注册时间"
          :formatter="formatter"
          align="center"
          sortable
        ></el-table-column>
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
import { basePage } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "accountbase",
  data () {
    return {
      tableData: [],
      issuer: "",
      name: "",
      page: {
        total: 0,
        size: 10,
        current: 1
      },
      cols: [],
      isShow: false,
      asset: "",
      showAssetLabel: "DAPP补贴",
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
    },
    formatterIs: function (value) {
      if (value === 0) {
        return "否";
      } else {
        return "是";
      }
    }
  },
  methods: {
    f5 () {
      this.issuer = "";
      this.name = "";
      this.page.size = 10;
      this.page.current = 1;
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
        issuer: this.issuer,
        name: this.name,
        asset: this.asset
      };
      basePage(params).then(
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
    formatter (row, column) {
      return moment.unix(row.updateTime / 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    formatterIsPlayer (row, column) {
      if (row.isPlayer === 0) {
        return "否";
      } else {
        return "是";
      }
    },
    formatterIsBot (row, column) {
      if (row.isSeerbot === 0) {
        return "否";
      } else {
        return "是";
      }
    }
  }
};
</script>

<style>
.base-table-expand {
  font-size: 0;
}
.base-table-expand label {
  width: 250px;
  color: blue;
}
.base-table-expand .el-form-item {
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
</style>
