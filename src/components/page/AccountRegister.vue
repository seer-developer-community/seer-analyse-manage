<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-group"></i> 用户信息 PLUS / 注册人系列
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="issuer" placeholder="账户ID" class="handle-input mr10"></el-input>
        <el-input v-model="name" placeholder="账户名" class="handle-input mr30"></el-input>
        <!-- <el-radio-group v-model="showModel" class="mr30" @change="selectAsset">
          <el-radio :label="1" border>展示指定的资产</el-radio>
          <el-radio :label="2" border>展示全部</el-radio>
        </el-radio-group>-->
        <!-- <el-input
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
              <el-form-item label="注册人">
                <span>{{ props.row.registrar }}</span>
              </el-form-item>
              <el-form-item label="注册人累计投注用户">
                <span>{{ props.row.players }}</span>
              </el-form-item>
              <el-form-item label="注册人累计机器人投注用户">
                <span>{{ props.row.botPlayers }}</span>
              </el-form-item>
              <el-form-item label="用户注册用户支出">
                <span>{{ props.row.totalRegisteredFees }}</span>
              </el-form-item>
              <el-form-item label="注册人注册当天机器人投注用户数">
                <span>{{ props.row.botTruePlayers }}</span>
              </el-form-item>
              <el-form-item label="注册人机器人预测手续费">
                <span>{{ props.row.seerbotFees }}</span>
              </el-form-item>
              <el-form-item label="注册人注册当天投注用户数">
                <span>{{ props.row.truePlayers }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | fromatterTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="账户ID" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="账户名" align="center" sortable></el-table-column>
        <el-table-column
          prop="depositAmount"
          label="注册人充值金额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="注册人充值金额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">注册人充值金额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.depositAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="botDepositAmount"
          label="机器人充值金额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="机器人充值金额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">机器人充值金额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.botDepositAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="depositCount"
          label="注册人充值笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="注册人充值笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">注册人充值笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.depositCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="botDepositCount"
          label="机器人充值笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="机器人充值笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">机器人充值笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.botDepositCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="transferAmount"
          label="注册人转账金额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="注册人转账金额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">注册人转账金额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.transferAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="botTransferAmount"
          label="机器人转账金额"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="机器人转账金额" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">机器人转账金额</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.botTransferAmountList"
                :key="col.asset"
              >{{col.asset}} - {{col.amount}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="transferCount"
          label="注册人转账笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="注册人转账笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">注册人转账笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.transferCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="botTransferCount"
          label="机器人转账笔数"
          align="center"
          v-if="isSelectAsset"
          :key="Math.random()"
          sortable
        ></el-table-column>
        <!-- <el-table-column label="机器人转账笔数" align="center" v-if="!isSelectAsset" :key="Math.random()">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="padding-top:10px;color:blue">机器人转账笔数</p>
              <p
                style="padding-top:10px"
                v-for="col in scope.row.botTransferCountList"
                :key="col.asset"
              >{{col.asset}} - {{col.count}}</p>
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
import { registerPage } from "../../api/api";
import { truncate } from "fs";
export default {
  name: "accountregister",
  data () {
    return {
      tableData: [],
      issuer: "",
      name: "",
      asset: "",
      page: {
        total: 0,
        size: 10,
        current: 0
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
      // if (this.asset == "" && this.isSelectAsset) {
      //   this.$message.error("请输入需要显示的资产ID");
      //   return;
      // }
      registerPage(params).then(
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
