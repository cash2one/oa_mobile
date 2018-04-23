<template>
    <div class="checkWork">
        <div class="time-title" @click="opteDatePicker">
            <span class="left-btn mintui mintui-back" @click.stop="changeMonth(1)"></span>
            <span class=" right-btn mintui mintui-back" @click.stop="changeMonth(2)"></span>
            <img src="../../assets/icon/date.png" width="18">
            <span>{{selectday.year}}年{{selectday.month}}月</span>
        </div>
        <ul class="time-week">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
        </ul>
        <ul class="time-day">
            <li v-for="item in emptylist">&nbsp;</li>
            <li v-for="(item,index) in list" v-html="item.day" @click="get_details(list, index, item, pickerValue)" :class="{'today-active' : item.isActive, 'no-today-active' : item.isSelectDay, 'check': item.isCheck}" ></li>
        </ul>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_time"></mt-datetime-picker>
        <div class="today-log" v-for="item in signInfo">
            <div class="head-img">
                <img v-if="userInfo.image" :src="userInfo.image">
                <img v-else src="../../assets/icon/head.png">
            </div>
            <div class="check-info">
                <p v-html="item.name">班长大人</p>
                <p v-html="item.time">8:00</p>
            </div>
        </div>
        <div class="check-operation">
            <p class="is-check">今日打卡 <span v-html="signInfo.length">1</span> 次</p>
            <div :class="[signInfo.length>1||beforeToday?'disabled':'']" @click="sign()"  v-html="'点击打卡'"></div>
            <p class="check-num">本月打卡 <span v-html="monthSignNum">0</span> 次</p>
        </div>
        <div id="allmap"></div>
    </div>
</template>

<script>
    export default {
        name: 'checkWork',
        data () {
            return {
                // 当前选中日期
                selectday: {},
                // 当天日期
                today: {},
                // 第一周空余日期
                emptylist: '',
                // 当月有多少天
                list: [],
                // 31天的月份
                day31: [1, 3, 5, 7, 8, 10, 12],
                pickerValue: new Date(),
                // 今天是否已签到
                is_check: false,
                // 今天签到信息
                signInfo: [],
                // 本月签到次数
                monthSignNum: 0,
                userInfo: {},
                // 签到地理位置
                positionSite: {
                    x_coor: '',
                    y_coor: ''
                },
                isLocal: false,
                beforeToday: false
            };
        },
        mounted () {
            // 获取当天日期
            this.today = {
                year: this.pickerValue.getFullYear(),
                month: this.pickerValue.getMonth() + 1,
                day: this.pickerValue.getDate()
            }
            if (localStorage.userInfo !== undefined) {
                this.userInfo = JSON.parse(localStorage.userInfo);
            }
            this.set_time(this.pickerValue);
            // this.getMonthData();
            // this.getSecond();
            this.baiduMap();
            // this.getTodaySignInfo();
        },
        methods: {
            // 设置当前选中日期
            set_time (val) {
                this.selectday.month = val.getMonth() + 1;
                this.selectday.year = val.getFullYear();
                this.selectday.day = val.getDate();
                this.set_calendar(this.selectday);
            },
            set_calendar (time) {
                // 获取当前月多少天
                var dayLength = this.set_day(time);
                // 设置1号在本月第一周是第几天
                this.emptylist = this.get_week(time);
                // 填充日历,并设置当前日期
                this.list = this.fillDate(time, this.today, dayLength);
                this.getTodaySignInfo(this.today.year + '/' + this.today.month + '/' + this.today.day);
                this.getMonthData(this.selectday.year + '-' + this.selectday.month);
                this.getSecond(this.selectday.year + '-' + this.selectday.month);
            },
            // 设置当前选中月有多少天
            set_day (selectday) {
                var day = 30;
                if (this.day31.indexOf(selectday.month) !== -1) {
                    day = 31;
                } else if (selectday.month === 2) {
                    day = this.is_leapYear(selectday.year);
                } else {
                    day = 30;
                }
                return day;
            },
            /**
             * [get_week 1号在当月是周几]
             * @param  {[Date]} time [当前选择日期]
             * @return {[number]}      [在当月是周几]
             */
            get_week (time) {
                var index = new Date(time.year + '/' + time.month + '/01').getDay();
                return index;
            },
            /**
             * [is_leapYear 是否是闰年]
             * @param  {[Date]}  selectday [当前选中日期]
             */
            is_leapYear (selectday) {
                if ((selectday.year % 4 === 0 && selectday.year % 100 !== 0) || selectday.year % 400 === 0) {
                    return 29;
                } else {
                    return 28;
                }
            },
            /**
             * [fillDate 填充日期并设置相关时间]
             * @param  {[Date]} selectday [当前选中日期]
             * @param  {[Date]} today     [当前日期]
             * @param  {[type]} num       [当月有多少天]
             */
            fillDate (selectday, today, num) {
                var list = []
                for (var i = 1; i <= num; i++) {
                    if (selectday.year === today.year && selectday.month === today.month && i === today.day) {
                        list.push({year: selectday.year, month: selectday.month, day: i, isActive: true, isSelectDay: false});
                    } else {
                        list.push({year: selectday.year, month: selectday.month, day: i, isActive: false, isSelectDay: false});
                    }
                }
                return list;
            },
            // 获取点击日期数据
            get_details (list, index, item, pic) {
                this.set_isSelectDay(list, item);
                var toTime = item.year + '/' + item.month + '/' + item.day;
                this.$emit('changeTime', new Date(toTime));
                this.getTodaySignInfo(toTime);
                var today = new Date(this.today.year + '/' + this.today.month + '/' + this.today.day);
                var pickerDay = new Date(toTime);
                if (today.getTime() === pickerDay.getTime()) {
                    this.beforeToday = false;
                } else {
                    this.beforeToday = true;
                }
            },
            // 设置当前选中日期
            set_isSelectDay (list, item) {
                for (var i in list) {
                    if (list[i].year === item.year && list[i].month === item.month && list[i].day === item.day) {
                        list[i].isSelectDay = true;
                    } else {
                        list[i].isSelectDay = false;
                    }
                }
            },
            opteDatePicker () {
                this.$refs.picker.open();
            },
            // 获取本月数据
            getMonthData: function (month) {
                month = month || ''
                myFn.ajax('get', {month: month}, apiAddress.sign.monthLog, (res) => {
                    // console.log(res)
                    for (var i = 0; i < this.list.length; i++) {
                        for (var j = 0; j < res.data.length; j++) {
                            var arr = res.data[j].day.split('-');
                            var day = arr[1];
                            if (parseInt(day) === parseInt(this.list[i].day)) {
                                this.list[i].isCheck = true;
                                console.log(this.list[i])
                            }
                        };
                    };
                    this.monthLog = res.data;
                    // console.log(this.list);
                })
            },
            changeMonth: function (type) {
                // console.log(this.selectday.month)
                switch (parseInt(type)) {
                    case 1:
                        this.selectday.month --;
                        if (this.selectday.month < 1) {
                            this.selectday.month = 12;
                            this.selectday.year -= 1;
                        };
                        break;
                    case 2:
                        this.selectday.month ++;
                        if (this.selectday.month > 12) {
                            this.selectday.month = 1;
                            this.selectday.year += 1;
                        };
                        break;
                }
                this.signInfo = {};
                /* if (this.selectday.month === this.today.month) {
                    this.getTodaySignInfo(this.today.year + '/' + this.today.month + '/' + this.today.day)
                } else {
                } */
                this.set_calendar(this.selectday)
            },
            getTodaySignInfo: function (day) {
                myFn.ajax('get', {day: day}, apiAddress.sign.todayInfo, (res) => {
                    setTimeout(() => {
                        this.signInfo = res.data;
                    }, 100)
                })
            },
            sign: function () {
                if (!this.isLocal) {
                    alert('定位中...');
                    return false;
                };
                if (this.beforeToday) {
                    alert('只能在今天打卡哦！')
                    return false;
                };
                myFn.ajax('get', this.positionSite, apiAddress.sign.signIn, (res) => {
                    this.signInfo.push(res.data);
                })
            },
            getSecond: function (month) {
                myFn.ajax('get', {month: month}, apiAddress.sign.second, (res) => {
                    this.monthSignNum = res.data.all_sign_days;
                })
            },
            // 百度地图API功能
            baiduMap: function () {
                var self = this;
                // var map = new BMap.Map('allmap');
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                        self.positionSite.x_coor = r.point.lat;
                        self.positionSite.y_coor = r.point.lng;
                        self.isLocal = true;
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true})
            }
        }
    };
