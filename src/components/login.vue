<template>
    <div class="login">
        <!-- 头像 -->
        <img class="headerImg" v-if="userInfo.image === ''"   src="../assets/icon/applyAvatar.png" />
        <img class="headerImg" v-else :src="userInfo.image" />
        <!-- 部门性别 -->
        <div class="department">
            <div v-show="userInfo.sex"  style="text-align: center">
                <img class="gender" v-if="userInfo.sex == 1" src="../assets/icon/maleIcon.png"   />
                <img class="gender" v-if="userInfo.sex == 2" src="../assets/icon/femaleIcon.png"  />
                <span v-html="userInfo.dname"></span>
            </div>
        </div>
        <!-- <p class="cell-title">绑定手机</p> -->
        <!-- 表单 -->
        <mt-field placeholder="请输入手机号码" v-model="mobile" class="input-style"></mt-field>

        <mt-field placeholder="请输入验证码" type="text" v-model="code" class="input-style code" v-if="is_wxlogin">
            <mt-button type="primary" class="getCode" @click="get_code">{{codeTitle}}</mt-button>
        </mt-field>

        <mt-field placeholder="请输入密码" type="password" v-model="password" class="input-style" v-if="!is_wxlogin"></mt-field>

        <!-- <p class="back" @click="forgotPassword">忘记密码?</p> -->
        <div class="button-Group">
            <mt-button @click="submit()" class="submit" size="large" v-html="is_wxlogin?'绑定':'登录'"></mt-button>
        </div>
        <!-- <p class="newSser" @click="register">新用户注册 ></p> -->
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                mobile: '',
                code: '',
                userInfo: {
                    sex: '',
                    image: '',
                    dname: '技术部'
                },
                is_wxlogin: false,
                codeTitle: '获取',
                password: ''
            }
        },
        mounted () {
            if (localStorage.userInfo !== undefined) {
                this.userInfo = JSON.parse(localStorage.userInfo);
                this.mobile = this.userInfo.mobile;
            }
            var ua = window.navigator.userAgent.toLowerCase()
            if (ua.indexOf('micromessenger') > -1) {
                this.is_wxlogin = true;
            }
        },
        methods: {
            set_codeTime () {
                setTimeout(() => {
                    this.codeTitle = parseInt(this.codeTitle) - 1 + 's'
                    if (this.codeTitle === '0s') {
                        this.codeTitle = '获取';
                    } else {
                        this.set_codeTime();
                    }
                }, 1000);
            },
            get_code () {
                if (this.codeTitle === '获取') {
                    if (this.mobile === '') {
                        alert('手机号码不能为空');
                        return false;
                    }
                    myFn.ajax('post', {mobile: this.mobile}, apiAddress.login.getCode, (res) => {});
                    this.codeTitle = '60s';
                    this.set_codeTime();
                } else {
                    return false;
                }
            },
            submit () {
                var data = {
                    mobile: this.mobile
                }
                if (this.is_wxlogin) {
                    data.code = this.code;
                    myFn.ajax('post', data, apiAddress.login.wxlogin, (res) => {
                        localStorage.userInfo = JSON.stringify(res.data);
                        location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/#/index/home';
                    });
                } else {
                    data.password = this.password;
                    myFn.ajax('post', data, apiAddress.login.ordinary_login, (res) => {
                        localStorage.userInfo = JSON.stringify(res.data);
                        location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/#/index/home';
                    });
                }
            }
        }
    }
</script>
<style>
    .login .mint-field .mint-field-core {
        text-align: left;
        color: #333333;
        display: block;
    }
    .login .mint-cell-wrapper {
        /* width: 88%; */
        margin: 2% auto;
        background-position: bottom left;
        padding: 0 30px;
    }
    .login input[disabled], .login input:disabled {
        color: #ccc;
        opacity: 1;
        background: inherit;
    }
    .login input::-webkit-input-placeholder, .login textarea::-webkit-input-placeholder {
        color:  #ccc;
        opacity: 1;
    }
    .login input:-moz-placeholder, .login textarea:-moz-placeholder {
        color: #ccc;
        opacity: 1;
    }
    .login input::-moz-placeholder, .login textarea::-moz-placeholder {
        color: #ccc;
        opacity: 1;
    }
    .login input:-ms-input-placeholder, .login textarea:-ms-input-placeholder {
        color: #ccc;
        opacity: 1;
    }

</style>
<style scoped>
    .cell-title {
        font-size: 15px;
        color: #1b69fe;
        padding-left: 30px;
        box-sizing: border-box;
        margin: 2% 0;
    }
    .gender {
        width: 10px;
        padding-right: 5px;
    }
    .back {
        font-size: 14px;
        text-align: right;
        padding-right: 10%;
        margin-top: 15px;
        color: #3077FE;
    }
    .newSser {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        text-align: center;
        color: #3077fe;
        font-size: 12px;
    }
    .login {
        height: 100%;
        background-image: url('../assets/icons/login_bg.png');
        background-size: contain;
        background-repeat: no-repeat;
    }
    .headerImg {
        width: 25%;
        border-radius: 50%;
        display: block;
        margin: 38% auto 15px;
        border: 3px solid #fff;
    }
    .department {
        font-size: 15px;
        text-align: center;
        color: #b8b8b8;
        margin: 3% 0;
    }
    .button-Group {
        margin-top: 18%;
        box-sizing: border-box;
    }
    .submit {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
    }
    .input-style{
        line-height: 62px;
        height: 62px;
    }
    .login input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    .login input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    .login input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    .login input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
    @media only screen and (max-width: 320px) and (max-height: 480px) {
        .button-Group {
            margin-top: 30px;
        }
        .department {
            margin-bottom: 10px;
        }
    }
    /* 验证码 */
    .code {
        position: relative;
    }
    .getCode {
        height: 35px;
        width: 95px;
        font-size: 12px;
        background: rgb(27, 105, 254);
        /*border: 1px #26a2ff solid;*/
        color: #fff;
        /*position: absolute;*/
        float: right;
        /*left: 0;*/
    }
</style>
<style>
    .login .code input {
        /* padding-left: 50px; */
    }
</style>
