<template>
    <div class="announcementDetails">
        <div class="announce-hearder">
            <div class="announce-title" v-html="details.title">2017中秋国庆放假通知</div>
            <div class="announce-date" v-html="details.create_time">2017-09-01 15:00:00</div>
        </div>
        <div class="announce-content">
            <p v-html="details.content" style="word-wrap:break-word">10月1日至8日放假调休，共8天。9月30日（星期六）上班。节假日期间，各地区、各部门要妥善安排好值班和安全、保卫等工作，遇有重大突发事件，要按规定及时报告并妥善处置，确保人民群众祥和平安度过节日假期。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'announcementDetails',
        data () {
            return {
                details: {}
            }
        },
        mounted () {
            if (this.$route.params.id !== '') {
                var itemID = this.$route.params.id;
                this.getdetail(itemID)
            };
        },
        methods: {
            getdetail: function (id) {
                myFn.ajax('get', {id: id}, apiAddress.home.noticeDetails, (res) => {
                    this.details = res.data;
                })
            }
        }
    }
</script>

<style scoped>
    .announcementDetails {
        padding: 15px;
        position: absolute;
        top: 0;
        bottom: 0;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
    }
    .announce-hearder {
        padding-bottom: 15px;
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 25px;
    }
    .announce-title {
        font-size: 22px;
        color: #333;
        margin-bottom: 10px;
    }
    .announce-date {
        color: #a1a1a1;
    }
    .announce-content {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
    }
</style>