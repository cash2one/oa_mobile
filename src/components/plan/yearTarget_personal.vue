<template>
    <div class="yearTarget_personal">
        <div>
            <div class="date-wrapper">
                <div class="date-title">今年工作目标</div>
                <p class="time_year"><span v-html="year"></span></p>
                 <!-- @click="popupVisible = true" -->
            </div>
            <div class="finishNum">
                <div>
                    <p v-html="total">0</p>
                    <p>总计目标</p>
                </div>
                <div>
                    <p v-html="finish">0</p>
                    <p>已完成</p>
                </div>
            </div>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">个人目标</mt-tab-item>
                <mt-tab-item id="2">事业目标</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1" class="target">
                    <div class="work-target">
                        <ul>
                            <li class="work-target-content" v-for="item in list2" @click="godetails(item.cate_id, item.cate_name)">
                                <p class="yearTarget-title" v-html="item.cate_name">学习</p>
                                <ul class="content-list">
                                    <li v-for="obj in item.list" v-html="obj.content"></li>
                                </ul>
                            </li>
                            <li class="work-target-content" @click="addClassify">其他</li>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="other-target-list">
                        <div class="other-target-wrapper">
                            <div class="other-target-content" v-for="(item, index) in list1">
                                <div class="other-target-flex">
                                    <div>
                                        <p class="time"><span v-html="item.start_time"></span>--<span v-html="item.end_time"></span></p>
                                        <p class="title" v-html="item.content"></p>
                                        <p class="methods" @click="checkDetails(item.id)">查看方法和措施 ></p>
                                    </div>
                                    <div>
                                        <div>
                                            <span :class="{active: item.is_success}" @click.stop="finishItem(index, item.id)">
                                                <i style="font-style: normal" v-if="!item.is_success">完成</i>
                                                <img v-if="item.is_success" src="../../assets/icon/yes_check.png" width="15">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <mt-button type="primary" class="submitBtn" @click="goAddCause">
                        <span>新建目标</span>
                    </mt-button>
                </mt-tab-container-item>
            </mt-tab-container>
            <mt-popup v-model="popupVisible" position="bottom">
                <div class="operation">
                    <div class="cancel" @click="close_time">取消</div>
                    <div class="confirm" @click="opt_time">确认</div>
                </div>
                <mt-picker :slots="slots" @change="onValuesChange">
                    <div>123</div>
                </mt-picker>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'yearTarget_personal',
        data () {
            return {
                selected: '1',
                popupVisible: false,
                year: '',
                opt_year: '',
                slots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        showToolbar: true
                    }
                ],
                total: 0,
                finish: 0,
                list1: [],
                list2: []
            }
        },
        mounted () {
            var date = new Date();
            this.year = date.getFullYear();
            this.getlist(1);
            this.getlist(2);
            var yearmin = this.year;
            var yearMax = this.year;
            for (var i = 0; i < 5; i++) {
                this.slots[0].values.unshift(yearmin);
                yearmin--;
            };
            for (var j = 0; j < 5; j++) {
                yearMax++;
                this.slots[0].values.push(yearMax);
            };
            this.slots[0].defaultIndex = 4;
            this.opt_year = date.getFullYear();
            this.getFinishNum();
        },
        methods: {
            getlist (type) {
                myFn.ajax('get', {type: type, start_time: this.year}, apiAddress.plan.yearList, (res) => {
                    switch (parseInt(type)) {
                        case 1:
                            this.list1 = res.data.data;
                            break;
                        case 2:
                            this.list2 = res.data;
                            break;
                    }
                })
            },
            onValuesChange (picker, value) {
                this.year = value[0];
            },
            godetails (id, name) {
                this.$router.push({name: 'yearlistDetail', params: {id: id, name: name}})
            },
            goAddCause () {
                this.$router.push({name: 'yearPlanAddCause'})
            },
            checkDetails (id) {
                this.$router.push({name: 'yearTargetDetails', params: {id: id}})
            },
            finishItem (index, id) {
                myFn.ajax('get', {model_type: 4, id: id}, apiAddress.plan.finish, (res) => {
                    this.list1[index].is_success = !this.list1[index].is_success;
                    if (this.list1[index].is_success) {
                        this.finish ++;
                    } else {
                        this.finish --;
                    }
                })
            },
            getFinishNum () {
                myFn.ajax('get', {model_type: 4, time: this.opt_year}, apiAddress.plan.getFinishNum, (res) => {
                    this.total = res.data.all;
                    this.finish = res.data.yes;
                })
            },
            addClassify () {
                MessageBox.prompt('请输入分类名称').then(({ value, action }) => {
                    console.log(value, action)
                    if (!value) return;
                    myFn.ajax('post', {cate_name: value}, apiAddress.plan.yearPlanClassifyAdd, (res) => {
                        this.list2.push({cate_id: res.data.id, cate_name: value})
                    })
                }, cancel => {
                    console.log('取消')
                });
            },
            opt_time () {
                this.opt_year = this.year;
                this.getlist(1);
                this.getlist(2);
                this.getFinishNum();
                this.popupVisible = false;
            },
            close_time () {
                this.popupVisible = false;
            }
        },
        watch: {
            selected: function () {
                switch (parseInt(this.selected)) {
                    case 1:
                        break;
                    case 2:
                        break;
                }
            }
        }
    }
