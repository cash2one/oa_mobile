<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            vacationType: {
                1: '事假',
                2: '病假',
                3: '婚假',
                4: '丧假',
                5: '调休',
                6: '产假',
                20: '其他'
            },
            receivablesType: {
                1: '现金',
                2: '银行卡',
                3: '微信',
                4: '支付宝',
                5: '银联支付'
            },
            applyType: {
                1: '用车申请',
                2: '报销申请',
                3: '合同付款申请',
                4: '收款报备申请',
                6: '备用资金申请',
                7: '请假申请',
                8: '物品申请'
            }
        }
    },
    mounted () {
        localStorage.vacationType = JSON.stringify(this.vacationType);
        localStorage.receivablesType = JSON.stringify(this.receivablesType);
        localStorage.applyType = JSON.stringify(this.applyType);
    }
}
</script>

<style scoped>
    #app {
        width: 100%;
        overflow: hidden;
    }
</style>