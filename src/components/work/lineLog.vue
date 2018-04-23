<template>
    <div class="lineLog">
        <div class="date">
            <div @click="openPicker"><span v-html="year"></span>年-<span v-html="month"></span>月</div>
            <p class="signNumMonth">本月签到<span> 4 </span>次</p>
            <img class="left-btn" src="../../assets/icon/left.png" @click="changeMonth(1)">
            <img class="right-btn" src="../../assets/icon/right.png" @click="changeMonth(2)">
        </div>
        <div class="totalDay">
            <li v-for="item in totalDay" :class="[day == item?'activeDay':'']"><span v-html="item" @click="getSingLog(item)"></span></li>
        </div>
        <div class="signContent">
            <p class="signNum">今日签到 <span v-html="list.length"></span> 次</p>
            <ul>
                <li v-for="item in list">
                    <div class="signUserInfo">
                        <!-- <img src="http://img.qq745.com/uploads/allimg/170413/14-1F413113107.png"> -->
                        <img :src="item.headImage">
                        <div>
                            <p v-html="item.name">Banzhangdaren</p>
                            <p v-html="item.create_time">2017-05-12 14:00</p>
                        </div>
                    </div>
                    <div class="signAddress">
                        <img src="../../assets/icon/address.png">
                        <span v-html="item.addr">深圳市龙岗区龙岗大道168号8888大厦</span>
                    </div>
                    <div class="signImg">
                        <img v-for="obj in item.image" :src="'/public' + obj">
                        <span></span>
                    </div>
                    <div class="remarks" v-if="item.remark">
                        <p><span>备注内容</span></p>
                        <p v-html ="item.remark">如果你无法非常简单的描述一个事物，说明你还不够了解它</p>
                    </div>
                </li>
            </ul>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
        <div class="btn-group">
            <div @click="goSign"><img src="../../assets/icon/lineLog.png"><span>签到</span></div>
            <div class="active"><img src="../../assets/icon/sign_active.png"><span>足迹</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lineLog',
        data () {
            return {
                selected: '1',
                pickerVisible: new Date(),
                year: '',
                month: '',
                day: '',
                totalDay: [],
                list: []
            }
        },
        mounted () {
            var self = this;
            this.filterDate(this.pickerVisible);
            this.totalDay = this.mGetDate(this.year, this.month);
            setTimeout(function () {
                if (self.day > 5 && self.day < 10) {
                    $('.totalDay').scrollLeft(56 * (self.day - 4));
                } else if (self.day > 9) {
                    $('.totalDay').scrollLeft(56 * 4 + 65.3 * (self.day - 8));
                };
            }, 20)
            this.getlist();
        },
        methods: {
            getlist () {
                var date = this.year + '-' + this.month + '-' + this.day;
                myFn.ajax('get', {sign_day: date}, apiAddress.check.signList, (res) => {
                    this.list = res.data.data;
                })
            },
            getSingLog (day) {
                this.day = day;
                this.getlist();
            },
            goSign () {
                this.$router.push({name: 'signPage'})
            },
            goPage () {
                this.$router.push({name: 'signDetails'})
            },
            openPicker () {
                this.$refs.picker.open();
            },
            filterDate (date) {
                var _date = new Date(date) || new Date();
                this.year = _date.getFullYear();
                this.month = _date.getMonth() + 1;
                this.day = _date.getDate();
            },
            mGetDate (year, month) {
                var d = new Date(year, month, 0);
                var dayArr = [];
                for (var i = 0; i < d.getDate(); i++) {
                    dayArr.push(i + 1);
                };
                return dayArr;
            },
            changeMonth (type) {
                switch (parseInt(type)) {
                    case 1:
                        this.month --;
                        if (this.month < 1) {
                            this.month = 12;
                            this.year --;
                        };
                        break;
                    case 2:
                        this.month ++;
                        if (this.month > 12) {
                            this.month = 1;
                            this.year ++;
                        };
                        break;
                }
                this.pickerVisible = this.year + '-' + this.month + '-' + '1';
                setTimeout(() => {
                    this.getlist();
                }, 50)
            }
        },
        watch: {
            pickerVisible: function () {
                this.filterDate(this.pickerVisible);
                this.totalDay = this.mGetDate(this.year, this.month);
                var date = new Date()
                var month = date.getMonth() + 1;
                if (this.month !== month) {
                    this.day = 1;
                    $('.totalDay').scrollLeft(0);
                } else {
                    this.day = date.getDate();
                }
                if (this.day > 5 && this.day < 10) {
                    $('.totalDay').scrollLeft(56 * (this.day - 4));
                } else if (this.day > 9) {
                    $('.totalDay').scrollLeft(56 * 4 + 65.3 * (this.day - 8));
                };
            }
        }
    }
