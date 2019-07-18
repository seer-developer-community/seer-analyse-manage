<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-group"></i> 用户信息 PLUS / 房主累积系列
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="issuer" placeholder="账户ID" class="handle-input mr10"></el-input>
        <el-input v-model="name" placeholder="账户名" class="handle-input mr10"></el-input>
        <!-- <el-radio-group v-model="showModel" class="mr30" @change="selectAsset">
          <el-radio :label="1" border>展示指定的资产</el-radio>
          <el-radio :label="2" border>展示全部</el-radio>
        </el-radio-group>
        <el-input
          v-model="asset"
          placeholder="要显示的资产ID"
          class="handle-input mr10"
          :disabled="!isSelectAsset"
        ></el-input>-->
        展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="register-table-expand">
              <el-form-item label="房主高级手续费收入总额">
                <span>{{ props.row.houseAdvprtpFees }}</span>
              </el-form-item>
              <el-form-item label="房主高级机器人手续费收入总额">
                <span>{{ props.row.houseBotadvprtpFees }}</span>
              </el-form-item>
              <el-form-item label="房主机器人预测手续费">
                <span>{{ props.row.houseSeerbotFees }}</span>
              </el-form-item>
              <el-form-item label="房主总房间数">
                <span>{{ props.row.houseRooms }}</span>
              </el-form-item>
              <el-form-item label="参与过的房间列表">
                <span>{{ props.row.prtpRooms | fromatterList }}</span>
              </el-form-item>
              <el-form-item label="房主有真人参与的房间列表">
                <span>{{ props.row.activeRooms | fromatterList }}</span>
              </el-form-item>
              <el-form-item label="房主房间总参与人数">
                <span>{{ props.row.housePrtpCount }}</span>
              </el-form-item>
              <el-form-item label="房主房间总参与机器人数">
                <span>{{ props.row.houseBotprtpCount }}</span>
              </el-form-item>
              <el-form-item label="房主房间总参与人次">
                <span>{{ props.row.housePrtpTimes }}</span>
              </el-form-item>
              <el-form-item label="房主房间机器人总参与人次">
                <span>{{ props.row.houseBotprtpTimes }}</span>
              </el-form-item>
              <el-form-item label="房主高级手续费支出总额">
                <span>{{ props.row.totalAdvFees }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | fromatterTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="账户ID" width="80" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="账户名" align="center" sortable></el-table-column>
        <el-table-column
          prop="totalPrtpProfit"
          label="房主总收入"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="房主总收入" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主总收入</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPrtpProfitList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalPlayAmount"
          label="房主对应房间的预测总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="房主对应房间的预测总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主对应房间的预测总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPlayAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalAdvplayAmount"
          label="房主高级投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="房主高级投注总额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主高级投注总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalAdvplayAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalBotadvplayAmount"
          label="房主高级机器人投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="房主高级机器人投注总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主高级机器人投注总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalBotadvplayAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalBotplayAmount"
          label="房主机器人预测总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="房主机器人预测总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主机器人预测总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalBotplayAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="houseAdvSettle"
          label="房主高级总派奖"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="房主高级总派奖" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主高级总派奖</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.houseAdvSettleList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="houseBotadvSettle"
          label="房主高级机器人和房主总派奖"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="房主高级机器人和房主总派奖"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">房主高级机器人和房主总派奖</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.houseBotadvSettleList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
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
import { houseTotalPage } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "accounthousetotal",
  data () {
    return {
      tableData: [],
      issuer: "",
      name: "",
      asset: "",
      page: {
        total: 0,
        size: 10,
        current: 1
      },
      showModel: 1,
      isSelectAsset: true,
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
    fromatterList: function (value) {
      if (!value) return "暂无";
      return value;
    }
  },
  methods: {
    selectAsset (var1) {
      //开启选择资产
      if (var1 === 1) {
        this.isSelectAsset = true;
      } else {
        this.isSelectAsset = false;
      }
    },
    f5 () {
      this.issuer = "";
      this.name = "";
      this.page.current = 1;
      this.asset = this.defaultAsset;
      this.page.size = 10;
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
      // if (this.asset == "" && this.isSelectAsset) {
      //   this.$message.error("请输入需要显示的资产ID");
      //   return;
      // }
      houseTotalPage(params).then(
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
