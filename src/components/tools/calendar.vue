<template>
    <div class="toolsCalendar">
        <div class="time-title" @click="opteDatePicker">
            <img src="../../assets/icon/date.png" width="18">
            <span>{{selectday.year}}年{{selectday.month}}月</span>
        </div>
        <!-- <input type="month" class="default-date" @change="selectMonth"> -->
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
            <li v-for="item in list" v-html="item.day" @click="get_details(list, item, pickerValue)" :class="{'today-active' : item.isActive, 'no-today-active' : item.isSelectDay}" ></li>
        </ul>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_time"></mt-datetime-picker>
    </div>
</template>

<script>
    export default {
        name: 'toolsCalendar',
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
                pickerValue: new Date()
            };
        },
        mounted () {
            // 获取当天日期
            this.today = {
                year: this.pickerValue.getFullYear(),
                month: this.pickerValue.getMonth() + 1,
                day: this.pickerValue.getDate()
            }
            this.set_time(this.pickerValue);
        },
        methods: {
            selectMonth () {

            },
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
            get_details (list, item, pic) {
                this.set_isSelectDay(list, item);
                var toTime = item.year + '/' + item.month + '/' + item.day;
                this.$emit('changeTime', new Date(toTime));
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
                document.body.classList.add('prohibitOverflow');
                document.documentElement.classList.add('prohibitOverflow');
            }
        }
    };
</script>
<style>
    .prohibitOverflow {
        height: 100%;
        overflow: hidden;
    }
    .toolsCalendar .picker-slot:nth-child(3) {
        display: none;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .toolsCalendar {
        text-align: center;
        background-color: #fff;
    }
    .time-title {
        display: inline-block;
        text-align: center;
        margin: 20px 0px;
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
    .time-week, .time-day {
        margin: 7px 0px;
        font-size: 0px;
        text-align: left;
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
    }
    .time-day li {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        font-size: 13px;
        
    }
    .time-day .no-today-active {
        background-image: radial-gradient(circle, transparent 0%, transparent 50%, #1b69fe 50%, #1b69fe 54%, transparent 54%);
    }
    .time-day .today-active {
        color: #fff;
        background-image: radial-gradient(circle, #1b69fe 0%, #1b69fe 54%, transparent 54%);
    }
</style>
