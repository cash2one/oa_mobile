<template>
    <div class="monthPlan">
        <div :class="{otherPage:isOtherPage}">
            <div class="date-wrapper">
                <img src="../../assets/icon/date.png">
                <input id="startTime" type="month" :class="[isIOS?'inputIOS':'inputAndroid']" @change="startTimeChange">
                <div class="date-title">月工作目标</div>
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
                <mt-tab-item id="1">工作目标</mt-tab-item>
                <mt-tab-item id="2">其他目标</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected" :class="{otherPageTab:isOtherPage}">
                <mt-tab-container-item id="1">
                    <div>
                        <ul>
                            <li class="list1" v-for="(item,index) in list1">
                                <div class="left" @click.stop="checkDetails(item.id)">
                                    <p v-html="item.content" class="text-overflow">购买理财产品</p>
                                    <span @click.stop="checkDetails(item.id)">查看方法和措施 ></span>
                                </div>
                                <div class="right" @click="finish1(index, item.id)">
                                    <div v-if="!item.is_success"><span>完成</span></div>
                                    <div v-if="item.is_success" class="is_success"><img src="../../assets/icon/yes_check.png" width="15"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="weekSummary" v-if="hasSummary">
                        <div class="line"></div>
                        <div class="summary-title"><span>月总结</span></div>
                    </div>
                    <div class="weekSummary-content" v-if="hasSummary">
                        <div>
                            <div class="label">目标完成情况</div>
                            <p v-html="summaryList.finish_description">情况内容A</p>
                        </div>
                        <div>
                            <div class="label">未完成目标的原因与障碍</div>
                            <p v-html="summaryList.finish_difficult">情况内容A</p>
                        </div>
                        <div>
                            <div class="label">克服障碍的对策和方法</div>
                            <p v-html="summaryList.harvest">情况内容A</p>
                        </div>
                        <div>
                            <div class="label">本周创新与收获</div>
                            <p v-html="summaryList.overcome">情况内容A</p>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="other-target-list">
                        <div class="other-target-wrapper" v-for="(item,index) in list2">
                            <div class="other-target-classify" @click="item.isShow = !item.isShow">
                                <span v-html="item.name">规划理财</span>
                                <!-- <img src="../../assets/icon/xxdel.png" width="20"> -->
                            </div>
                            <div v-if="item.isShow" class="other-target-content" v-for="(obj,key) in item.list">
                                <div class="other-target-flex" @click="checkDetails(obj.id)">
                                    <div v-html="obj.content">购买xx基金</div>
                                    <div @click.stop="finish2(index, key, obj.id)" >
                                        <div v-if="obj.is_success == 0"><span >完成</span></div>
                                        <div v-if="obj.is_success == 1">
                                            <div>
                                                <img src="../../assets/icon/yes_check.png" width="15">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
            <!-- <button v-if="hasSummary" class="my-btn" @click="weekAdd">+ 添加月目标</button> -->
            <div class="btn-group">
                <div @click="weekAdd">+添加月目标</div>
                <div v-if="!hasSummary" @click="weekEditSummary(1)">写本月总结</div>
                <div v-if="hasSummary" @click="weekEditSummary(2)">编辑本月总结</div>
            </div>
            <mt-datetime-picker ref="picker" v-model="pickerValue1" type="date" @confirm="handleConfirm"></mt-datetime-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'monthPlan',
        data () {
            return {
                selected: '1',
                isOtherPage: false,
                list1: [],
                list2: [''],
                date: '',
                pickerValue1: new Date(),
                summaryList: {},
                hasSummary: false,
                total: 0,
                finish: 0,
                current_Month: '',
                isIOS: ''
            }
        },
        mounted () {
            this.isIOS = window.isIOS;
            this.date = this.getDate(this.pickerValue1);
            $('.v-modal').live('click', function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            $('.picker-toolbar').click(function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            document.getElementById('startTime').value = myFn.getToday('month');
            console.log(document.getElementById('startTime').value)
            this.startTimeChange()
        },
        methods: {
            startTimeChange () {
                this.date = document.getElementById('startTime').value;
                this.getlist(1);
                this.getlist(2);
                this.getWeekSummary();
            },
            getlist (type) {
                var data = {
                    type: type,
                    month_start: this.date
                }
                myFn.ajax('get', data, apiAddress.plan.monthList, (res) => {
                    this.total = 0;
                    if (parseInt(type) === 1) {
                        this.list1 = res.data.data;
                        this.total += this.list1.length;
                        for (var j = 0; j < this.list1.length; j++) {
                            if (parseInt(this.list1[j].is_success) === 1) {
                                this.finish += 1;
                            };
                        };
                    } else if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].isShow = true;
                            this.total += res.data[i].list.length;
                            for (var k = 0; k < res.data[i].list.length; k++) {
                                if (parseInt(res.data[i].list[k].is_success) === 1) {
                                    this.finish += 1;
                                };
                            };
                        };
                        this.list2 = res.data;
                    }
                })
            },
            checkDetails (id) {
                this.$router.push({name: 'monthTargetDetails', params: {id: id}})
            },
            getWeekSummary () {
                var data = {
                    type: 2,
                    month: this.date
                }
                myFn.ajax('get', data, apiAddress.plan.weekSummaryDetails, (res) => {
                    this.summaryList = res.data;
                    if (res.data.id) {
                        this.hasSummary = true;
                    }
                })
            },
            finish1 (index, id) {
                myFn.ajax('get', {model_type: 3, id: id}, apiAddress.plan.finish, (res) => {
                    this.list1[index].is_success = !this.list1[index].is_success;
                    if (this.list1[index].is_success) {
                        this.finish += 1;
                    } else {
                        this.finish -= 1;
                    }
                })
            },
            finish2 (index, index2, id) {
                myFn.ajax('get', {model_type: 3, id: id}, apiAddress.plan.finish, (res) => {
                    this.list2[index].list[index2].is_success = !this.list2[index].list[index2].is_success;
                    if (this.list2[index].list[index2].is_success) {
                        this.finish += 1;
                    } else {
                        this.finish -= 1;
                    }
                })
            },
            handleConfirm () {
                this.total = 0;
                this.finish = 0;
                this.getlist(1);
                this.getlist(2);
                this.getWeekSummary();
            },
            weekAdd () {
                this.$router.push({name: 'monthTargetCreate'})
            },
            weekEditSummary (type) {
                this.summaryList.id = this.summaryList.id || 0;
                this.$router.push({name: 'monthSummaryAdd', params: {type: type, id: this.summaryList.id}});
            },
            goEdit (type, id) {
                var goName = '';
                if (type === 1) {
                    goName = 'weekPlanEdit';
                } else {
                    goName = 'otherPlanEdit';
                }
                this.$router.push({name: goName, params: {id: id}})
            },
            openPicker (type) {
                this.$refs.picker.open();
                document.documentElement.classList.add('prohibitOverflow')
            },
            getDate (value) {
                var date = value.getFullYear() + '-' + (value.getMonth() + 1);
                this.current_Month = date;
                return date;
            }
        },
        watch: {
            selected: function () {
                switch (parseInt(this.selected)) {
                    case 1:
                        this.isOtherPage = false;
                        break;
                    case 2:
                        this.isOtherPage = true;
                        break;
                }
            }
        }
    }
