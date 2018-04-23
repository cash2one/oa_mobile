import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import footerNav from '@/components/nav/footerNav'
import statePage from '@/components/statePage'
import login from '@/components/login'
import register from '@/components/register'
import forgotPassword from '@/components/forgotPassword' // 找回密码

/**
 * 消息
 */
import home from '@/components/home/home'
import announcementList from '@/components/announcement/list' // 公告列表
import announcementDetails from '@/components/announcement/details' // 公告详情
import applyList from '@/components/apply/list' // 申请
import leaveDetail from '@/components/apply/leaveDetail'
/**
 * 通讯录
 */
import maillist from '@/components/maillist/list'
import maildetails from '@/components/maillist/details'
import mailchat from '@/components/maillist/chat'
/**
 * 个人中心
 */
import center from '@/components/center/center'
import centerData from '@/components/center/center_data'
import centerAccountSettings from '@/components/center/account_settings'
import centerPhone from '@/components/center/account_settings_phone'
import centerPhoneNew from '@/components/center/account_settings_phone_new'
import centerPassword from '@/components/center/account_settings_passwold'
import centerMyApply from '@/components/center/apply'
import centerMyApplyDetails from '@/components/center/apply_details'
import wages from '@/components/center/wages'
import wagesDetails from '@/components/center/wagesDetails'

/**
 * 工作
 */
import work from '@/components/work/work'
import workApplyCapital from '@/components/work/apply_capital' // 备用资金申请
import workApplyReceivables from '@/components/work/apply_receivables' // 收款报备
import workApplyContractPayment from '@/components/work/apply_contractPayment' // 合同付款申请
import workApplyReimbursement from '@/components/work/apply_reimbursement' // 报销申请
import workApplyGoods from '@/components/work/apply_goods' // 物品申请
import workApplyCar from '@/components/work/apply_car' // 用车申请
import workApplyLeave from '@/components/work/apply_leave' // 请假申请
import workCalendar from '@/components/work/calendar' // 日历事件
import reminderTime from '@/components/work/reminder_time' // 提醒时间
import checkWork from '@/components/work/checkWork'  // 上班打卡
import sign from '@/components/work/sign'  // 签到入口
import signPage from '@/components/work/signPage'  // 签到
import lineLog from '@/components/work/lineLog'  // 足迹
import signDetails from '@/components/work/signDetails'  // 详情
import assessment from '@/components/work/assessment'  // 详情

// 客户管理
import customer from '@/components/work/customer' // 客户管理
import customerManagement from '@/components/work/customerManagement'// 我的客户
import customerDetails from '@/components/work/customerDetails' // 客户主页(详情)
import addCustomer from '@/components/work/addCustomer'// 添加客户
import editCustomer from '@/components/work/editCustomer'// 编辑客户
import setBirthday from '@/components/work/setBirthday'// 生日提醒
import followUp from '@/components/work/customerFollowUp'// 客户跟进
import addFollow from '@/components/work/addFollow'// 添加客户跟进
import selectStatus from '@/components/work/selectStatus' // 选择分类
// 客户管理-行业
import selectPage from '@/components/work/selectPage'  // 行业筛选页
import addTname from '@/components/work/addTradeName' // 行业添加名称
// 客户管理-标签
import selectTag from '@/components/work/selectTag' // 选择标签
import addTag from '@/components/work/addTag' // 添加标签
import noTagAdd from '@/components/work/noTagAdd' // 第一次添加标签页面
import tagList from '@/components/work/tagList'

// 项目管理
import project from '@/components/project/project'
import dayWork from '@/components/project/dayWork'
import workDetail from '@/components/project/workDetail'
import task from '@/components/project/task'

