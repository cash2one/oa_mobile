<template>
    <div class="center">
        <!-- <div class="header">
            <img class="headerImg" :src="headImg" />
            <div class="info">
                <p v-html="userInfo.name"></p>
                <p class="department" v-html="userInfo.dname"></p>
            </div>
            <img class="gender" :src="userInfo.sex == 1 ? require('../../assets/icon/maleIcon.png') : require('../../assets/icon/femaleIcon.png')" />
        </div> -->
        <div class="header">
            <div class="headImg">
                <img :src="headImg" />
            </div>
            <div class="info">
                <p v-html="userInfo.name"></p>
                <div class="department">
                    <img class="gender" :src="userInfo.sex == 1 ? require('../../assets/icon/center/boy.png') : require('../../assets/icon/femaleIcon.png')" />
                    <span v-html="userInfo.dname"></span>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <mt-cell class="center-item bg_none" title="个人资料" is-link to="/index/center/data">
                <img slot="icon" src="../../assets/icon/center/info.png" width="20" height="20">
            </mt-cell>
            <mt-cell class="center-item" title="我的申请" is-link to="/index/center/apply">
                <img slot="icon" src="../../assets/icon/center/apply.png" width="20" height="20">
            </mt-cell>
            <mt-cell class="center-item bg_none" title="工资明细" is-link to="/index/center/wages" style="margin-top: 10px;">
                <img slot="icon" src="../../assets/icon/center/wages.png" width="20" height="20">
            </mt-cell>
            <mt-cell class="center-item" title="每日报表" is-link to="/index/work/dayWork">
                <img slot="icon" src="../../assets/icon/center/report.png" width="20" height="20">
            </mt-cell>
            <mt-cell class="center-item" title="考核" is-link to="/index/work/assessment">
                <img slot="icon" src="../../assets/icon/center/search.png" width="20" height="20">
            </mt-cell>
            <mt-cell class="center-item bg_none" title="账号设置" is-link to="/index/center/accountSettings" style="margin-top: 10px;">
                <img slot="icon" src="../../assets/icon/center/system.png" width="20" height="20">
            </mt-cell>
        </div>
        <!-- <router-link tag="li" :to="{name: 'assessment'}" class="work-class-item">
            <img src="../../assets/icon/punchTarget.png" >
            <p>考核</p>
        </router-link> -->
    </div>
</template>

<script>
    export default {
        name: 'center',
        data () {
            return {
                headImg: require('../../assets/icon/applyAvatar.png'),
                userInfo: {}
            }
        },
        mounted () {
            this.userInfo = JSON.parse(localStorage.userInfo);
            this.headImg = this.userInfo.wximg || this.userInfo.image;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .center .mint-cell-allow-right::after {
        border: 1px solid #c1c1c1;
        border-bottom-width: 0;
        border-left-width: 0;
        width: 10px;
        height: 10px;
    }
    .center .bg_none {
        background-size: 0;
    }
    .center .bg_none .mint-cell-wrapper {
        background: none;
    }
    .center .mint-cell-title img {
        margin: 0 5px;
    }
</style>
<style scoped>
    .center{
        background-color: #f7f7f7;
        color: #0f0f0f;
    }
    .header {
        background: url('../../assets/icons/center_bg.png') no-repeat center center;
        background-size: cover;
        box-sizing: border-box;
        padding: 8% 0;
        display: flex;
        align-items: center;
    }
    .header > div {
        box-sizing: border-box;
    }
    .headImg {
        flex: 2;
        font-size: 0;
        padding-left: 20px;
    }
    .headImg img {
        width: 100%;
        border-radius: 50%;
        border: 4px solid #fff;
    }
    .info {
        flex: 7;
        font-size: 0;
        padding-left: 30px;
    }
    .info p {
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .department {
        font-size: 0;
        margin-top: 10px;
    }
    .department img {
        width: 14px;
        margin-right: 5px;
        vertical-align: middle;
    }
    .department span {
        font-size: 14px;
        color: #fff;
        vertical-align: middle;
        line-height: 1.0;
    }
    .content-wrapper{
        /* position: absolute; */
        background-color: #f7f7f7;
        width: 100%;
        height: 60%;
        padding-bottom: 74px;
        margin-top: 10px;
    }
</style>