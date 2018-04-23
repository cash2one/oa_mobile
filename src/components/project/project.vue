<template>
	<div class="project">
		<mt-navbar v-model="selected" class="tab-header">
            <mt-tab-item id="1">未完成</mt-tab-item>
            <mt-tab-item id="2">已完成</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="list">
                    <li v-if="data_1.length > 0" v-for="item in data_1">
                        <p v-html="item.name"></p>
                        <p><span class="label">负责人：</span><span class="value" v-html="item.leader_name || '无'"></span></p>
                        <p><span class="label">开始时间：</span><span class="value" v-html="item.start_time"></span></p>
                        <p><span class="label">结束时间：</span><span class="value" v-html="item.end_time"></span></p>
                        <div v-if="item.minx >= 0" class="time">
                            <img src="../../assets/icon/date2.png"  @click="goDetail(item.id)">
                            <img src="../../assets/icon/task.png" @click="goTask(item.id)">
                            <p><span>进度：</span><span v-html="parseInt(item.percent*100) + '%'"></span></p>
                            <p><span>仅剩：</span><span v-html="item.minx + '天'"></span></p>
                        </div>
                        <div v-else class="time">
                            <img src="../../assets/icon/date2.png"  @click="goDetail(item.id)">
                            <img src="../../assets/icon/task.png" @click="goTask(item.id)">
                            <p><span>进度：</span><span v-html="parseInt(item.percent*100) + '%'"></span></p>
                            <p><span>超时：</span><span v-html="Math.abs(item.minx) + '天'"></span></p>
                        </div>
                    </li>
                    <p v-if="data_1.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无数据</p>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul class="list">
                    <li v-if="data_2.length > 0" v-for="item in data_2" @click="goDetail(item.id)">
                        <p v-html="item.name"></p>
                        <p><span class="label">负责人：</span><span class="value" v-html="item.leader_name || '无'"></span></p>
                        <p><span class="label">开始时间：</span><span class="value" v-html="item.start_time"></span></p>
                        <p><span class="label">结束时间：</span><span class="value" v-html="item.end_time"></span></p>
                        <div v-if="item.minx >= 0" class="time">
                            <img src="../../assets/icon/date2.png"  @click="goDetail(item.id)">
                            <img src="../../assets/icon/task.png" @click="goTask(item.id)">
                            <p><span>进度：</span><span v-html="parseInt(item.percent*100) + '%'"></span></p>
                            <p><span>仅剩：</span><span v-html="item.minx + '天'"></span></p>
                        </div>
                        <div v-else class="time">
                            <img src="../../assets/icon/date2.png"  @click="goDetail(item.id)">
                            <img src="../../assets/icon/task.png" @click="goTask(item.id)">
                            <p><span>进度：</span><span v-html="parseInt(item.percent*100) + '%'"></span></p>
                            <p><span>超时：</span><span v-html="Math.abs(item.minx) + '天'"></span></p>
                        </div>
                    </li>
                    <p v-if="data_2.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无数据</p>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
	</div>
</template>

<script>
    export default {
        name: 'project',
        data () {
            return {
                data_1: [],
                data_2: [],
                selected: '1',
                page: 1
            }
        },
        mounted () {
            this.getlist();
        },
        methods: {
            getlist () {
                var today = new Date();
                var currentDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                myFn.ajax('get', {page: this.page, status: this.selected}, apiAddress.project.list, res => {
                    if (res.data.data.length > 0) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            this.$set(res.data.data[i], 'minx', this.datedifference(currentDate, res.data.data[i].end_time));
                        }
                        if (parseInt(this.selected) === 1) {
                            this.data_1 = res.data.data;
                        } else {
                            this.data_2 = res.data.data;
                        }
                    }
                })
            },
            goDetail (id) {
                this.$router.push({name: 'workDetail', params: {id}});
            },
            goTask (id) {
                this.$router.push({name: 'task', params: {id}});
            },
            datedifference (sDate1, sDate2) {
                var dateSpan, iDays;
                sDate1 = Date.parse(sDate1);
                sDate2 = Date.parse(sDate2);
                dateSpan = sDate2 - sDate1;
                // dateSpan = Math.abs(dateSpan);
                iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                return iDays;
            }
        },
        watch: {
            'selected': function () {
                this.getlist();
            }
        }
    }
</script>

<style>
    .project .mint-navbar {
        margin-top: 15px;
        margin-bottom: 15px;
        background: none;
    }
    .project .mint-navbar .mint-tab-item.is-selected {
        border: 0;
    }
    .project .mint-tab-item {
        position: relative;
        padding: 0;
        height: 51px;
    }
    .project .mint-tab-item-label {
        height: 29px;
        width: 70%;
        border-radius: 5px;
        border: 1px solid #1b69fe;
        line-height: 29px;
        color: #1b69fe;
        margin-top: 10px;
        position: absolute;
    }
    .project .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        background: #1b69fe;
        color: #fff;
    }
    .project .mint-tab-item:first-child .mint-tab-item-label{
        right: -5px;
    }
    .project .mint-tab-item:last-child .mint-tab-item-label{
        left: -5px;
    }
</style>

<style scoped>
    .list {
        padding: 0 15px;
    }
    .list > li {
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin: 10px 0;
        background-color: #fff;
        box-sizing: border-box;
        padding-right: 95px;
        position: relative;
    }
    .list > li:first-child {
        margin-top: 0;
    }
    .time {
        position: absolute;
        top: 0;
        right: 15px;
        height: 100%;
        box-sizing: border-box;
        padding: 15px 0;
        text-align: right;
    }
    .time > p {
        font-size: 14px;
        color: #787878;
        margin-bottom: 5px;
    }
    .time > img {
        width: 25px;
        margin-left: 10px;
        margin-bottom: 37px;
    }
    .time > p span:first-child {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
    .time > p span:last-child {
        display: inline-block;
        width: 40px;
        text-align: right;
        color: red;
    }
    .list > li > p {
        margin-bottom: 10px;
        font-size: 15px;
    }
    .label {
        color: #787878;
    }
</style>