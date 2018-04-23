<template>
    <div class="applyList">
        <mt-navbar v-model="selected" class="tab-header">
            <mt-tab-item id="1">未处理</mt-tab-item>
            <mt-tab-item id="2">已处理</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="apply-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading1" infinite-scroll-distance="10">
                    <li v-for="item in list1" class="apply-content" @click="go_details(item.type,item.id,1)">
                        <p class="apply-title">【<span v-html="applyType[item.type]">请假申请</span>】<span v-html="item.update_time.substr(-8, 10)"></span></p>
                        <p class="apply-name" v-html="item.username">谭某某</p>
                        <p class="apply-date" v-html="item.create_time.substr(0, 10)">2017-09-05</p>
                    </li>
                    <div class="fading-circle" v-if="current_length[0]<total[0]">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        <span>加载中</span>
                    </div>
                    <p v-else="list1.length == 0" style="text-align:center;font-size:14px;color:#ccc;margin-bottom:15px;">暂无更多 ...</p>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul class="apply-list" v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading2" infinite-scroll-distance="10">
                    <li v-for="item in list2" class="apply-content" @click="go_details(item.type,item.id,2)">
                        <p class="apply-title">【<span v-html="applyType[item.type]">请假申请</span>】<span v-html="item.update_time.substr(-8, 10)"></span></p>
                        <p class="apply-name" v-html="item.username">谭某某</p>
                        <p class="apply-date" v-html="item.create_time.substr(0, 10)">2017-09-05</p>
                    </li>
                    <div class="fading-circle" v-if="current_length[1]<total[1]">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        <span>加载中</span>
                    </div>
                    <p v-else="list2.length == 0" style="text-align:center;font-size:14px;color:#ccc;">暂无更多 ...</p>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: 'applyList',
        data () {
            return {
                selected: '1',
                list1: [],
                list2: [],
                applyType: {},
                // 加载更多
                total: [1, 1],
                current_length: [0, 0],
                current_page: [0, 0],
                loading1: false,
                loading2: false
            }
        },
        mounted () {
            this.applyType = JSON.parse(localStorage.applyType);
        },
        methods: {
            loadMore: function () {
                this.loading1 = true;
                this.current_page[0] ++;
                if (this.current_length[0] >= this.total[0]) return false;
                this.getData(this.current_page[0], 1);
            },
            loadMore2: function () {
                this.loading2 = true;
                this.current_page[1] ++;
                if (this.current_length[1] >= this.total[1]) return false;
                this.getData(this.current_page[1], 2);
            },
            getData: function (page, type) {
                var data = {};
                data.page = page || '';
                data.status = type || '';
                myFn.ajax('get', data, apiAddress.home.receivedList, (res) => {
                    switch (parseInt(type)) {
                        case 1:
                            this.list1 = this.list1.concat(res.data.data);
                            this.current_length[type - 1] = this.list1.length;
                            break;
                        case 2:
                            this.list2 = this.list2.concat(res.data.data);
                            this.current_length[type - 1] = this.list2.length;
                            break;
                    }
                    this.total[type - 1] = res.data.total;
                })
                this.loading1 = false;
                this.loading2 = false;
            },
            go_details: function (type, id, _type) {
                switch (parseInt(type)) {
                    case 1:
                        window.vm.$router.push({name: 'receivedApplyCar', params: {id: id, type: _type}});
                        break;
                    case 2:
                        window.vm.$router.push({name: 'receivedApplyReimbursement', params: {id: id, type: _type}});
                        break;
                    case 3:
                        window.vm.$router.push({name: 'receivedApplyContractPayment', params: {id: id, type: _type}});
                        break;
                    case 4:
                        window.vm.$router.push({name: 'receivedApplyReceivables', params: {id: id, type: _type}});
                        break;
                    case 6:
                        window.vm.$router.push({name: 'receivedApplyCapital', params: {id: id, type: _type}});
                        break;
                    case 7:
                        window.vm.$router.push({name: 'receivedApplyLeave', params: {id: id, type: _type}});
                        break;
                    case 8:
                        window.vm.$router.push({name: 'receivedApplyGoods', params: {id: id, type: _type}});
                        break;
                }
            }
        }
    }
</script>

<style>
    .applyList .tab-header{
        margin-top: 15px;
    }
    .applyList .mint-navbar {
        margin-bottom: 14px;
        background: none;
    }
    .applyList .mint-navbar .mint-tab-item.is-selected {
        border: 0;
    }
    .applyList .mint-tab-item {
        position: relative;
        padding: 0;
        height: 51px;
    }
    .applyList .mint-tab-item-label {
        height: 29px;
        width: 70%;
        border-radius: 5px;
        border: 1px solid #1b69fe;
        line-height: 29px;
        color: #1b69fe;
        margin-top: 10px;
        position: absolute;
    }
    .applyList .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        background: #1b69fe;
        color: #fff;
    }
    .applyList .mint-tab-item:first-child .mint-tab-item-label{
        right: -5px;
    }
    .applyList .mint-tab-item:last-child .mint-tab-item-label{
        left: -5px;
    }
</style>
<style scoped>
    .apply-list {
        padding: 0 15px;
        margin-bottom: 15px;
    }
    .apply-content {
        padding: 15px;
        padding-left: 7px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 15px;
        border: 1px solid #dedede;
    }
    .apply-title {
        color: #333;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .apply-title span:last-child {
        font-size: 12px;
        color: #bababa;
        float: right;
    }
    .apply-name {
        font-size: 14px;
        color: #808080;
        margin-bottom: 10px;
        padding-left: 8px;
    }
    .apply-date {
        font-size: 13px;
        color: #bababa;
        padding-left: 8px;
    }
    .fading-circle {
        height: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
    }
    .fading-circle > span {
        display: inline-block;
        vertical-align: bottom;
        padding-left: 5px;
    }
</style>
