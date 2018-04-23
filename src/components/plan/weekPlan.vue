<template>
    <div class="weekpPlan">
        <div :class="{otherPage:isOtherPage}">
            <div class="date-wrapper">
                <img src="../../assets/icon/date.png">
                <input id="startTime" type="date" :class="[isIOS?'inputIOS':'inputAndroid']" @change="startTimeChange">
                <div class="date-title">周工作目标</div>
            </div>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">工作目标</mt-tab-item>
                <mt-tab-item id="2">其他目标</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected" :class="{otherPageTab:isOtherPage}">
                <mt-tab-container-item id="1">
                    <div class="flex">
                        <div>优先顺序</div>
                        <div>目标内容</div>
                        <div>完成期限</div>
                    </div>
                    <p v-if="list1.length == 0" style="text-align: center; margin-top: 30px; color: #999;font-size: 15px;">还没有制定目标...</p>
                    <div class="target-content">
                        <div class="target" v-for="(item,index) in list1" @click="goEdit(1, item.id)">
                            <div v-html="item.prior_code">A</div>
                            <div v-html="item.content" class="text-overflow">季度总计会议季度总计H会议</div>
                            <div @click.stop="finish(index, item.id)">
                                <div class="unfinish-wrapper" v-if="!item.is_success">
                                    <p v-html="item.dead_time">周五</p>
                                    <p class="unfinish">未完成</p>
                                </div>
                                <div v-if="item.is_success">
                                    <img src="../../assets/icon/yes_check.png" width="15">
                                    <p class="text-overflow" v-html="item.dead_time">周二</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weekSummary" v-if="hasSummary">
                        <div class="line"></div>
                        <div class="summary-title"><span>周总结</span></div>
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
                            <p v-html="summaryList.overcome">情况内容A</p>
                        </div>
                        <div>
                            <div class="label">本周创新与收获</div>
                            <p v-html="summaryList.harvest">情况内容A</p>
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
                            <div v-if="item.isShow" class="other-target-content" v-for="(obj,key) in item.list" @click="goEdit(2, obj.id)">
                                <div class="other-target-flex">
                                    <div v-html="obj.content">购买xx基金</div>
                                    <div>
                                        <div v-if="obj.is_success == 0"><span @click.stop="finish2(index, key, obj.id)">完成</span></div>
                                        <div v-if="obj.is_success == 1" @click.stop="finish2(index, key, obj.id)">
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
            <!-- <button v-if="hasSummary" class="my-btn" @click="weekAdd">+ 添加周目标</button> -->
            <div class="btn-group">
                <div @click="weekAdd">+添加周目标</div>
                <div v-if="!hasSummary" @click="weekEditSummary(1)">写本周总结</div>
                <div v-if="hasSummary" @click="weekEditSummary(2)">编辑周总结</div>
            </div>
            <mt-datetime-picker ref="picker" v-model="pickerValue1" type="date"></mt-datetime-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'weekpPlan',
        data () {
            return {
                selected: '1',
                isOtherPage: false,
                list1: [],
                list2: [],
                date: '',
                pickerValue1: new Date(),
                summaryList: {},
                hasSummary: false,
                isIOS: ''
            }
        },
        mounted () {
            this.isIOS = window.isIOS;
            /* this.getlist(1);
            this.getlist(2);
            this.getWeekSummary(); */
            $('.v-modal').live('click', function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            $('.picker-toolbar').click(function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            document.getElementById('startTime').value = myFn.getToday();
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
                    week_start: this.date
                }
                myFn.ajax('get', data, apiAddress.plan.weekList, (res) => {
                    if (parseInt(type) === 1) {
                        this.list1 = res.data;
                    } else if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].isShow = true;
                        };
                        this.list2 = res.data;
                    }
                })
            },
            getWeekSummary () {
                var data = {
                    type: 1,
                    sum_start_time: this.date
                }
                myFn.ajax('get', data, apiAddress.plan.weekSummaryDetails, (res) => {
                    this.summaryList = res.data;
                    if (res.data.id) {
                        this.hasSummary = true;
                    } else {
                        this.hasSummary = false;
                    }
                })
            },
            weekAdd () {
                this.$router.push({name: 'weekPlanAdd'})
            },
            weekEditSummary (type) {
                this.summaryList.id = this.summaryList.id || 0;
                this.$router.push({name: 'weekSummaryAdd', params: {type: type, id: this.summaryList.id}})
            },
            finish (index, id) {
                myFn.ajax('get', {model_type: 2, id: id}, apiAddress.plan.finish, (res) => {
                    this.list1[index].is_success = !this.list1[index].is_success;
                })
            },
            finish2 (index, index2, id) {
                myFn.ajax('get', {model_type: 2, id: id}, apiAddress.plan.finish, (res) => {
                    this.list2[index].list[index2].is_success = !this.list2[index].list[index2].is_success;
                })
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
                console.log(value)
                var date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
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
            }/* ,
            pickerValue1: function () {
                this.date = this.getDate(this.pickerValue1);
                this.getlist(1);
                this.getlist(2);
                this.getWeekSummary();
            } */
        }
    }
