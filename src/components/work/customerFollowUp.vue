<template>
    <div class="followUp">
        <div class="userInfo">
            <img class="headimg" :src="userInfo.image">
            <p class="name" v-html="userInfo.name"></p>
            <p class="trade" v-html="userInfo.trade_name"></p>
            <p class="tips"><img src="../../assets/icon/mark.png"><span>最近有跟进</span></p>
        </div>
        <div class="container">
            <div class="add" @click="go_add"><span>+</span><span>添加跟进</span></div>
            <ul class="list">
                <li v-for="item in followUpInfo">
                    <p class="content" v-html="item.content"></p>
                    <div class="time">
                        <div>2018-09-02</div>
                        <div>14:00:00</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'followUp',
        data () {
            return {
                userID: '',
                userInfo: {},
                followUpInfo: [],
                timeout: false
            }
        },
        mounted () {
            this.userID = this.$route.params.id;
            this.getUserInfo();
            this.followUpList();
        },
        methods: {
            getUserInfo () {
                myFn.ajax('get', {id: this.userID}, apiAddress.customer.customerInfo, (res) => {
                    this.userInfo = res.data;
                })
            },
            followUpList () {
                myFn.ajax('get', {cid: this.userID}, apiAddress.customer.followUpList, (res) => {
                    this.followUpInfo = res.data.data;
                    if (parseInt(this.followUpInfo.length) === 0) return;
                    for (var i = 0; i < this.followUpInfo.length; i++) {
                        var date = new Date(this.followUpInfo[i].create_time);
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        this.followUpInfo[i].month = month;
                        this.followUpInfo[i].day = day;
                        if ((i - 1) >= 0 && this.followUpInfo[i].create_time === this.followUpInfo[i - 1].create_time) {
                            this.followUpInfo[i].circle = false;
                        } else {
                            this.followUpInfo[i].circle = true;
                        }
                    };
                    var today = new Date();
                    var newestDate = new Date(this.followUpInfo[0].create_time)
                    var time1 = Date.parse(today);
                    var time2 = Date.parse(newestDate);
                    var dayCount = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
                    if (dayCount >= 30) {
                        this.timeout = true
                    };
                })
            },
            go_add () {
                this.$router.push({name: 'addFollow'})
            }
        }
    }
</script>

<style scoped>
    .followUp {
        background-color: #F7F7F7;
    }
    .headimg {
        width: 30%;
        height: 30vw;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 15px;
        letter-spacing: 2px;
    }
    .userInfo {
        padding: 15px 0 20px;
        text-align: center;
        background-color: #fff;
        font-size: 0;
    }
    .name {
        font-size: 20px;
        margin-bottom: 5px;
        color: #555967;
    }
    .trade {
        font-size: 15px;
        margin-bottom: 15px;
        color: #97A5C3;
    }
    .tips {
        font-size: 14px;
        line-height: 1;
    }
    .tips img {
        width: 14px;
        margin-right: 7px;
        vertical-align: middle;
    }
    .tips span {
        color: #97A5C3;
        vertical-align: middle;
    }
    .container {
        padding: 10px 15px 30px;
    }
    .add {
        background-color: #fff;
        padding: 15px;
        vertical-align: bottom;
        line-height: 1;
        border-radius: 5px;
        color: #1B69FE;
        margin-bottom: 15px;
    }
    .add span {
        vertical-align: middle;
        line-height: 1;
    }
    .add span:first-child {
        font-size: 24px;
        margin-right: 5px;
    }
    .add span:last-child {
        font-size: 16px;
        display: inline-block;
    }
    .list li {
        background-color: #fff;
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 5px;
        font-size: 15px;
        color: #494B4F;
        line-height: 1.5;
    }
    .time {
        display: flex;
        margin-top: 20px;
        font-size: 12px;
        color: #878787;
        justify-content: space-between;
    }
</style>