<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-scan"></i> 区块数据
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="block" placeholder="区块高度" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="区块高度" width="120"></el-table-column>
        <el-table-column prop="witness" label="见证人" width="100"></el-table-column>
        <el-table-column prop="blockId" label="区块哈希"></el-table-column>
        <el-table-column
          prop="eastEightTimestamp"
          label="出块时间（东八区）"
          width="180"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column prop="txsCount" label="交易笔数" width="100"></el-table-column>
        <el-table-column prop="signingKey" label="见证人公钥"></el-table-column>
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
import { block } from "../../api/api";
export default {
  name: "block",
  data() {
    return {
      tableData: [],
      block: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {}
  },
  methods: {
    f5() {
      this.block = "";
      this.page.size = 10;
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
        block: this.block
      };
      block(params).then(
        data => {
          var result = data.data;
          if (200 == result.code) {
            this.tableData = result.data.records;
            this.page.current = result.data.current;
            this.page.size = result.data.size;
            this.page.total = result.data.total;
            console.log(result);
          }
        },
        error => {
          console.log(error);
          this.$message.error("服务器连接失败");
        }
      );
    },
    formatter(row, column) {
      return moment
        .unix(row.eastEightTimestamp / 1000)
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
  width: 300px;
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