</script>
<style>
    .checkWork .picker-slot:nth-child(3) {
        display: none;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .time-title {
        text-align: center;
        padding: 20px 0px;
        background: #fff;
        color: #1b69fe;
        position: relative;
    }
    .time-title img {
        vertical-align: text-top;
    }
    .time-title span {
        font-size: 18px;
        margin-left: 5px;
    }
    .time-title .left-btn {
        position: absolute;
        left: 15px;
    }
    .time-title .right-btn {
        position: absolute;
        right: 15px;
        transform: rotate(180deg);
    }
    .time-week, .time-day {
        margin: 7px 0px;
        font-size: 0px;
    }
    .time-week li, .time-day li{
        font-size: 15px;
        width: 14.28%;
        text-align: center;
        display: inline-block;
        color: #A1A1A1;
    }
    .time-day {
        background: #fff;
        border-bottom: 1px #e6e6e6 solid;
        margin-bottom: 5px;
    }
    .time-day li {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        font-size: 13px;
        
    }
    .time-day li.check {
        color: red;
    }
    .time-day .no-today-active {
        background-image: radial-gradient(circle, transparent 0%, transparent 50%, #1b69fe 50%, #1b69fe 54%, transparent 54%);
    }
    .time-day .today-active {
        color: #fff !important;
        background-image: radial-gradient(circle, #1b69fe 0%, #1b69fe 54%, transparent 54%);
    }
    .today-log {
        background: #fff;
        padding: 7px 15px;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 5px;
    }
    .today-log > div {
        display: inline-block;
        vertical-align: middle;
    }
    .today-log:first-of-type {
        border-bottom: 1px solid #e6e6e6;
    }
    .today-log .head-img {
        width: 40px;
        height: 40px;
        line-height: 1;
        margin-right: 10px;
        padding-top: 1px;
        box-sizing: border-box;
    }
    .today-log .head-img img {
        width: 100%;
    }
    .today-log .check-info {
        color: #888;
        font-size: 14px;
    }
    .check-operation {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 20px;
        color: #686868;
    }
    .check-operation > div {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #1b69fe;
        color: #fff;
        line-height: 100px;
        font-size: 15px;
        margin: 30px auto 20px;
        user-select: none;
    }
    .check-operation > div.disabled {
        background: #ccc;
    }
    .check-operation > div:active {
        background: #09f;
    }
</style>