</script>

<style>
    .weekpPlan .inputIOS {
        display: inline-block;
        font-size: 14px;
    }
    .weekpPlan .inputAndroid {
        font-size: 16px;
        border: 0;
        text-align: right;
        padding-right: 10px;
        display: inline-block;
    }
    .weekpPlan .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .weekpPlan .mint-tab-item-label {
        font-size: 16px;
    }
    .weekpPlan .mint-navbar .mint-tab-item.is-selected {
        border-bottom-width: 0px;
        position: relative;
        color: #1b69fe;
    }
    .weekpPlan .mint-navbar .mint-tab-item.is-selected:after {
        content: '';
        width: 40%;
        border-bottom: 1px solid #1b69fe;
        position: absolute;
        bottom: 3px;
        left: 30%;
    }
    .weekpPlan .mint-tab-container {
        margin-bottom: 65px;
    }
</style>

<style scoped>
    #startTime {
        display: inline-block;
        width: auto;
        font-size: 16px;
        vertical-align: middle;
        line-height: 1.0;
        text-align: right;
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
        border-bottom: 1px solid #ededed;
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
    .flex {
        display: flex;
        padding: 10px 15px;
        background: #fff;
        margin-top: 10px;
        color: #666;
        font-size: 14px;
    }
    .flex > div {
        flex: 1;
    }
    .flex > div:first-child {
        text-align: left;
    }
    .flex > div:nth-child(2) {
        text-align: center;
    }
    .flex > div:last-child {
        text-align: right;
    }
    .target-content {
        background: #fff;
    }
    .target-content .target {
        display: flex;
        text-align: center;
        padding: 20px 0;
        border-top: 1px solid #ededed;
        color: #666;
        line-height: 60px;
    }
    .target-content .target > div:first-child {
        flex: 1;
    }
    .target-content .target > div:nth-child(2) {
        flex: 2.5;
        color: #000;
    }
    .target-content .target > div:last-child {
        flex: 1;
        height: 62px;
    }
    .target-content .target > div:last-child p {
        line-height: 1.5;
    }
    .target-content .target > div:last-child p:first-child {
        margin-top: 10px;
    }
    .target-content .target > div:last-child > div {
        display: inline-block;
        width: 60px;
        height: 60px;
        border: 1px solid #26a2ff;
        border-radius: 50%;
        font-size: 0;
        line-height: 1.5;
    }
    .target-content .target > div:last-child > div img {
        margin-top: 10px;
    }
    .target-content .target > div:last-child > div p {
        font-size: 16px;
        color: #26a2ff;
    }
    .target-content .target > div:last-child > div.unfinish-wrapper {
        border-color: #ccc;
    }
    .target-content .target > div:last-child > div.unfinish-wrapper p {
        font-size: 13px;
        color: #ccc;
    }
    .unfinish {
        font-size: 12px;
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
        color: #fff;
        border: 0;
        width: 100%;
        height: 42px;
        outline: none;
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
        line-height: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other-target-flex > div:last-child {
        text-align: right;
        padding-top: 10px;
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