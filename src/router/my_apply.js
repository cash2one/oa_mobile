// 我的申请
import myApplyCapital from '@/components/my_apply/apply_capital' // 备用资金申请
import myApplyReceivables from '@/components/my_apply/apply_receivables' // 收款报备
import myApplyContractPayment from '@/components/my_apply/apply_contractPayment' // 合同付款申请
import myApplyReimbursement from '@/components/my_apply/apply_reimbursement' // 报销申请
import myApplyGoods from '@/components/my_apply/apply_goods' // 物品申请
import myApplyCar from '@/components/my_apply/apply_car' // 用车申请
import myApplyLeave from '@/components/my_apply/apply_leave' // 请假申请
// 重新申请
import reApplyCapital from '@/components/reApply/apply_capital' // 备用资金申请
import reApplyReceivables from '@/components/reApply/apply_receivables' // 收款报备
import reApplyContractPayment from '@/components/reApply/apply_contractPayment' // 合同付款申请
import reApplyReimbursement from '@/components/reApply/apply_reimbursement' // 报销申请
import reApplyGoods from '@/components/reApply/apply_goods' // 物品申请
import reApplyCar from '@/components/reApply/apply_car' // 用车申请
import reApplyLeave from '@/components/reApply/apply_leave' // 请假申请

export default [
    {
        path: '/index/myApply/capital/:id',
        name: 'myApplyCapital',
        component: myApplyCapital
    },
    {
        path: '/index/myApply/receivables/:id',
        name: 'myApplyReceivables',
        component: myApplyReceivables
    },
    {
        path: '/index/myApply/contractPayment/:id',
        name: 'myApplyContractPayment',
        component: myApplyContractPayment
    },
    {
        path: '/index/myApply/reimbursement/:id',
        name: 'myApplyReimbursement',
        component: myApplyReimbursement
    },
    {
        path: '/index/myApply/goods/:id',
        name: 'myApplyGoods',
        component: myApplyGoods
    },
    {
        path: '/index/myApply/car/:id',
        name: 'myApplyCar',
        component: myApplyCar
    },
    {
        path: '/index/myApply/leave/:id',
        name: 'myApplyLeave',
        component: myApplyLeave
    },
    // 重新申请
    {
        path: '/index/reApply/capital/:id',
        name: 'reApplyCapital',
        component: reApplyCapital
    },
    {
        path: '/index/reApply/receivables/:id',
        name: 'reApplyReceivables',
        component: reApplyReceivables
    },
    {
        path: '/index/reApply/contractPayment/:id',
        name: 'reApplyContractPayment',
        component: reApplyContractPayment
    },
    {
        path: '/index/reApply/reimbursement/:id',
        name: 'reApplyReimbursement',
        component: reApplyReimbursement
    },
    {
        path: '/index/reApply/goods/:id',
        name: 'reApplyGoods',
        component: reApplyGoods
    },
    {
        path: '/index/reApply/car/:id',
        name: 'reApplyCar',
        component: reApplyCar
    },
    {
        path: '/index/reApply/leave/:id',
        name: 'reApplyLeave',
        component: reApplyLeave
    }
]
