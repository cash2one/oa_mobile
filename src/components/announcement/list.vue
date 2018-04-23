<template>
    <div class="announcement">
        <div>
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="(item,index) in list" class="announcement-wrapper" @click="godetails(item.id)">
                    <div class="time" v-html="item.create_time">09-02 14:00:00</div>
                    <div class="content-wrapper">
                        <div class="announcement-title" v-html="item.title">2017中秋国庆放假通知</div>
                        <div class="announcement-desc" v-html="item.content">10月1日至8日放假调休，共8天。节假日期间，各地区、各部门请做好妥善安排...</div>
                    </div>
                </li>
                <div class="fading-circle" v-if="current_length < total">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    <span>加载中</span>
                </div>
                <p v-if="current_length < 10" style="text-align:center;font-size:14px;color:#ccc;padding: 15px 0;">暂无更多 ...</p>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'announcement',
        data () {
            return {
                list: [],
                current_page: 0,
                last_page: 0,
                total: 0,
                current_length: -1
            }
        },
        mounted () {
        },
        methods: {
            getData: function () {
                myFn.ajax('get', {page: this.current_page}, apiAddress.home.noticeList, (res) => {
                    this.list = res.data.data;
                    this.current_length = this.list.length;
                    this.total = res.total;
                    this.last_page = res.last_page;
                    this.current_page = res.current_page;
                })
            },
            loadMore: function () {
                if (this.current_length < this.total) {
                    this.current_page ++;
                    this.getData(this.current_page);
                };
            },
            godetails: function (id) {
                this.$router.push({name: 'announcementDetails', params: {id: id}});
            }
        }
    }
</script>

<style scoped>
    .announcement {
        padding-bottom: 15px;
        position: absolute;
        top: 0;
        bottom: 0;
        background: #f7f7f7;
        width: 100%;
    }
    .announcement-wrapper {
        padding: 15px;
        padding-bottom: 0;
    }
    .announcement-wrapper .time {
        width: 150px;
        height: 28px;
        margin: auto;
        border-radius: 30px;
        background: #f0f0f0;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        color: #909090;
    }
    .content-wrapper {
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        padding: 15px;
        margin-top: 15px;
        background: #fff;
    }
    .announcement-title {
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .announcement-desc {
        color: #a1a1a1;
        line-height: 1.5;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .fading-circle {
        height: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
    }
    .fading-circle > span {
        display: inline-block;
        vertical-align: bottom;
        padding-left: 5px;
    }
</style>