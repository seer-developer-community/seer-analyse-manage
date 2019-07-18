<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-rank"></i> 分平台房间每日指标
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
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>展示房主账户：
        <el-input v-model="house" placeholder="展示的房主账户" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
        <el-button type="primary" @click="downExcel">导出EXCEL</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="time" label="日期" align="center" sortable></el-table-column>
        <el-table-column
          prop="dailyNewRooms"
          label="新增房间数"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="新增房间数"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="dailyNewRoomsSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">新增房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyNewRooms"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.dailyNewRoomsSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="dailyPrtpRate"
          label="新增房间参与率"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="新增房间参与率"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="dailyPrtpRateSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">新增房间参与率</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyPrtpRate"
                :key="col.house"
              >{{col.house}} - {{col.rate}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.dailyPrtpRateSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalRooms"
          label="累计房间数"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="累计房间数"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="totalRoomsSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalRooms"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.totalRoomsSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalPrtpRate"
          label="累计房间参与率"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="累计房间参与率"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="totalPrtpRateSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计房间参与率</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPrtpRate"
                :key="col.house"
              >{{col.house}} - {{col.rate}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.totalPrtpRateSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="dailyOpeningRoom"
          label="可投注总房间数"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="可投注总房间数"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="dailyOpeningRoomSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">可投注总房间数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.dailyOpeningRoom"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.dailyOpeningRoomSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="prtpTimes"
          label="投注人次"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="投注人次"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="prtpTimesSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">投注人次</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.prtpTimes"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.prtpTimesSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalPrtpTimes"
          label="累计投注人次"
          align="center"
          v-if="!showHouseMore"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <el-table-column
          label="累计投注人次"
          align="center"
          v-if="showHouseMore"
          :key="Math.random()"
          sortable
          prop="totalPrtpTimesSum"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">累计投注人次</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.totalPrtpTimes"
                :key="col.house"
              >{{col.house}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <p>{{scope.row.totalPrtpTimesSum}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="playAmount" label="投注额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.playAmountShow}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPlayAmount" label="累计投注额" align="center" sortable>
          <template slot-scope="props">
            <span>{{props.row.totalPlayAmountShow}}</span>
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
import { houseRoom, exportHouseRoom } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "houseroom",
  data () {
    return {
      tableData: [],
      asset: "",
      house: "",
      times: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      showHouseMore: false,
      defaultAsset: "",
      defaultHouse: ""
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
        asset: this.asset,
        house: this.house
      };
      exportHouseRoom(params).then(
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
      this.house = "";
      this.asset = "";
      this.times = "";
      this.page.size = 10;
      this.page.current = 1;

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
        house: this.house,
        times: this.times
      };
      houseRoom(params).then(
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
            this.showHouseMore = result.data.showHouseMore
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
