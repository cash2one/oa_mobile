<template>
    <div class="work">
        <p class="date">
            <img src="../../assets/icon/date.png" width="18">
            <router-link tag="span" :to="{name: 'workCalendar'}" v-html="today">9月05日</router-link>
        </p>
        <div class="work-class">
            <p class="title">行政管理</p>
            <ul>
                <router-link tag="li" :to="{name: 'workApplyLeave' }" class="work-class-item">
                    <img src="../../assets/icon/img/leave.png" >
                    <p>请假申请</p>
                </router-link>
                <router-link tag="li" :to="{name: 'workApplyCar'}" class="work-class-item">
                    <img src="../../assets/icon/img/cars.png" >
                    <p>用车申请</p>
                </router-link>
                <router-link tag="li" :to="{name: 'workApplyGoods'}" class="work-class-item">
                    <img src="../../assets/icon/img/goods.png" >
                    <p>物品申请</p>
                </router-link>
                <!-- <router-link tag="li" :to="{name: 'checkWork'}" class="work-class-item">
                    <img src="../../assets/icon/attendance.png" >
                    <p>考勤打卡</p>
                </router-link> -->
                <router-link tag="li" :to="{name: 'sign'}" class="work-class-item">
                    <img src="../../assets/icon/img/sign.png" >
                    <p>签到</p>
                </router-link>
            </ul>
            <div class="line"></div>
        </div>
        <div class="work-class">
            <p>财务管理</p>
            <ul>
                <router-link tag="li" :to="{name: 'workApplyReimbursement'}" class="work-class-item">
                    <img src="../../assets/icon/img/bx.png" >
                    <p>报销申请</p>
                </router-link>
                <router-link tag="li" :to="{name: 'workApplyContractPayment'}" class="work-class-item">
                    <img src="../../assets/icon/img/ht.png" >
                    <p>合同付款申请</p>
                </router-link>
                <router-link tag="li" :to="{name: 'workApplyReceivables'}" class="work-class-item">
                    <img src="../../assets/icon/img/sk.png" >
                    <p>收款报备</p>
                </router-link>
                <router-link tag="li" :to="{name: 'workApplyCapital'}" class="work-class-item">
                    <img src="../../assets/icon/img/by.png" >
                    <p>备用资金申请</p>
                </router-link>
            </ul>
            <div class="line"></div>
        </div>
        <div class="work-class">
            <p>业务管理</p>
            <ul>
                <li class="work-class-item" @click="get_list">
                    <img src="../../assets/icon/img/kh.png" >
                    <p>客户管理</p>
                </li>
                <!-- <router-link tag="li" :to="{name: 'customerManagement'}" class="work-class-item">
                    <img src="../../assets/icon/img/kh.png" >
                    <p>客户管理</p> -->
                </router-link>
                <router-link tag="li" :to="{name: 'project'}" class="work-class-item">
                    <img src="../../assets/icon/img/goods.png" >
                    <p>我的项目</p>
                </router-link>
            </ul>
            <div class="line"></div>
        </div>
        <div class="work-class">
            <p>个人规划</p>
            <ul>
                <router-link tag="li" :to="{name: 'dayPlan'}" class="work-class-item">
                    <img src="../../assets/icon/img/day.png" >
                    <p>日目标</p>
                </router-link>
                <router-link tag="li" :to="{name: 'weekPlan'}" class="work-class-item">
                    <img src="../../assets/icon/img/week.png" >
                    <p>周目标</p>
                </router-link>
                <router-link tag="li" :to="{name: 'monthPlan'}" class="work-class-item">
                    <img src="../../assets/icon/img/month.png" >
                    <p>月目标</p>
                </router-link>
                <router-link tag="li" :to="{name: 'yearTargetPersonal'}" class="work-class-item">
                    <img src="../../assets/icon/img/year.png" >
                    <p>年目标</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                searchVal: '',
                list: [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2],
                today: '',
                goName: ''
            };
        },
        mounted () {
            var date = new Date();
            this.today = (date.getMonth() + 1) + '月' + date.getDate() + '日';
            // this.getCustomerList();
        },
        methods: {
            loadMore () {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);
            },
            getCustomerList () {
                myFn.ajax('get', {}, apiAddress.customer.customerList, (res) => {
                    if (res.data.data.length) {
                        this.goName = 'customerManagement'
                    } else {
                        this.goName = 'addCustomer'
                    }
                })
            },
            get_list () {
                myFn.ajax('get', {}, apiAddress.customer.customerList, (res) => {
                    var bool = false;
                    if (res.data.data.length > 0) {
                        bool = true;
                    }
                    this.$router.push({name: 'customerManagement', params: {bool}})
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .work {
        width: 100%;
        overflow-x: hidden;
        margin-bottom: 55px;
    }
    .work > div {
        background-color: #fff;
    }
    .work .date {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        background-color: #fff;
        box-sizing: border-box;
    }
    .work .date img {
        margin-right: 7px;
        vertical-align: text-top;
    }
    .work .date span {
        font-size: 18px;
        color: #1b69fe;
    }
    .work-class{
        padding: 20px 10px 10px;
        margin-top: 10px;
        box-sizing: border-box;
    }
    .work-class .title {
        font-size: 15px;
    }
    .work-class .line{
        display: none;
        width: 120%;
        border-bottom: 1px #e6e6e6 solid;
        margin-left: 11px;
    }
    .work-class ul {
        margin: 0 -20px;
        margin-top: 10px;
        padding: 7px 10px;
        font-size: 0px;
    }
    .work-class-item {
        width: 25%;
        box-sizing: border-box;
        display: inline-block;
        font-size: 13px;
        text-align: center;
    }
    .work-class-item p{
        font-size: 12px;
        white-space: nowrap;
    }
    .work-class-item img {
        width: 67%;
    }
</style>
