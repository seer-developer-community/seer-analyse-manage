<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-lx-rank",
          index: "5",
          title: "每日总体指标 PLUS",
          // subs: [
          //   {
          //     index: "dailyfaucet",
          //     title: "每日水龙头账户统计"
          //   },
          //   {
          //     index: "dailyhouses",
          //     title: "每日房主账户统计"
          //   },
          //   {
          //     index: "dailydata",
          //     title: "每日总体指标统计"
          //   }
          // ]
          subs: [
            {
              index: "userTransaction",
              title: "用户和交易每日指标"
            },
            {
              index: "profit",
              title: "收益每日指标"
            },
            {
              index: "houseRoom",
              title: "分平台房间每日指标"
            },
            {
              index: "typeRoom",
              title: "分类型房间每日指标"
            }
          ]
        },
        {
          icon: "el-icon-lx-people",
          index: "dailyuser",
          title: "每日用户"
        },
        {
          icon: "el-icon-lx-shop",
          index: "dailyroom",
          title: "每日房间"
        },
        {
          icon: "el-icon-lx-apps",
          index: "4",
          title: "新增累计数据",
          subs: [
            {
              index: "block",
              title: "区块数据"
            },
            {
              index: "transaction",
              title: "区块交易"
            },
            {
              index: "totalroom",
              title: "房间累计"
            },
            {
              icon: "el-icon-lx-group",
              index: "6",
              title: "用户信息 PLUS",
              subs: [
                {
                  index: "accountbase",
                  title: "基础信息"
                },
                {
                  index: "accountregister",
                  title: "注册人系列"
                },
                {
                  index: "accountauths",
                  title: "权限系列"
                },
                {
                  index: "accounthousetotal",
                  title: "房主累积系列"
                },
                {
                  index: "accounthousetype",
                  title: "PVDPVP系列"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace("/", "");
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
