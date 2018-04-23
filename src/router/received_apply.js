/**
 * 收到申请
 */
import receivedApplyCapital from '@/components/received_apply/apply_capital' // 备用资金申请
import receivedApplyReceivables from '@/components/received_apply/apply_receivables' // 收款报备
import receivedApplyContractPayment from '@/components/received_apply/apply_contractPayment' // 合同付款申请
import receivedApplyReimbursement from '@/components/received_apply/apply_reimbursement' // 报销申请
import receivedApplyGoods from '@/components/received_apply/apply_goods' // 物品申请
import receivedApplyCar from '@/components/received_apply/apply_car' // 用车申请
import receivedApplyLeave from '@/components/received_apply/apply_leave' // 请假申请

export default [
    {
        path: '/index/received/capital/:id/:type',
        name: 'receivedApplyCapital',
        component: receivedApplyCapital
    },
    {
        path: '/index/received/receivables/:id/:type',
        name: 'receivedApplyReceivables',
        component: receivedApplyReceivables
    },
    {
        path: '/index/received/contractPayment/:id/:type',
        name: 'receivedApplyContractPayment',
        component: receivedApplyContractPayment
    },
    {
        path: '/index/received/reimbursement/:id/:type',
        name: 'receivedApplyReimbursement',
        component: receivedApplyReimbursement
    },
    {
        path: '/index/received/goods/:id/:type',
        name: 'receivedApplyGoods',
        component: receivedApplyGoods
    },
    {
        path: '/index/received/car/:id/:type',
        name: 'receivedApplyCar',
        component: receivedApplyCar
    },
    {
        path: '/index/received/leave/:id/:type',
        name: 'receivedApplyLeave',
        component: receivedApplyLeave
    }
]