</script>

<style>
    .monthPlan .mint-tab-item-label {
        font-size: 16px;
    }
    .monthPlan .mint-navbar .mint-tab-item.is-selected {
        border-bottom-width: 0px;
        position: relative;
    }
    .monthPlan .mint-navbar .mint-tab-item.is-selected:after {
        content: '';
        width: 40%;
        border-bottom: 1px solid #26a2ff;
        position: absolute;
        bottom: 3px;
        left: 30%;
    }
    .monthPlan .mint-tab-container {
        margin-bottom: 65px;
    }
    .monthPlan .picker-items .picker-slot:nth-child(3) {
        display: none;
    }
</style>

<style scoped>
    #startTime {
        display: inline-block;
        width: auto;
        font-size: 16px;
        vertical-align: middle;
        line-height: 1.0;
    }
    .inputIOS {
        display: inline-block;
        font-size: 14px;
    }
    .inputAndroid {
        font-size: 16px;
        border: 0;
        text-align: right;
        padding-right: 10px;
        display: inline-block;
    }
    .date-wrapper > img {
        display: inline-block;
        width: 20px;
        vertical-align: middle;
    }
    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .otherPage {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .otherPageTab {
        border-top: 1px solid #ededed;
        background: #fff;
    }
    .date-wrapper {
        background: #fff;
        padding-top: 20px;
        padding-bottom: 10px;
        text-align: center;
        color: #999;
    }
    .date-wrapper > div span,
    .date-wrapper > div img {
        vertical-align: middle;
    }
    .date-wrapper > div img {
        margin-left: 10px;
    }
    .date-title {
        font-size: 12px;
        margin: 10px 0;
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
    .list1 {
        background: #fff;
        padding: 15px;
        display: flex;
        margin-top: 10px;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
    }
    .list1 > div.left {
        flex: 3.5;
        width: 0;
    }
    .list1 > div.right {
        flex: 1;
        font-size: 0;
        text-align: right;
    }
    .list1 > div.left > p:first-child{
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;
        width: 150px;
    }
    .list1 > div.left > span{
        font-size: 12px;
        color: #26a2ff;
    }
    .list1 > div.right > div {
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid #999;
        color: #999;
        border-radius: 50%;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
    }
    .list1 > div.right > div.is_success {
        border-color: #1b69fe;
    }
    .list1 > div.right > div.is_success > img {
        margin-top: 12px;
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
        padding-left: 35px;
        padding-right: 15px;
    }
    .other-target-flex {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #ededed;
    }
    .other-target-flex > div {
        flex: 1;
        color: #999;
    }
    .other-target-flex > div:first-child {
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other-target-flex > div:last-child {
        text-align: right;
    }
    .other-target-flex > div:last-child > div span{
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid #999;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
    }
    .other-target-flex > div:last-child > div div{
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid #26a2ff;
        border-radius: 50%;
        text-align: center;
        line-height: 55px;
    }
    .other-target-flex > div:last-child > div div {
        font-size: 0
    }
    .other-target-flex > div:last-child > div div img {
        margin-top: 10px;
    }
    .other-target-flex > div:last-child > div div i {
        text-align: center;
        display: block;
        line-height: 1.5;
        font-style: normal;
        font-size: 14px;
        color: #26a2ff;
    }
    .weekSummary {
        padding: 15px;
        height: 30px;
        position: relative;
    }
    .weekSummary > div.line {
        border-bottom: 1px dashed #999;
        margin-top: 16px;
    }
    .weekSummary > div.summary-title {
        width: 100%;
        position: absolute;
        text-align: center;
        margin-left: -15px;
        top: 20px;
    }
    .weekSummary > div.summary-title span {
        display: inline-block;
        padding: 0 20px;
        background: #f7f7f7;
    }
    .weekSummary-content {
        background: #fff;
        padding: 0 15px;
    }
    .weekSummary-content > div {
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
    }
    .weekSummary-content > div:last-child {
        border-bottom-width: 0;
    }
    .weekSummary-content > div p {
        margin: 10px 0;
        color: #666;
    }
    .weekSummary-content > div .label {
        padding-top: 20px;
        padding-bottom: 10px;
    }
    .my-btn {
        background: #1b69fe;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #fff;
        border: 0;
        width: 100%;
        height: 42px;
        outline: none;
    }
    .btn-group {
        position: fixed;
        width: 100%;
        height: 42px;
        bottom: 0;
        display: flex;
        line-height: 42px;
        color: #fff;
    }
    .btn-group >  div {
        flex: 1;
        text-align: center;
    }
    .btn-group >  div:first-child {
        background: #E6E6E6;
        color: #1b69fe;
    }
    .btn-group >  div:last-child {
        background: #1b69fe;
    }
    .btn-group >  div:first-child img {
        margin-top: 11px;
    }
    .btn-group >  div:last-child img {
        margin-top: 8px;
    }
</style>