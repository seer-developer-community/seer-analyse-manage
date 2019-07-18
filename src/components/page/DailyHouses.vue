<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 每日总体指标 PLUS / 房主账户统计
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
        ></el-date-picker>
        <el-radio-group v-model="showModel" class="mr30" @change="selectAsset">
          <el-radio :label="0" border>展示指定的房主</el-radio>
          <el-radio :label="1" border>展示指定的资产</el-radio>
          <el-radio :label="2" border>展示全部</el-radio>
        </el-radio-group>资产ID：
        <el-input
          v-model="asset"
          placeholder="要显示的资产ID"
          class="handle-input mr10"
          :disabled="!isSelectAsset"
        ></el-input>房主ID：
        <el-input
          v-model="house"
          placeholder="要显示的房主ID"
          class="handle-input mr10"
          :disabled="!isSelectHouse"
        ></el-input>-->
        <el-date-picker
          v-model="times"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="mr10"
        ></el-date-picker>展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>展示房主账户：
        <el-input v-model="house" placeholder="展示的房主账户" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
        <el-button type="primary" @click="downExcel">导出EXCEL</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="register-table-expand">
              <el-form-item label="累计dapp补贴">
                <span>{{ props.row.totalSubsidy }}</span>
              </el-form-item>
              <el-form-item label="dapp补贴">
                <span>{{ props.row.dailySubsidy }}</span>
              </el-form-item>
              <el-form-item label="累计高级房间手续费收入">
                <span>{{ props.row.totalAdvprtpFees }}</span>
              </el-form-item>
              <el-form-item label="累计PVP房间手续费收入">
                <span>{{ props.row.totalPvpprtpFees }}</span>
              </el-form-item>
              <el-form-item label="累计PVP房间手续费">
                <span>{{ props.row.totalPvpFees }}</span>
              </el-form-item>
              <el-form-item label="累计PVD房间手续费">
                <span>{{ props.row.totalPvdFees }}</span>
              </el-form-item>
              <el-form-item label="累计高级房间手续费">
                <span>{{ props.row.totalAdvFees }}</span>
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
          prop="totalPvpProfit"
          label="累计pvp抽成收入"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="累计pvp抽成收入"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计pvp抽成收入</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPvpProfitList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyNewRooms"
          label="新增房间数(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="新增房间数" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">新增房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyNewRoomsList"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyPrtpRate"
          label="新增房间参与率(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="新增房间参与率" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">新增房间参与率</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyPrtpRateList"
                :key="col.house"
              >{{col.house}} - {{col.rate}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalRooms"
          label="累计房间数(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计房间数" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalRoomsList"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalPrtpRate"
          label="累计房间参与率(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计房间参与率" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计房间参与率</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPrtpRateList"
                :key="col.house"
              >{{col.house}} - {{col.rate}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalAdvplayAmount"
          label="累计高级投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计高级投注总额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计高级投注总额</p>
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
          prop="totalAdvSettle"
          label="累计高级派奖总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计高级派奖总额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计高级派奖总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalAdvSettleList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="dailyOpeningRoom"
          label="可投注总房间数"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="可投注总房间数" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">可投注总房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyOpeningRoomList"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="prtpTimes"
          label="投注人次(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="投注人次" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">投注人次</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.prtpTimesList"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->

        <el-table-column
          prop="totalPrtpTimes"
          label="累计投注人次(房主账户)"
          align="center"
          v-if="isSelectHouse"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计投注人次" align="center" v-if="!isSelectHouse" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计投注人次</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPrtpTimesList"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalPvpplayAmount"
          label="累计PVP投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="累计PVP投注总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计PVP投注总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPvpplayAmountList"
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
          label="累计投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="累计投注总额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计投注总额</p>
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
          prop="totalPvpSettle"
          label="累计PVP派奖总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="累计PVP派奖总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计PVP派奖总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPvpSettleList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="totalPvdplayAmount"
          label="累计PVD投注总额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column
          label="累计PVD投注总额"
          align="center"
          v-if="!isSelectAsset"
          :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计PVD投注总额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPvdplayAmountList"
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
import { dailyHouses, exportDailyHouses } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "dailyroom",
  data() {
    return {
      tableData: [],
      asset: "1.3.0",
      house: "",
      times: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      showModel: 1,
      isSelectAsset: true,
      isSelectHouse: true,
      defaultAsset: "",
      defaultHouse: ""
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
        asset: this.asset,
        house: this.house
      };
      exportDailyHouses(params).then(
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
      if (var1 === 0) {
        this.isSelectHouse = true;
        this.isSelectAsset = false;
      }
      //开启选择资产
      else if (var1 === 1) {
        this.isSelectAsset = true;
        this.isSelectHouse = false;
      } else {
        this.isSelectAsset = false;
        this.isSelectHouse = false;
      }
    },
    f5() {
      this.house = "";
      this.asset = "";
      this.times = "";
      this.page.size = 10;
      this.page.current = 1;

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
      // if (this.house == "" && this.isSelectHouse) {
      //   this.$message.error("请输入需要显示的房主ID");
      //   return;
      // }
      var params = {
        current: this.page.current,
        size: this.page.size,
        asset: this.asset,
        house: this.house,
        times: this.times
      };
      dailyHouses(params).then(
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
            if (this.defaultHouse === "") {
              this.defaultHouse = result.data.house;
            }
            this.house = result.data.house;
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
