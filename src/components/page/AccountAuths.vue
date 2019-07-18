<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-group"></i> 用户信息 PLUS / 权限系列
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="issuer" placeholder="账户ID" class="handle-input mr10"></el-input>
        <el-input v-model="name" placeholder="账户名" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="f5">刷新</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="auth-table-expand">
              <el-form-item label="账户权限阈值">
                <span>{{ props.row.ownerWeightThreshold }}</span>
              </el-form-item>
              <el-form-item label="活跃权限阈值">
                <span>{{ props.row.activeWeightThreshold }}</span>
              </el-form-item>
              <el-form-item label="账户权限授权账户">
                <span>{{ props.row.ownerAccountAuths }}</span>
              </el-form-item>
              <el-form-item label="账户权限授权公钥">
                <span>{{ props.row.ownerKeyAuths }}</span>
              </el-form-item>
              <el-form-item label="账户权限授权地址">
                <span>{{ props.row.ownerAddressAuths }}</span>
              </el-form-item>
              <el-form-item label="资金权限授权公钥">
                <span>{{ props.row.activeKeyAuths }}</span>
              </el-form-item>
              <el-form-item label="资金权限授权地址">
                <span>{{ props.row.activeAddressAuths }}</span>
              </el-form-item>
              <el-form-item label="投票ID列表">
                <span>{{ props.row.votes }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="账户 ID" prop="id" width="100"></el-table-column>
        <el-table-column label="账户名" prop="name" align="center" width="100"></el-table-column>
        <el-table-column label="备注公钥" prop="memoKey" align="center" width="500"></el-table-column>
        <el-table-column label="投票代理账户" prop="votingAccount" align="center" width="120"></el-table-column>
        <el-table-column label="投票相关" prop="numCommittee" width="100" align="center"></el-table-column>
        <el-table-column label="认证相关" prop="numAuthenticator" width="100" align="center"></el-table-column>
        <el-table-column label="监管相关" prop="numSupervisor" width="100" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :formatter="formatter" align="center"></el-table-column>
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
import { authPage } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "accountauths",
  data() {
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
      isShow: false
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
      this.issuer = "";
      this.name = "";
      this.times = "";
      this.page.current = 1;
      this.page.size = 10;
      this.getData();
    },
    formatter(row, column) {
      return moment
        .unix(row.dateZeroTimestamp / 1000)
        .format("YYYY-MM-DD HH:mm:ss");
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
        name: this.name
      };
      authPage(params).then(
        data => {
          var result = data.data;
          if (200 == result.code) {
            this.tableData = result.data.records;
            this.page.current = result.data.current;
            this.page.size = result.data.size;
            this.page.total = result.data.total;
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
.auth-table-expand {
  font-size: 0;
}
.auth-table-expand label {
  width: 150px;
  color: blue;
}
.auth-table-expand .el-form-item {
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