// 判断是否是微信浏览器打开
var goName = '';
window.uploadtype = 1;
function isWechat () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > -1) {
        window.uploadtype = 2
        return true
    }
    return false
}
if (isWechat()) {
    console.log('微信浏览器打开')
    goName = '/index';
} else {
    goName = '/login';
    console.log('非微信浏览器')
}
Vue.use(Router)
var router = [
    {path: '/login', name: 'login', component: login},
    {path: '/register', name: 'register', component: register},
    {path: '/forgotPassword', name: 'forgotPassword', component: forgotPassword},
    {path: '*', redirect: '/statePage/4', component: statePage},
    {path: '/', redirect: goName},
    {path: '/statePage/:type', name: 'statePage', component: statePage},
    {
        path: '/index',
        name: 'index',
        component: index,
        redirect: '/index/home',
        children: [
            {
                path: '/index/home',
                name: 'home',
                components: {
                    default: home,
                    footerNav: footerNav
                }
            },
            {
                path: '/index/maillist',
                name: 'maillist',
                components: {
                    default: maillist,
                    footerNav: footerNav
                }
            },
            {
                path: '/index/mailchat/:id',
                name: 'mailchat',
                components: {
                    default: mailchat
                }
            },
            {
                path: '/index/maildetails/:id',
                name: 'maildetails',
                components: {
                    default: maildetails
                }
            },
            {
                path: '/index/announcementList',
                name: 'announcementList',
                component: announcementList
            },
            {
                path: '/index/announcementDetails/:id',
                name: 'announcementDetails',
                component: announcementDetails
            },
            {
                path: '/index/applyList',
                name: 'applyList',
                component: applyList
            },
            {
                path: '/index/center',
                name: 'center',
                components: {
                    default: center,
                    footerNav: footerNav
                }
            },
            {
                path: '/index/work',
                name: 'work',
                components: {
                    default: work,
                    footerNav: footerNav
                }
            },
            {
                path: '/index/leaveDetail',
                name: 'leaveDetail',
                component: leaveDetail
            },
            {
                path: '/index/center/data',
                name: 'centerData',
                component: centerData
            },
            {
                path: '/index/center/accountSettings',
                name: 'centerAccountSettings',
                component: centerAccountSettings
            },
            {
                path: '/index/center/password',
                name: 'centerPassword',
                component: centerPassword
            },
            {
                path: '/index/center/phone',
                name: 'centerPhone',
                component: centerPhone
            },
            {
                path: '/index/center/phone/new',
                name: 'centerPhoneNew',
                component: centerPhoneNew
            },
            {
                path: '/index/center/apply',
                name: 'centerMyApply',
                component: centerMyApply
            },
            {
                path: '/index/center/apply/details/:id',
                name: 'centerMyApplyDetails',
                component: centerMyApplyDetails
            },
            {
                path: '/index/center/wages',
                name: 'wages',
                component: wages
            },
            {
                path: '/index/center/wagesDetails/:id',
                name: 'wagesDetails',
                component: wagesDetails
            },
            {
                path: '/index/work/capital',
                name: 'workApplyCapital',
                component: workApplyCapital
            },
            {
                path: '/index/work/receivables',
                name: 'workApplyReceivables',
                component: workApplyReceivables
            },
            {
                path: '/index/work/contractPayment',
                name: 'workApplyContractPayment',
                component: workApplyContractPayment
            },
            {
                path: '/index/work/reimbursement',
                name: 'workApplyReimbursement',
                component: workApplyReimbursement
            },
            {
                path: '/index/work/goods',
                name: 'workApplyGoods',
                component: workApplyGoods
            },
            {
                path: '/index/work/car',
                name: 'workApplyCar',
                component: workApplyCar
            },
            {
                path: '/index/work/leave',
                name: 'workApplyLeave',
                component: workApplyLeave
            },
            {
                path: '/index/work/calendar',
                name: 'workCalendar',
                component: workCalendar
            },
            {
                path: '/index/work/calendar/reminderTime/:id',
                name: 'reminderTime',
                component: reminderTime
            },
            {
                path: '/index/work/customer',
                name: 'customer',
                component: customer
            },
            {
                path: '/index/work/customer/addCustomer',
                name: 'addCustomer',
                component: addCustomer
            },
            {
                path: '/index/work/customer/editCustomer/:id',
                name: 'editCustomer',
                component: editCustomer
            },
            {
                path: '/index/work/customer/setBirthday/:id',
                name: 'setBirthday',
                component: setBirthday
            },
            {
                path: '/index/work/customer/followUp/:id',
                name: 'followUp',
                component: followUp
            },
            {
                path: '/index/work/customer/addFollow/:id',
                name: 'addFollow',
                component: addFollow
            },
            {
                path: '/index/work/customer/addCustomer/customerManagement/:bool',
                name: 'customerManagement',
                component: customerManagement
            },
            {
                path: '/index/work/customer/customerDetails/:id',
                name: 'customerDetails',
                component: customerDetails
            },
            {
                path: '/index/work/customer/addCustomer/selectPage',
                name: 'selectPage',
                component: selectPage
            },
            {
                path: '/index/work/customer/addCustomer/checkWork',
                name: 'checkWork',
                component: checkWork
            },
            {
                path: '/index/work/customer/addCustomer/sign',
                name: 'sign',
                component: sign
            },
            {
                path: '/index/work/customer/addCustomer/signPage',
                name: 'signPage',
                component: signPage
            },
            {
                path: '/index/work/customer/addCustomer/lineLog',
                name: 'lineLog',
                component: lineLog
            },
            {
                path: '/index/work/customer/addCustomer/signDetails',
                name: 'signDetails',
                component: signDetails
            },
            {
                path: '/index/work/assessment',
                name: 'assessment',
                component: assessment
            },
            {
                path: '/index/work/customer/addCustomer/addTname/:id',
                name: 'addTname',
                component: addTname
            },
            {
                path: '/index/work/customer/addCustomer/selectStatus',
                name: 'selectStatus',
                component: selectStatus
            },
            {
                path: '/index/work/customer/addCustomer/selectTag',
                name: 'selectTag',
                component: selectTag
            },
            {
                path: '/index/work/customer/addCustomer/addTag',
                name: 'addTag',
                component: addTag
            },
            {
                path: '/index/work/customer/noTagAdd',
                name: 'noTagAdd',
                component: noTagAdd
            },
            {
                path: '/index/work/customer/tagList',
                name: 'tagList',
                component: tagList
            },
            {
                path: '/index/work/project',
                name: 'project',
                component: project
            },
            {
                path: '/index/work/dayWork',
                name: 'dayWork',
                component: dayWork
            },
            {
                path: '/index/work/workDetail/:id',
                name: 'workDetail',
                component: workDetail
            },
            {
                path: '/index/work/task/:id',
                name: 'task',
                component: task
            }
        ]
    }
]

// 收到申请
import receivedApply from '@/router/received_apply'
import myApply from '@/router/my_apply'
import plan from '@/router/plan'

for (var i = 0; i < router.length; i++) {
    if (router[i].name === 'index') {
        router[i].children = router[i].children.concat(receivedApply).concat(myApply).concat(plan);
        break;
    }
}

export default new Router({
    routes: router
})

