<template>
    <div class="centerPhoneNew">
        <mt-field label="新手机号" type="tel" v-model="phone" ></mt-field>
        <mt-field label="验证码" v-model="captcha" class="code" type="text">
            <span class="getCodeButton" @click="getCode">获取验证码</span>
        </mt-field>
        <div class="button-Group">
            <mt-button @click="submit" class="submit" size="large">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'centerPhoneNew',
        data () {
            return {
                phone: '',
                captcha: ''
            }
        },
        methods: {
            getCode () {
                myFn.ajax('post', {new_mobile: this.phone}, apiAddress.mobile.code, (res) => {
                    myFn.toastMiddle('发送成功');
                });
            },
            submit () {
                var data = {
                    new_mobile: this.phone,
                    code: this.captcha
                }
                myFn.ajax('post', data, apiAddress.mobile.change, (res) => {
                    myFn.setUserInfo('mobile', this.phone);
                    myFn.toastMiddle('修改成功');
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 2000);
                })
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
    .centerPhoneNew .mint-field-core {
        text-align: left;
    }
    .centerPhoneNew .code .mint-field-core {
        flex: none;
        text-align: left;
        padding-right: 100px;
        box-sizing: border-box;
    }
    .centerPhoneNew .code .mint-field-clear {
        display: none;
    }
    .centerPhoneNew .getCodeButton {
        position: absolute;
        right: 15px;
    }
    .centerPhoneNew .code .mint-field-other {
        position: absolute;
        width: 100%;
        line-height: 3.5;
        color: #1B69FE;
    }
    .centerPhoneNew .mint-cell-wrapper {
        background-position: bottom left;
    }
    .centerPhoneNew .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
</style>
