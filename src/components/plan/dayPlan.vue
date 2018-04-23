<template>
    <div class="dayPlan">
        <div class="date">
            <!-- <div @click="openPicker">
                <span v-html="month + '月'"></span>
                <span v-html="day + '日'"></span>
            </div> -->
            <img src="../../assets/icon/date.png">
            <input id="startTime" type="date" :class="[isIOS?'inputIOS':'inputAndroid']" @change="startTimeChange">
            <!-- <span v-html="'（' + weekday[week] + '）'"></span> -->
            <!-- <img src="../../assets/icon/pull_down.png" width="15"> -->
        </div>
        <div class="totalDay">
            <li v-for="item in totalDay" :class="[day == item?'activeDay':'']"><span v-html="item" @click="getSingLog(item)"></span></li>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
        <div class="flex todayNum">
            <div class="left">
                事项 <span v-html="total">0</span>
                <span style="margin-left: 20px">完成 <i style="font-style: normal" v-html="finishNum"></i></span>
            </div>
            <div class="right">
                <div>
                    <span @click="isShow=!isShow">优先级</span>
                    <span @click="isShow=!isShow" v-html="selected" style="display:inline-block;width:35px;text-align:center"></span>
                    <img  @click="isShow=!isShow" src="../../assets/icon/img/down.png" width="15">
                    <div class="select" v-if="isShow">
                        <div v-html="'全部'" @click="choose(1)" :class="selected == '全部'?'selected':''"></div>
                        <div v-for="item in priority" v-html="item" @click="choose(item)" :class="selected == item?'selected':''"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="thingList">
            <ul>
                <li v-if="list.length" v-for="(item, index) in list" @click="goEdit(item, item.id)">
                    <div class="before">
                        <span :class="[item.is_success?'isSuccess':'']" @click.stop="confirm(index, item.id)" >
                            <img v-if="item.is_success" src="../../assets/icon/yes_check.png" width="20">
                            <i v-if="!item.is_success" style="font-style: normal">完成</i>
                        </span>
                    </div>
                    <div class="after" v-html="item.prior_code"></div>
                    <div class="main">
                        <p class="text-overflow" v-html="item.content">季度总计会议</p>
                        <p><span v-html="item.start_time"></span> -- <span v-html="item.end_time"></span></p>
                    </div>
                </li>
            </ul>
        </div>
        <button class="my-btn" @click="goAdd">+ 添加日目标</button>
    </div>
</template>

<script>
    export default {
        name: 'dayPlan',
        data () {
            return {
                pickerVisible: '',
                year: '',
                month: '',
                day: '',
                week: '',
                totalDay: [],
                weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                list: [],
                isShow: false,
                selected: 'A',
                priority: [],
                total: '',
                finishNum: 0,
                isIOS: ''
            }
        },
        mounted () {
            this.isIOS = window.isIOS;
            this.pickerVisible = new Date();
            this.filterDate(this.pickerVisible);
            this.totalDay = this.mGetDate(this.year, this.month);
            setTimeout(function () {
                if (self.day > 5 && self.day < 10) {
                    $('.totalDay').scrollLeft(30 * (self.day - 4));
                } else if (self.day > 9) {
                    $('.totalDay').scrollLeft(17 * 4 + 60 * (this.day - 8));
                };
            }, 20)
            // this.getList();
            this.getPriority();
            $('.v-modal').live('click', function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            $('.picker-toolbar').click(function () {
                document.documentElement.classList.remove('prohibitOverflow')
            })
            document.getElementById('startTime').value = myFn.getToday();
            this.startTimeChange();
        },
        methods: {
            startTimeChange () {
                this.pickerVisible = document.getElementById('startTime').value;
            },
            getList () {
                var day = this.year + '-' + this.month + '-' + this.day;
                myFn.ajax('get', {day: day}, apiAddress.plan.daylist, (res) => {
                    this.list = res.data.data;
                    this.total = res.data.data.length;
                    var num = 0;
                    if (this.list.length) {
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].is_success) {
                                num++;
                            }
                        }
                    }
                    this.finishNum = num;
                })
            },
            getPriority () {
                myFn.ajax('get', {}, apiAddress.plan.priority, (res) => {
                    this.priority = res.data;
                })
            },
            openPicker () {
                $('#startTime').click()
                // this.$refs.picker.open();
                // document.documentElement.classList.add('prohibitOverflow')
            },
            filterDate (date) {
                var _date = new Date(date) || new Date();
                this.year = _date.getFullYear();
                this.month = parseInt(_date.getMonth() + 1) > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1);
                this.day = _date.getDate();
                console.log(this.day)
                this.week = _date.getDay();
            },
            mGetDate (year, month) {
                var d = new Date(year, month, 0);
                var dayArr = [];
                for (var i = 0; i < d.getDate(); i++) {
                    dayArr.push(i + 1);
                };
                return dayArr;
            },
            getSingLog (day) {
                this.day = parseInt(day) > 9 ? day : '0' + day;
                this.pickerVisible = this.year + '-' + this.month + '-' + this.day;
                this.getList();
                console.log(this.pickerVisible)
                document.getElementById('startTime').value = this.pickerVisible;
            },
            choose (value) {
                this.selected = value;
                if (parseInt(value) === 1) {
                    value = '';
                    this.selected = '全部';
                };
                var day = this.year + '-' + this.month + '-' + this.day;
                this.isShow = false;
                myFn.ajax('get', {day: day, prior_code: value}, apiAddress.plan.daylist, (res) => {
                    this.list = res.data.data;
                })
            },
            goEdit (item, id) {
                var isedit = 0;
                if (item.is_success) {
                    isedit = 1;
                };
                this.$router.push({name: 'dayPlanEdit', params: {id, isedit}});
            },
            goAdd () {
                this.$router.push({name: 'dayPlanAdd'});
            },
            confirm (index, id) {
                myFn.ajax('get', {id: id, model_type: 1}, apiAddress.plan.finish, (res) => {
                    this.list[index].is_success = !this.list[index].is_success;
                    var num = 0;
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].is_success) {
                            num++;
                        }
                    }
                    this.finishNum = num;
                })
            }
        },
        watch: {
            pickerVisible: function () {
                this.filterDate(this.pickerVisible);
                this.totalDay = this.mGetDate(this.year, this.month);
                this.getList();
                if (this.day > 5 && this.day < 10) {
                    $('.totalDay').scrollLeft(30 * (this.day - 4));
                } else if (this.day > 9) {
                    $('.totalDay').scrollLeft(17 * 4 + 60 * (this.day - 8));
                };
            }
        }
    }
