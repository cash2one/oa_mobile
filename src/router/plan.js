import dayPlan from '@/components/plan/dayPlan' // 日目标
import dayPlanAdd from '@/components/plan/dayPlanAdd' // 添加日目标
import dayPlanEdit from '@/components/plan/dayPlanEdit' // 编辑日目标
import weekPlan from '@/components/plan/weekPlan' // 添加周目标
import weekPlanAdd from '@/components/plan/weekPlanAdd' // 添加周目标
import weekSummaryAdd from '@/components/plan/weekSummaryAdd' // 添加周总结
import weekPlanEdit from '@/components/plan/weekPlanEdit' // 添加周总结
import otherPlanEdit from '@/components/plan/otherPlanEdit' // 添加周总结
// 月目标
import monthPlan from '@/components/plan/monthPlan' // 月计划
import monthTargetCreate from '@/components/plan/monthTarget_create' // 添加月计划
import monthTargetDetails from '@/components/plan/monthTarget_details' // 月计划详情
import monthTargetDetailsEdit from '@/components/plan/monthTarget_details_edit' // 月计划详情编辑
import monthSummaryAdd from '@/components/plan/monthSummaryAdd' // 月计划总结
//  年目标
import yearTargetPersonal from '@/components/plan/yearTarget_personal' // 年计划列表
import yearlistDetail from '@/components/plan/yearlistDetail' // 年计划详情
import yearPlanAddPerson from '@/components/plan/yearPlanAdd_person' // 年计划个人添加
import yearPlanAddCause from '@/components/plan/yearPlanAdd_cause' // 年计划事业添加
import yearTargetDetails from '@/components/plan/yearTarget_details' // 年计划详情
import yearPlanPersonDetails from '@/components/plan/yearPlanPersonDetails' // 年计划个人详情
import yearTargetEdit from '@/components/plan/yearTarget_details_edit' // 年计划事业编辑
import yearPlanPersonEdit from '@/components/plan/yearPlanPersonEdit' // 年计划个人编辑
export default [
    {
        path: '/index/plan/day',
        name: 'dayPlan',
        component: dayPlan
    },
    {
        path: '/index/plan/dayAdd',
        name: 'dayPlanAdd',
        component: dayPlanAdd
    },
    {
        path: '/index/plan/dayEdit/:id/:isedit',
        name: 'dayPlanEdit',
        component: dayPlanEdit
    },
    {
        path: '/index/plan/week',
        name: 'weekPlan',
        component: weekPlan
    },
    {
        path: '/index/plan/weekAdd',
        name: 'weekPlanAdd',
        component: weekPlanAdd
    },
    {
        path: '/index/plan/weekSummaryAdd/:id/:type',
        name: 'weekSummaryAdd',
        component: weekSummaryAdd
    },
    {
        path: '/index/plan/weekPlanEdit/:id',
        name: 'weekPlanEdit',
        component: weekPlanEdit
    },
    {
        path: '/index/plan/otherPlanEdit/:id',
        name: 'otherPlanEdit',
        component: otherPlanEdit
    },
    {
        path: '/index/plan/monthPlan',
        name: 'monthPlan',
        component: monthPlan
    },
    {
        path: '/index/plan/monthTarget/create',
        name: 'monthTargetCreate',
        component: monthTargetCreate
    },
    {
        path: '/index/plan/monthTarget/details/:id',
        name: 'monthTargetDetails',
        component: monthTargetDetails
    },
    {
        path: '/index/plan/monthTarget/details/edit/:id',
        name: 'monthTargetDetailsEdit',
        component: monthTargetDetailsEdit
    },
    {
        path: '/index/plan/monthTarget/monthSummaryAdd/:id/:type',
        name: 'monthSummaryAdd',
        component: monthSummaryAdd
    },
    {
        path: '/index/plan/year/personal',
        name: 'yearTargetPersonal',
        component: yearTargetPersonal
    },
    {
        path: '/index/plan/yearlist/:id/:name',
        name: 'yearlistDetail',
        component: yearlistDetail
    },
    {
        path: '/index/plan/yearPlanAddPerson/:id/:name',
        name: 'yearPlanAddPerson',
        component: yearPlanAddPerson
    },
    {
        path: '/index/plan/yearPlanAddCause',
        name: 'yearPlanAddCause',
        component: yearPlanAddCause
    },
    {
        path: '/index/plan/yearTargetDetails/:id',
        name: 'yearTargetDetails',
        component: yearTargetDetails
    },
    {
        path: '/index/plan/yearTargetEdit/:id',
        name: 'yearTargetEdit',
        component: yearTargetEdit
    },
    {
        path: '/index/plan/yearPlanPersonEdit/:id/:name',
        name: 'yearPlanPersonEdit',
        component: yearPlanPersonEdit
    },
    {
        path: '/index/plan/yearPlanPersonDetails/:id/:name',
        name: 'yearPlanPersonDetails',
        component: yearPlanPersonDetails
    }
]
