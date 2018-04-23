<template>
    <div class="signDetails">
        <div class="userInfo">
            <img src="../../assets/icon/work.jpg">
            <span>Banzhangdaren</span>
        </div>
        <p class="signNum">今天签到 <span>10</span> 次</p>
        <div class="signContent">
            <ul>
                <li v-for="item in list">
                    <div class="signUserInfo">
                        <img src="../../assets/icon/jack.png">
                        <div>
                            <p>Banzhangdaren</p>
                            <p>2017-05-12 14:00</p>
                        </div>
                    </div>
                    <div class="signAddress">
                        <img src="../../assets/icon/address.png">
                        <span>深圳市龙岗区龙岗大道168号8888大厦</span>
                    </div>
                    <div class="signImg">
                        <img src="../../assets/icon/instance.jpg">
                        <img src="../../assets/icon/instance.jpg">
                        <img src="../../assets/icon/instance.jpg">
                        <span></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'signDetails',
        data () {
            return {
                list: ['', '']
            }
        },
        mounted () {},
        methods: {}
    }
</script>

<style>
    .userInfo {
        background: #fff;
        padding: 15px;
        font-size: 16px;
    }
    .userInfo img,
    .userInfo span {
        vertical-align: middle;
    }
    .userInfo img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .signNum {
        padding: 15px 15px;
        padding-bottom: 0;
        font-size: 14px;
        color: #999;
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        float: left;
    }
    .signUserInfo div {
        width: 100%;
        padding-left: 55px;
        box-sizing: border-box;
    }
    .signUserInfo div p:last-child {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
    }
    .signAddress {
        padding: 10px 0;
        font-size: 14px;
        color: #DAB522;
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
        width: 32%;
    }
    .signImg span {
        display: inline-block;
        width: 100%;
    }
</style>