</script>

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
    .dayPlan {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .thingList .before span.isSuccess {
        border-color: #1b69fe;
        line-height: 65px;
    }
    .totalDay {
        overflow: auto;
        background: #fff;
        margin-top: 5px;
        padding: 12px 15px;
        white-space: nowrap;
    }
    .totalDay li.activeDay {
        color: #1b69fe;
    }
    .totalDay li.activeDay span {
        display: inline-block;
        position: relative;
    }
    .totalDay li.activeDay span:after {
        content: '';
        position: absolute;
        width: 25px;
        height: 4px;
        background: #1b69fe;
        bottom: -10px;
        left: 50%;
        margin-left: -12px;
        border-radius: 4px;
    }
    .date {
        text-align: center;
        color: #999;
        padding: 15px 0;
        /* position: relative; */
        background-color: #fff;
    }
    .date > div {
        display: inline-block;
        font-size: 14px;
    }
    .date > div span,
    .date > div img {
        vertical-align: middle;
    }
    .date > img {
        display: inline-block;
        width: 20px;
        vertical-align: middle;
    }
    .date > img.left-btn {
        left: 20%;
    }
    .date > img.right-btn {
        right: 20%;
    }
    .totalDay li {
        display: inline-block;
        margin-right: 7%;
        color: #999;
        font-size: 28px;
    }
    .flex {
        display: flex;
    }
    .flex > div {
        flex: 1;
    }
    .flex > div.left {
        text-align: left;
        line-height: 30px;
    }
    .flex > div.right {
        text-align: right;
        font-size: 0;
        position: relative;
    }
    .flex > div.right > div {
        position: relative;
        display: inline-block;
        padding: 7px 15px;
        background-color: #1b69fe;
        color: #fff;
        border-radius: 30px;
        font-size: 0;
    }
    .flex > div.right .select {
        font-size: 14px;
        color: #333;
        position: absolute;
        right: 3%;
        width: 90%;
        top: 40px;
        text-align: center;
        background: #fff;
        border: 1px solid #ededed;
        border-radius: 5px;
        overflow: hidden;
    }
    .select > div {
        line-height: 20px;
    }
    .flex > div.right img,
    .flex > div.right span {
        vertical-align: middle;
    }
    .flex > div.right span {
        font-size: 14px;
    }
    .todayNum {
        padding: 15px;
        font-size: 14px;
        color: #999;
        background-color: #fff;
        margin-top: 10px;
    }
    .thingList {
        margin-bottom: 90px;
    }
    .thingList li {
        padding: 20px 15px;
        padding-right: 30px;
        background: #fff;
        height: 52px;
        margin-top: 10px;
    }
    .thingList .before {
        float: left;
    }
    .thingList .before span {
        display: inline-block;
        width: 55px;
        height: 55px;
        border: 1px solid #ccc;
        border-radius: 50%;
        font-size: 14px;
        text-align: center;
        line-height: 55px;
        color: #999;
    }
    .thingList .after {
        font-size: 20px;
        float: right;
        line-height: 57px;
        color: #999;
    }
    .thingList .main {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 80px;
        padding-right: 30px;
        line-height: 25px;
    }
    .thingList .main p {
        font-size: 13px;
        color: #9799a1;
    }
    .thingList .main p:first-child {
        font-size: 18px;
        color: #fe961b;
        margin-top: 3px;
    }
    .my-btn {
        background: #1b69fe;
        position: fixed;
        left: 32%;
        bottom: 5%;
        color: #fff;
        border: 0;
        width: 36%;
        height: 42px;
        font-size: 16px;
        border-radius: 50px;
    }
    .selected {
        background: #1b69fe;
        color: #fff;
    }
</style>