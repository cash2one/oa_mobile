<template>
    <div class="centerMyApply">
        <!-- <mt-navbar v-model="selected" class="tab-header">
            <mt-tab-item id="1">申请中</mt-tab-item>
            <mt-tab-item id="2">申请记录</mt-tab-item>
        </mt-navbar> -->
        <div class="screen-wrapper">
            <div @click="screenShow(1)">
                <span :class="[select !== ''?'select_tab':'default_tab']" v-html="apply_type"></span>
                <img src="../../assets/icon/img/down2.png" width="14" v-if="select !== ''" :class="[screen1?'screen-rotate':'']">
                <img src="../../assets/icon/img/down2_default.png" width="14" v-if="select === ''" :class="[screen1?'screen-rotate':'']">
                <ul v-if="screen1">
                    <li @click="screenQurey(0, 1)" :class="[select === '' ? 'active' : '']">
                        <span>所有类型</span>
                        <img v-if="select === ''" src="../../assets/icon/img/yes.png" width="30">
                    </li>
                    <li v-for="(item,key,index) in applyType" :class="[parseInt(index) == parseInt(select) ? 'active' : '']"  @click="screenQurey(1, key, index)">
                        <span v-html="item"></span>
                        <img v-if="parseInt(index) == parseInt(select)" src="../../assets/icon/img/yes.png" width="30">
                    </li>
                </ul>
            </div>
            <div @click="screenShow(2)">
                <span :class="[select2 !== ''?'select_tab':'default_tab']" v-html="apply_status"></span>
                <img src="../../assets/icon/img/down2.png" width="14" v-if="select2 !== ''" :class="[screen2?'screen-rotate':'']">
                <img src="../../assets/icon/img/down2_default.png" width="14" v-if="select2 === ''" :class="[screen2?'screen-rotate':'']">
                <ul v-if="screen2">
                    <li @click="screenQurey(0, 2)" :class="[select2 === '' ? 'active' : '']">
                        <span>所有状态</span>
                        <img v-if="select2 === ''" src="../../assets/icon/img/yes.png" width="30">
                    </li>
                    <li v-for="(item,key,index) in applyState" :class="[parseInt(index) == parseInt(select2) ? 'active' : '']" @click="screenQurey(2, key, index)">
                        <span v-html="item"></span>
                        <img v-if="parseInt(index) == parseInt(select2)" src="../../assets/icon/img/yes.png" width="30">
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-if="isShow"></div>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li class="item" v-for="(item,index) in list1" @click="go_details(item.type,item.id)">
                        <div class="title">【<span v-html="applyType[item.type]"></span>】<span class="time" v-html="item.update_time.substr(-8, 10)"></span></div>
                        <p class="date" v-html="item.create_time.substr(0, 10)"></p>
                        <div class="content">
                            <div class="box1">
                                <p class="title">当前步骤</p>
                                <p class="val" v-html="item.name"></p>
                            </div>
                            <div class="box2">
                                <p class="title">进展状态</p>
                                <p class="val status-red" v-if="item.status == 1">审核中</p>
                                <p class="val status-green" v-if="item.status == 2">已审批</p>
                                <p class="val status-red" v-if="item.status == 3">已拒绝</p>
                                <p class="val" v-if="item.status == 4">等待中</p>
                                <p class="val" v-if="item.status == 5">已取消</p>
                            </div>
                            <div class="box3">
                                <mt-button @click.stop="toggleShow(item)" size="small" type="primary">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </mt-button>
                            </div>
                        </div>
                        <div class="operat" v-if="item.operation">    <!--  -->
                            <!-- <p  v-if="item.status != 1" @click.stop="reApply(item.type,item.id)">
                                <img src="../../assets/icon/delete.png" width="14">
                                <span>再次申请</span>
                                <span v-if="item.status == 2">重新申请</span>
                            </p> -->
                            <!-- <p v-if="item.status == 3 || item.status == 5" @click.stop="deleteItem(1,index,item.id)"><img src="../../assets/icon/delete.png" width="14"><span>删除</span></p> -->
                            <p @click.stop="deleteItem(1,index,item.id)"><img src="../../assets/icon/delete.png" width="14"><span>删除</span></p>
                            <p v-if="item.status == 1 || item.status == 4" @click.stop="concelItem(1,index,item.id)"><img src="../../assets/icon/concel.png" width="14"><span>取消</span></p>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul>
                    <li class="item" v-for="(item,index) in list2">
                        <div class="title"><span v-html="applyType[item.type]"></span><span class="time" v-html="item.update_time">12:00:00</span></div>
                        <p class="date" v-html="item.create_time"></p>
                        <div class="content">
                            <div class="box1">
                                <p class="title">当前步骤</p>
                                <p class="val" v-html="item.status"></p>
                            </div>
                            <div class="box2">
                                <p class="title">进展状态</p>
                                <p class="val" v-html="item.status"></p>
                            </div>
                            <div class="box3">
                                <mt-button @click.stop="toggleShow(item)" size="small" type="primary">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </mt-button>
                            </div>
                        </div>
                        <div class="operat" v-show="item.operation">    <!--  -->
                            <p @click.stop="reApply(item.type,item.id)"><img src="../../assets/icon/reviewed.png" width="14"><span>重新申请</span></p>
                            <p  @click.stop="deleteItem(2,index,item.id)"><img src="../../assets/icon/delete.png" width="14"><span>删除</span></p>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'centerMyApply',
        data () {
            return {
                selected: '1',
                list1: [],
                list2: [],
                applyType: {},
                applyState: {},
                screen1: false,
                screen2: false,
                query: {
                    type: '',
                    status: ''
                },
                // 加载更多
                loading: false,
                current_page: 0,
                current_length: 0,
                total: 1,
                isShow: false,
                select: '',
                select2: '',
                apply_type: '所有类型',
                apply_status: '所有状态'
            }
        },
        mounted () {
            // alert(JSON.stringify(localStorage.applyState))
            // this.getData(1, 2);
            this.applyType = JSON.parse(localStorage.applyType);
            this.applyState = {
                '1': '审核中',
                '2': '已通过',
                '3': '已拒绝',
                '4': '等待中',
                '5': '已取消'
            }
        },
        methods: {
            getData: function (page) {
                var data = {};
                data.page = page || '';
                myFn.ajax('get', data, apiAddress.center.myApply, (res) => {
                    for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].operation = false;
                    };
                    this.list1 = this.list1.concat(res.data.data);
                    this.total = res.data.total;
                    this.current_length = this.list1.length;
                    this.loading = false;
                })
            },
            loadMore: function () {
                this.loading = true;
                if (this.current_length >= this.total) return false;
                this.current_page ++;
                this.getData(this.current_page);
            },
            deleteItem: function (type, index, id) {
                MessageBox.confirm('确定取消申请?').then(action => {
                    myFn.ajax('get', {id: id}, apiAddress.center.applyDel, (res) => {
                        switch (type) {
                            case 1:
                                this.list1.splice(index, 1);
                                break;
                            case 2:
                                this.list2.splice(index, 1);
                                break;
                        }
                        alert('删除成功');
                        this.current_length = this.list1.length;
                    })
                }, cancel => {
                    console.log(2)
                });
            },
            concelItem: function (type, index, id) {
                MessageBox.confirm('确定取消申请?').then(action => {
                    myFn.ajax('get', {id: id}, apiAddress.center.applyConcel, (res) => {
                        /* switch (type) {
                            case 1:
                                this.list1.splice(index, 1);
                                break;
                            case 2:
                                this.list2.splice(index, 1);
                                break;
                        } */
                        this.list1[index].status = 5;
                        alert('取消成功');
                    })
                }, cancel => {
                    console.log(2)
                });
            },
            reApply: function (type, id) {
                switch (parseInt(type)) {
                    case 1:
                        window.vm.$router.push({name: 'reApplyCar', params: {id: id}});
                        break;
                    case 2:
                        window.vm.$router.push({name: 'reApplyReimbursement', params: {id: id}});
                        break;
                    case 3:
                        window.vm.$router.push({name: 'reApplyContractPayment', params: {id: id}});
                        break;
                    case 4:
                        window.vm.$router.push({name: 'reApplyReceivables', params: {id: id}});
                        break;
                    case 6:
                        window.vm.$router.push({name: 'reApplyCapital', params: {id: id}});
                        break;
                    case 7:
                        window.vm.$router.push({name: 'reApplyLeave', params: {id: id}});
                        break;
                    case 8:
                        window.vm.$router.push({name: 'reApplyGoods', params: {id: id}});
                        break;
                }
            },
            go_details: function (type, id) {
                switch (parseInt(type)) {
                    case 1:
                        window.vm.$router.push({name: 'myApplyCar', params: {id: id}});
                        break;
                    case 2:
                        window.vm.$router.push({name: 'myApplyReimbursement', params: {id: id}});
                        break;
                    case 3:
                        window.vm.$router.push({name: 'myApplyContractPayment', params: {id: id}});
                        break;
                    case 4:
                        window.vm.$router.push({name: 'myApplyReceivables', params: {id: id}});
                        break;
                    case 6:
                        window.vm.$router.push({name: 'myApplyCapital', params: {id: id}});
                        break;
                    case 7:
                        window.vm.$router.push({name: 'myApplyLeave', params: {id: id}});
                        break;
                    case 8:
                        window.vm.$router.push({name: 'myApplyGoods', params: {id: id}});
                        break;
                }
            },
            toggleShow (item) {
                item.operation = !item.operation;
            },
            screenShow: function (tag) {
                switch (tag) {
                    case 1:
                        this.screen1 = !this.screen1;
                        this.screen2 = false;
                        break;
                    case 2:
                        this.screen2 = !this.screen2;
                        this.screen1 = false;
                        break;
                }
                if ((this.screen1 && !this.screen2) || (!this.screen1 && this.screen2)) {
                    this.isShow = true;
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    this.isShow = false;
                    document.documentElement.style.overflow = 'auto';
                }
            },
            screenQurey: function (type, key, index) {
                // console.log(type, index)
                switch (type) {
                    case 0:
                        if (parseInt(key) === 1) {
                            this.query.type = '';
                            this.select = '';
                            this.apply_type = '所有类型';
                        } else {
                            this.query.status = '';
                            this.select2 = '';
                            this.apply_status = '所有状态';
                        }
                        break;
                    case 1:
                        this.query.type = key;
                        this.select = index;
                        // this.select2 = '';
                        // console.log(key)
                        this.apply_type = this.applyType[key];
                        break;
                    case 2:
                        this.query.status = key;
                        // this.select = '';
                        this.select2 = index;
                        this.apply_status = this.applyState[index + 1];
                        break;
                }
                myFn.ajax('get', this.query, apiAddress.center.myApply, (res) => {
                    this.list1 = res.data.data;
                })
            }
        }
    }
