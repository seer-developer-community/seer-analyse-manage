import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/block',
                    component: resolve => require(['../components/page/Block.vue'], resolve),
                    meta: { title: '区块数据' }
                },
                {
                    path: '/transaction',
                    component: resolve => require(['../components/page/Transaction.vue'], resolve),
                    meta: { title: '区块交易' }
                },
                {
                    path: '/dailyuser',
                    component: resolve => require(['../components/page/DailyUser.vue'], resolve),
                    meta: { title: '每日用户' }
                },
                {
                    path: '/dailyroom',
                    component: resolve => require(['../components/page/DailyRoom.vue'], resolve),
                    meta: { title: '每日房间' }
                },
                {
                    path: '/totalroom',
                    component: resolve => require(['../components/page/TotalRoom.vue'], resolve),
                    meta: { title: '房间累计' }
                },
                {
                    path: '/accountbase',
                    component: resolve => require(['../components/page/AccountBase.vue'], resolve),
                    meta: { title: '基础信息' }
                },
                {
                    path: '/accountregister',
                    component: resolve => require(['../components/page/AccountRegister.vue'], resolve),
                    meta: { title: '注册人系列' }
                },
                {
                    path: '/accountauths',
                    component: resolve => require(['../components/page/AccountAuths.vue'], resolve),
                    meta: { title: '权限系列' }
                },
                {
                    path: '/accounthousetotal',
                    component: resolve => require(['../components/page/AccountHouseTotal.vue'], resolve),
                    meta: { title: '房主累积系列' }
                },
                {
                    path: '/accounthousetype',
                    component: resolve => require(['../components/page/AccountHouseType.vue'], resolve),
                    meta: { title: 'PVDPVP系列' }
                },
                {
                    path: '/dailyfaucet',
                    component: resolve => require(['../components/page/DailyFaucet.vue'], resolve),
                    meta: { title: '水龙头统计' }
                },
                {
                    path: '/dailyhouses',
                    component: resolve => require(['../components/page/DailyHouses.vue'], resolve),
                    meta: { title: '房主统计' }
                },
                {
                    path: '/dailydata',
                    component: resolve => require(['../components/page/DailyData.vue'], resolve),
                    meta: { title: '总体指标统计' }
                },
                {
                    path: '/userTransaction',
                    component: resolve => require(['../components/page/UserTransaction.vue'], resolve),
                    meta: { title: '用户和交易每日指标' }
                },
                {
                    path: '/profit',
                    component: resolve => require(['../components/page/Profit.vue'], resolve),
                    meta: { title: '收益每日指标' }
                },
                {
                    path: '/houseRoom',
                    component: resolve => require(['../components/page/ForHouseRoom.vue'], resolve),
                    meta: { title: '分平台房间每日指标' }
                },
                {
                    path: '/typeRoom',
                    component: resolve => require(['../components/page/ForTypeRoom.vue'], resolve),
                    meta: { title: '分类型房间每日指标' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
