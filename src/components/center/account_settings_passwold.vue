<template>
    <div class="centerPassword">
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
        name: 'centerPassword',
        data () {
            return {
                phone: '',
                password: '',
                repeatPassword: '',
                captcha: ''
            }
        },
        methods: {
            get_code () {
                myFn.ajax('post', {}, apiAddress.mobile.mobileCode, (res) => {
                    myFn.toastMiddle('发送成功');
                });
            },
            submit () {
                if (this.password !== this.repeatPassword) {
                    myFn.toastMiddle('两次输入密码不相同');
                    return false;
                }
                var data = {
                    password: this.password,
                    password_confirmation: this.repeatPassword,
                    code: this.captcha
                }
                myFn.ajax('post', data, apiAddress.password.changePassword, (res) => {
                    myFn.toastMiddle('修改成功');
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 2000);
                });
            }
        }
    }
</script>
<style scoped>
    .submit {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
        margin-top: 100px;
    }
</style>
<style>
    .centerPassword .mint-field-core {
        text-align: left;
    }
    .centerPassword .code .mint-field-core {
        flex: none;
        text-align: left;
        padding-right: 100px;
        box-sizing: border-box;
    }
    .centerPassword .code .mint-field-clear {
        display: none;
    }
    .centerPassword .getCodeButton {
        position: absolute;
        right: 15px;
    }
    .centerPassword .code .mint-field-other {
        position: absolute;
        width: 100px;
        line-height: 3.5;
        color: #1B69FE;
    }
    .centerPassword .mint-cell-wrapper {
        background-position: bottom left;
    }
    .centerPassword .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .centerPassword input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    .centerPassword input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    .centerPassword input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    .centerPassword input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
</style>