</script>

<style>
    .centerMyApply .tab-header {
        border-bottom: 1px solid #ededed!important;
    }
    .centerMyApply .mint-navbar .mint-tab-item.is-selected {
        border: 0;
    }
    .centerMyApply .mint-tab-item {
        position: relative;
        padding: 0;
        height: 51px;
    }
    .centerMyApply .mint-tab-item-label {
        height: 29px;
        width: 74%;
        border-radius: 5px;
        border: 1px solid #1b69fe;
        line-height: 29px;
        margin-top: 10px;
        position: absolute;
        font-size: 15px;
        color: #1b69fe;
    }
    .centerMyApply .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        background: #1b69fe;
        color: #fff;
    }
    .centerMyApply .mint-tab-item:first-child .mint-tab-item-label{
        right: -5px;
    }
    .centerMyApply .mint-tab-item:last-child .mint-tab-item-label{
        left: -5px;
    }
</style>
<style scoped>
    .select_tab {
        color: #1b69fe;
    }
    .default_tab {
        color: #b3b3b3;
    }
    .active {
        color: #1b69fe;
    }
    .tab-header {
        border-bottom: 2px #ccc solid;
    }
/*    .centerMyApply ul {
        background: red;
        line-height: 1.5;
    }*/
    .centerMyApply .item {
        background: #fff;
        padding-top: 20px;
        border-bottom: 1px solid #ededed;
    }
    .centerMyApply .item >.title {
        font-size: 16px;
        padding: 0 10px;
        color: #333;
    }
    .centerMyApply .item .date {
        font-size: 14px;
        margin: 3px 0 20px;
        color: #b3b3b3;
        padding-left: 18px;
    }
    .box1{
        padding-right: 20px;
        padding-left: 10px;
        border-right: 1px solid #ddd;
    }
    .box2{
        margin-left: -20px;
    }
    .title .time {
        font-size: 14px;
        color: #b3b3b3;
        float: right;
        display: inline-block;
        margin: 3px;
    }
    .content .title {
        margin-bottom: 5px;
        font-size: 15px;
        color: #333;
    }
    .centerMyApply .item .content {
        padding: 0 8px;
        padding-bottom: 15px;
    }
    .centerMyApply .item .content > div{
        display: inline-block;
        text-align: center;
        margin-right: 30px;
    }
    .centerMyApply .item .content .val {
        color: #ababab;
        font-size: 14px;
    }
    .centerMyApply .item .content .box3 {
        text-align: center;
        vertical-align: top;
        margin-top: 17px;
        position: absolute;
        right: 15px;
        margin-right: 0;
        font-size: 12px;
    }
    .centerMyApply .item .content .box3 button {
        width: 49px;
        height: 22px;
        background: none;
        border: 1px solid #c7c7c7;
        color: #b3b3b3;
    }
    .operat {
        padding: 14px;
        background: #fafafa;
        color: #757575;
        text-align: right;
    }
    .operat p {
        margin-left: 15px;
        display: inline-block;
    }
    .operat p img {
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
    }
    .operat p span {
        vertical-align: middle;
        font-size: 14px;
    }
    .dot {
        position: relative;
        width: 4px;
        height: 4px;
        display: inline-block;
    }
    .dot:after {
        content: "";
        top: -2px;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        background: #c7c7c7;
    }
    .status-blue {
        color: #477bdf !important;
    }
    .status-red {
        color: red !important;
    }
    .screen-wrapper {
        width: 100%;
        height: 44px;
        font-size: 0;
        display: flex;
        background-color: #fff;
        border-bottom: 1px solid #ededed;
    }
    .screen-wrapper span,
    .screen-wrapper img {
        vertical-align: middle;
    }
    .screen-wrapper img {
        margin-left: 10px;
    }
    .screen-wrapper > div {
        flex: 1;
        width: 50%;
        height: 100%;
        font-size: 16px;
        line-height: 44px;
        text-align: center;
        position: relative;
        display: inline-block;
    }
    .screen-wrapper > div:first-child:after {
        content: '';
        width: 1px;
        height: 100%;
        background: #ededed;
        position: absolute;
        right: 0;
    }
    .screen-wrapper > div > ul {
        width: 200%;
        position: absolute;
        top: 45px;
        z-index: 2;
        padding: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #ededed;
        background-color: #fff;
        border-right: 1px solid #fff;
    }
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 45px;
        z-index: 1;
        bottom: 0;
        background: rgba(0,0,0,0.5);
    }
    .screen-wrapper > div:first-child > ul{
        left: 0;
    }
    .screen-wrapper > div:last-child > ul{
        right: 0;
    }
    .screen-wrapper > div > ul > li {
        font-size: 14px;
        background-color: #fff;
        /* border-top: 1px solid #ededed; */
    }
    .screen-wrapper > div > ul > li:first-child {
        border-top: 0;
    }
    .screen-wrapper > div > ul > li {
        padding-left: 10px;
        text-align: left;
    }
    .screen-rotate {
        -webkit-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }
</style>
