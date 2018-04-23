<template>
    <div class="userinfo">
        <div class="header">
            <img class="headerImg" v-if="info.image === '' || info.image === null" src="../../assets/icon/applyAvatar.png" />
            <img class="headerImg" v-else :src="info.image" />
            <div class="info">
                <p v-html="info.username">Banzhangdaren</p>
                <p class="department" v-html="info.department_name">UI设计</p>
            </div>
            <img class="gender" src="../../assets/icon/maleIcon.png" v-if="info.sex == 1" />
            <img class="gender" src="../../assets/icon/femaleIcon.png" v-if="info.sex == 2" />
        </div>
        <div>
            <mt-cell title="电话" :value="info.mobile"></mt-cell>
            <mt-cell title="部门" :value="info.department_name"></mt-cell>
            <mt-cell title="生日" :value="info.birthday"></mt-cell>
        </div>
        <div class="footer" v-if="id != userInfo.id">
            <a class="phone"  :href="'tel:'+ info.mobile">
                <img src="../../assets/icon/phone.png">
                <span>拨号</span>
            </a> 
            <div class="message" @click="goChat()">
                <img src="../../assets/icon/message.png">
                <span >发信息</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userinfo',
        data () {
            return {
                info: {
                    image: []
                },
                userInfo: {},
                id: ''
            }
        },
        mounted () {
            window.document.title = 'OA';
            this.id = this.$route.params.id;
            this.userInfo = JSON.parse(localStorage.userInfo);
            this.getdetail();
        },
        methods: {
            getdetail: function () {
                myFn.ajax('get', {id: this.id}, apiAddress.mail.details, (res) => {
                    this.info = res.data;
                })
            },
            goChat: function () {
                localStorage.chat_obj = this.info.username;
                this.$router.push({name: 'mailchat', params: {id: this.id}});
            }
        }
    }
</script>

<style>
    .userinfo .mint-cell-text {
        color: #b3b3b3;
    }
    .userinfo .mint-cell-value {
        color: #333;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        background: #fff;
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px #dedede solid;
        text-align: center;
        position: relative;
    }
    .header .headerImg {
        width: 100px;
        height: 100px;
        margin-top: 10px;
        border-radius: 50%;
    }
    .header .gender {
        position: absolute;
        right: 35px;
        top: 25px;
        width: 15px;
    }
    .header .info  p {
        margin: 10px 0;
    }
    .header .info .department {
        color: #b3b3b3;
        font-size: 14px;
    }
    .center-item {
        color: #b3b3b3;
    }
    .footer {
        width: 100%;
        height: 45px;
        position: absolute;
        bottom: 0;
        line-height: 45px;
        overflow: hidden;
    }

    .footer .message img, .footer .phone img {
        width: 23px;
        vertical-align: middle;
    }
    .footer .phone, .footer .message{
        width: 50%;
        display: inline-block;
        color: #fff;
        background: #1b69fe;
        text-align: center;
    }
    .footer .phone span,
    .footer .message span {
        vertical-align: middle;
    }
    .footer .message {
        color: #5c5c5c;
        float: right;
        background: #fff;
        border-top: 1px #d4d4d4 solid;
    }
</style>