</script>

<style>
    .yearTarget_personal .mint-tab-item-label {
        font-size: 15px;
        /*border-bottom: 1px #ccc solid;*/
    }
    .yearTarget_personal .mint-navbar .mint-tab-item.is-selected {
        border-bottom-width: 0px;
        position: relative;
        margin-bottom: -4px;
    }
    .yearTarget_personal .mint-navbar .mint-tab-item.is-selected:after {
        content: '';
        width: 40%;
        border-bottom: 1px solid #26a2ff;
        position: absolute;
        bottom: 3px;
        left: 30%;
    }
    .yearTarget_personal .mint-tab-container-wrap {
        height: 100%;
    }
    .yearTarget_personal .mint-tab-container-item {
        background: #fff;
    }
    .mint-navbar {
        border-bottom: 1px #ccc solid;
    }
    .yearTarget_personal .mint-popup-bottom {
        width: 100%;
    }
</style>

<style scoped>
    .date-wrapper {
        background: #fff;
        padding-top: 10px;
        padding-bottom: 20px;
        text-align: center;
        color: #999;
    }
    .date-title {
        font-size: 12px;
        margin: 10px 0;
    }
    .time_year {
        color: #000;
        font-size: 14px;
    }
    .work-target {
        height: 50%;
    }
    .other-target-classify {
        padding: 20px 15px 10px;
        border-bottom: 1px solid #ededed;
    }
    .other-target-classify img {
        width: 15px;
        float: right;
    }
    .other-target-content {
        padding-left: 15px;
        padding-right: 15px;
        border-top: 1px #ccc solid;
        border-bottom: 1px #ccc solid;
        margin: 10px 0px;
    }
    .other-target-flex {
        display: flex;
        padding: 10px 0;
    }
    .other-target-flex p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other-target-flex > div {
        flex: 1;
    }
    .other-target-flex .time {
        font-size: 13px;
        color: #999;
    }
    .other-target-flex .title {
        font-size: 18px;
        margin-top: 10px;
    }
    .other-target-flex .methods {
        margin-top: 10px;
        font-size: 12px;
        color: #26a2ff;
    }
    .other-target-flex > div:first-child {
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other-target-flex > div:last-child {
        text-align: right;
        margin-top: 10px;
    }
    /* .other-target-flex > div:last-child > div img {
        display: block;
    } */
    .other-target-flex > div:last-child > div span{
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid #999;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        margin-top: 15px;
    }
    .other-target-flex > div:last-child > div span.active {
        border-color: #1B69FE;
    }
    .finishNum {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ededed;
        padding-bottom: 20px;
    }
    .finishNum > div {
        flex: 1;
        text-align: center;
    }
    .finishNum > div p:first-child {
        font-size: 24px;
    }
    .finishNum > div p:last-child {
        font-size: 12px;
        color: #999;
    }
    .work-target {
        margin-top: 10px;
        font-size: 0;
        padding: 0 1%;
    }
    .work-target > ul > li {
        width: 33.333%;
        display: inline-block;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        height: 160px;
        vertical-align: top;
        overflow: auto;
    }
    .work-target > ul > li:nth-child(3n) {
        border-right: 0;
    }
    .work-target > ul > li > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .content-list > li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        padding-left: 15px;
        color: #999;
    }
    .content-list > li:before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #26a2ff;
        position: absolute;
        left: 0px;
        top: 5px;
    }
    .submitBtn {
        width: 100%;
        position: fixed;
        bottom: 0px;
        border-radius: 0;
        background: #1B69FE;
        font-size: 16px;
    }

    .yearTarget-title {
        text-align: center;
    }

    .confirm, .cancel {
        width: 50%;
        height: 40px;
        color: #26a2ff;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        border-bottom: 1px #ccc solid;
    }
    .operation {
        word-spacing: -10px;
    }
</style>