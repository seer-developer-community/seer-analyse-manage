<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-apps"></i> 区块交易
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="block" placeholder="区块高度" class="handle-input mr10"></el-input>
        <el-input v-model="tx" placeholder="交易哈希" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="blockHeight" label="区块高度" width="120"></el-table-column>
        <el-table-column prop="txId" label="交易哈希" width="240"></el-table-column>
        <el-table-column
          prop="blockTime"
          label="出块时间（东八区）"
          width="160"
          :formatter="formatterBlockTime"
        ></el-table-column>
        <el-table-column prop="operations" label="链上操作" :formatter="formatterOption" width="480">
          <template slot-scope="scope">
            <span>{{scope.row.operations}}</span>
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
            >&nbsp;&nbsp;&nbsp;&nbsp;查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operationResults" label="操作结果"></el-table-column>
        <el-table-column prop="type" label="操作类型" :formatter="formatterType"></el-table-column>
        <el-table-column prop="nonce" label="交易中的序号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="formatterCreate" width="160"></el-table-column>
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
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <vue-json-editor v-model="json"></vue-json-editor>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import vueJsonEditor from 'vue-json-editor'
import { blockTx } from "../../api/api";
export default {
  name: "block",
  data () {
    return {
      tableData: [],
      block: "",
      tx: "",
      page: {
        total: 0,
        size: 10,
        current: 0
      },
      json: [],
      dialogVisible: false
    };
  },
  created () {
    this.getData();
  },
  computed: {
    data () { }
  },
  components: {
    vueJsonEditor
  },
  methods: {
    handleEdit (var1, var2) {
      this.json = var2.operations
      this.dialogVisible = true
    },
    f5 () {
      this.block = "";
      this.tx = "";
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
        block: this.block,
        tx: this.tx
      };
      blockTx(params).then(
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
    formatterBlockTime (row, column) {
      return moment
        .unix(row.blockTime / 1000)
        .format("YYYY-MM-DD HH:mm:ss");
    },
    formatterCreate (row, column) {
      return moment
        .unix(row.createTime / 1000)
        .format("YYYY-MM-DD HH:mm:ss");
    },
    formatterOption (row, column) {
      var re = JSON.parse(row.operations);
      var code = "";
      for (var i = 0; i < re.length; i++) {
        code = code + re[i][0]
        if (i != re.length - 1) {
          code = code + "；"
        }
      }
      return code;
    },
    formatterType (row, column) {
      var type = row.type
      switch (type) {
        case 0:
          return '转账'
        case 1:
          return "委单"
        case 2:
          return "取消委单"
        case 3:
          return "委单撮合"
        case 4:
          return "创建账户"
        case 5:
          return "更新账户"
        case 7:
          return "升级账户"
        case 9:
          return "创建资产"
        case 10:
          return "更新资产"
        case 11:
          return "发行资产"
        case 12:
          return "销毁资产"
        case 13:
          return "为资产手续费池注入资金"
        case 14:
          return "创建见证人"
        case 15:
          return "更新见证人"
        case 16:
          return "见证人创建抵押项"
        case 17:
          return "见证人取消抵押项"
        case 18:
          return "见证人领取抵押项余额/抵押收益"
        case 19:
          return "创建交易提议"
        case 20:
          return "更新交易提议"
        case 26:
          return "创建理事会成员"
        case 30:
          return "提取解冻金额/出块收益"
        case 40:
          return "创建预言机"
        case 41:
          return "更新预言机"
        case 42:
          return "预言机输入结果"
        case 43:
          return "创建房间"
        case 44:
          return "更新房间"
        case 45:
          return "创建者输入结果"
        case 46:
          return "开启房间"
        case 47:
          return "停止房间"
        case 48:
          return "预测结算"
        case 49:
          return "派发奖励"
        case 50:
          return "参与预测"
        case 52:
          return "给房间添加资金"
        case 53:
          return "创建平台"
        case 54:
          return "更新平台"
      }
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