</script>


<style>
    .lineLog .mint-navbar {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 2;
    }
    .lineLog .mint-tab-container {
        margin-top: 47px;
    }
    .lineLog .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 1px solid #1b69fe;
        margin-bottom: 0;
    }
    .lineLog .mint-tab-item {
        border-bottom: 1px solid #ddd;
    }
    .lineLog .mint-navbar .mint-tab-item.is-selected {
        color: #1b69fe;
    }
    .lineLog .mint-swipe {
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
    }
    .lineLog .mint-tab-container-item {
        margin-bottom: 76px;
    }
</style>
<style scoped>
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
    .btn-group {
        position: fixed;
        width: 100%;
        height: 41px;
        bottom: 0;
        border-top: 1px solid #ededed;
        display: flex;
        background-color: #fff;
        padding: 5px 0;
        z-index: 2;
    }
    .btn-group > div {
        flex: 1;
        text-align: center;
        font-size: 0;
        color: #999;
    }
    .btn-group > div img {
        width: 20px;
        margin-top: 3px;
    }
    .btn-group > div span {
        width: 100%;
        display: inline-block;
        text-align: center;
        font-size: 12px;
    }
    .btn-group > div.active span {
        color: #1b69fe;
    }
    .date {
        text-align: center;
        color: #1b69fe;
        padding: 15px 0;
        position: relative;
        background-color: #fff;
    }
    .date > div {
        display: inline-block;
        font-size: 18px;
    }
    .date > img {
        display: inline-block;
        position: absolute;
        top: 27px;
        width: 10px;
    }
    .date > img.left-btn {
        left: 20%;
    }
    .date > img.right-btn {
        right: 20%;
    }
    .totalDay {
        overflow: auto;
        background: #fff;
        margin-top: 5px;
        padding: 15px;
        white-space: nowrap;
    }
    .totalDay li {
        display: inline-block;
        margin-right: 13.5%;
        color: #999;
        font-size: 16px;
    }
    .signNumMonth {
        font-size: 12px;
        color: #999;
    }
    .signNum {
        padding: 20px 15px;
        padding-bottom: 0;
        font-size: 14px;
        color: #999;
    }
    .signContent {
        margin-bottom: 62px;
    }
    .signContent ul li {
        background: #fff;
        padding: 15px;
        margin-top: 10px;
    }
    .signUserInfo {
        font-size: 14px;
    }
    .signUserInfo img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        float: left;
    }
    .signUserInfo div {
        width: 100%;
        padding-left: 65px;
        padding-top: 2px;
        box-sizing: border-box;
    }
    .signUserInfo div p:last-child {
        font-size: 14px;
        color: #999;
    }
    .signAddress {
        padding: 10px 0;
        /*padding-top: 5px;*/
        font-size: 14px;
        color: #DAB522;
        padding-left: 65px;
    }
    .signAddress img {
        width: 10px;
        margin-right: 5px;
    }
    .signAddress img,
    .signAddress span {
        vertical-align: middle;
    }
    .signImg {
        font-size: 0;
        text-align: justify;
    }
    .signImg img {
        display: inline-block;
        width: 30%;
        max-height: 100px;
        margin: 10px 1%;
    }
    .signImg span {
        display: inline-block;
        width: 100%;
    }
    .signContent .remarks {
        padding: 0 5px;
        font-size: 14px;
    }
    .signContent .remarks p:first-child {
        padding-bottom: 3px;
        position: relative;
        padding-left: 15px;
        height: 22px;
    }
    .signContent .remarks p:first-child span {
        display: inline-block;
        position: absolute;
        padding: 0 5px;
        background: #fff;
        z-index: 1;
        color: #999;
    }
    .signContent .remarks p:first-child:after {
        content: '';
        border-top: 1px dashed #ccc;
        position: absolute;
        width: 100%;
        top: 10px;
        left: 0;
    }
    .signContent .remarks p:last-child {
        line-height: 1.5;
        color: #666;
    }
    .gray {
        color: #999;
    }
</style>