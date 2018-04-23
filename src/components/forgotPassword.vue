<template>
    <div class="forgotPassword">
        <mt-field type="number" v-model="mobile" placeholder="请输入手机号码"></mt-field>
        <mt-field type="password" v-model="password" placeholder="请输入新密码"></mt-field>
        <mt-field type="password" v-model="repeatPassword" placeholder="请重复新密码"></mt-field>
        <mt-field v-model="captcha" class="code" type="text" placeholder="请输入验证码">
            <span class="getCodeButton" @click="get_code">获取验证码</span>
        </mt-field>
        <div class="button-Group">
            <mt-button @click="submit" class=" submit submit-login" size="large" type="primary">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'forgotPassword',
        data () {
            return {
                mobile: '',
                password: '',
                repeatPassword: '',
                captcha: ''
            }
        },
        methods: {
            get_code () {
                myFn.ajax('post', {}, apiAddress.password.passCode, (res) => {
                    myFn.toastMiddle('发送成功');
                });
            },
            submit () {
                var data = {
                    mobile: this.mobile,
                    password: this.password,
                    password_confirmation: this.repeatPassword,
                    code: this.captcha
                }
                if (data.password !== data.password_confirmation) {
                    myFn.toastMiddle('两次输入密码不相同');
                    return false;
                }
                myFn.ajax('post', data, apiAddress.password.searchpass, (res) => {
                    myFn.toastMiddle('修改成功2秒后自动跳转登录页');
                    setTimeout(() => {
                        this.$router.push({name: 'login'});
                    }, 2000);
                });
            }
        }
    }
</script>
<style scoped>
    .submit {
        width: 345px;
        height: 36px;
        color: #fff;
        font-size: 15px;
        background: #1B69FE;
        margin-top: 100px;
    }
</style>
<style>
    .forgotPassword input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    .forgotPassword input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    .forgotPassword input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    .forgotPassword input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
    .forgotPassword .mint-field-core {
        text-align: left;
    }
    .forgotPassword .code .mint-field-core {
        flex: none;
        text-align: left;
        padding-right: 100px;
        box-sizing: border-box;
    }
    .forgotPassword .code .mint-field-clear {
        display: none;
    }
    .forgotPassword .code .mint-field-other {
        position: absolute;
        right: 15px;
        line-height: 3.5;
        color: #1B69FE;
    }
    .forgotPassword .mint-cell-wrapper {
        background-position: bottom left;
    }
    .forgotPassword .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
</style>
