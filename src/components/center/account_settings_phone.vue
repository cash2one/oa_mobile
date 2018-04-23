<template>
    <div class="centerPhone">
        <p class="phoneTitle">当前绑定号码</p>
        <p class="phone" v-html="phone"></p>
        <mt-field label="验证码" v-model="captcha" class="code" type="text">
            <span class="getCodeButton" @click="get_code">获取验证码</span>
        </mt-field>

        <div class="button-Group">
            <mt-button @click="go_next" class="submit" size="large">下一步</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'centerPhone',
        data () {
            return {
                phone: '',
                captcha: ''
            }
        },
        mounted () {
            this.phone = JSON.parse(localStorage.userInfo).mobile;
        },
        methods: {
            get_code () {
                myFn.ajax('post', {}, apiAddress.mobile.mobileCode, (res) => {
                    myFn.toastMiddle('发送成功');
                });
            },
            go_next () {
                myFn.ajax('post', {code: this.captcha}, apiAddress.mobile.backVerification, (res) => {
                    this.$router.push({name: 'centerPhoneNew'});
                });
            }
        }
    }
</script>
<style scoped>
    .phoneTitle, .phone {
        color: #bababa;
        margin: 0 15px;
    }
    .phoneTitle {
        padding-top: 10px;
        font-size: 16px;
    }
    .phone {
        border-bottom: 1px #d9d9d9 solid;
        padding-bottom: 15px;
        padding-top:10px;
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
        margin-top: 100px;
    }
</style>
<style>
    .centerPhone .mint-field .mint-cell-title {
        color: #333333;
    }
    .centerPhone .code .mint-field-core {
        flex: none;
        text-align: left;
        padding-right: 80px;
        box-sizing: border-box;
        max-width: 100%;
        min-width: 100%;
    }
    .centerPhone .code .mint-field-clear {
        display: none;
    }
    .centerPhone .getCodeButton {
        position: absolute;
        right: 15px;
    }
    .centerPhone .code .mint-field-other {
        position: absolute;
        line-height: 3.5;
        color: #1B69FE;
        width: 100px;
    }
    .centerPhone .mint-cell:last-child {
        background-image: none; 
    }
    .centerPhone .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .centerPhone .mint-cell-wrapper {
        background-position: bottom left;
    }
</style>
