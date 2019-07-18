<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-shopfill"></i> 房间累计数据
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="room" placeholder="房间号" class="handle-input mr10"></el-input>展示资产：
        <el-input v-model="asset" placeholder="展示的资产" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="room" label="房间号" width="120" align="center" sortable></el-table-column>
        <!-- <el-table-column label="DAPP补贴" align="center">
          <el-table-column v-for="col in cols" :label="col.name" :key="col.name" align="center" sortable>
            <template slot-scope="scope">{{scope.row[col.name]}}</template>
          </el-table-column>
          <template v-if="isShow">暂无可显示的资产</template>
        </el-table-column>-->
        <el-table-column prop="showAsset" :label="showAssetLabel" align="center" sortable></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="formatter" align="center" sortable></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" :formatter="formatter" align="center" sortable></el-table-column>
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
import { totalRoom } from "../../api/api";
import { truncate } from 'fs';
export default {
  name: "dailyroom",
  data () {
    return {
      tableData: [],
      room: "",
      page: {
        total: 0,
        size: 10,
        current: 0
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
  methods: {
    f5 () {
      this.room = "";
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
        room: this.room,
        asset: this.asset
      };
      totalRoom(params).then(
        data => {
          var result = data.data;
          console.log(result)
          if (200 == result.code) {
            this.tableData = result.data.records;
            this.page.current = result.data.current;
            this.page.size = result.data.size;
            this.page.total = result.data.total;
            if (this.defaultAsset === "") {
              this.defaultAsset = result.data.asset;
            }
            this.asset = result.data.asset;
            this.showAssetLabel = this.asset + " DAPP补贴"
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
      return moment
        .unix(row.updateTime / 1000)
        .format("YYYY-MM-DD HH:mm:ss");
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
