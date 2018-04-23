<template>
    <div class="workCalendar">
        <calendar @changeTime="get_details"></calendar>
        <div v-show="detailsList.length <= 0" class="noDetails">
            <span>你当前没有要处理的事件</span>
            <span>好好放松下吧</span>
        </div>
        <div v-show="detailsList.length > 0">
            <p class="details-title">今日事件</p>
            <ul class="details-list">
                <li v-for="item in detailsList" @click="go_reminderTime(item.id, item.status)" :class="{'end' : item.status == 3}">
                    <p class="title" v-html="item.title">今日会议</p>
                    <p class="time" v-html="item.start_time + '-' + item.end_time">09:00-10:00</p>
                    <span class="state" v-if="item.status == 3">已结束</span>
                    <span class="state conduct" v-if="item.status == 2">进行中</span>
                    <span class="state" v-if="item.status == 1 && item.advance_time == 0">提醒我 > </span>
                    <span class="state" v-else-if="item.status == 1" v-html="item.advance_type == 0 ? '暂无提醒' : item.advance_time + '提醒'"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import calendar from '../tools/calendar'
    export default {
        name: 'workCalendar',
        data () {
            return {
                today: '',
                detailsList: []
            };
        },
        mounted () {
            var date = new Date();
            this.get_details(date);
        },
        methods: {
            get_details (time) {
                console.log(time)
                this.today = time;
                myFn.ajax('get', {time: time.toLocaleDateString()}, apiAddress.calendar.details, (res) => {
                    this.detailsList = res.data.data;
                });
            },
            go_reminderTime (id, status) {
                if (status === 1) {
                    this.$router.push({name: 'reminderTime', params: {id: id}});
                }
            }
        },
        components: {
            calendar
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .details-title {
        color: #b3b3b3;
        padding: 10px 15px;
    }
    .details-list {
        padding: 0 15px;
        background: #fff;
        border-top: 1px #e6e6e6 solid;
        border-bottom: 1px #e6e6e6 solid;
    }
    .details-list li {
        line-height: 35px;
        padding: 15px 0px;
        border-bottom: 1px #e6e6e6 solid;
        position: relative;
    }
    .details-list li .state {
        position: absolute;
        right: 0px;
        top: 20px;
    }
    .details-list li .time {
        color: #b4b4b4;
    }
    .details-list li:last-child {
        border: none;
    }
    .title{
        color:#333333;
    }
    .conduct {
        color: red;
    }
    .end {
        color: #ccc !important;
    }
    .noDetails{
        background: #fff;
        padding: 50px 0;
    }
    .noDetails span{
        text-align: center;
        display: block;
        width: 100%;
        color: #b4b4b4;
    }
    .noDetails span:last-child{
        margin-top: 20px;
    }
</style>
