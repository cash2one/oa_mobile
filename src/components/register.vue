<template>
    <div class="register">
        <mt-field label="姓名" type="text" v-model="name" ></mt-field>
        <mt-field label="性别" class="selectInput" v-model="gender">
            <select v-model="gender" style="direction: rtl;">
                <option value="1">男</option>
                <option value="2">女</option>
            </select>
        </mt-field>
        <mt-field label="联系电话" type="text" v-model.number="mobile" ></mt-field>
        <mt-field label="验证码" v-model="captcha" class="code" type="text">
            <span class="getCodeButton" @click="get_mobileCode">获取验证码</span>
        </mt-field>
        <mt-field label="新密码" type="password" v-model="password" ></mt-field>
        <mt-field label="重复新密码" type="password" v-model="repeatPassword" ></mt-field>
        <div class="button-Group">
            <mt-button @click="submit" class="submit" size="large">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data () {
            return {
                name: '',
                gender: 1,
                mobile: '',
                captcha: '',
                password: '',
                repeatPassword: ''
            }
        },
        methods: {
            submit () {
                if (this.name === '') {
                    alert('姓名不能为空');
                    return false;
                };
                if (this.mobile === '') {
                    alert('电话不能为空');
                    return false;
                };
                if (this.captcha === '') {
                    alert('验证码不能为空');
                    return false;
                };
                if (this.password !== this.repeatPassword) {
                    alert('两次输入密码不相同');
                    return false;
                }
                var data = {
                    name: this.name,
                    sex: this.gender,
                    mobile: this.mobile,
                    code: this.captcha,
                    password: this.password
                }
                myFn.ajax('post', data, apiAddress.login.register, (res) => {
                    this.$router.push({name: 'statePage', params: {type: 3}});
                });
            },
            get_mobileCode () {
                myFn.ajax('post', {mobile: this.mobile}, apiAddress.mobile.registerCode, (res) => {});
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
    .register .mint-field-core {
        text-align: left;
    }
    .register .code .mint-field-core {
        flex: none;
        text-align: left;
        padding-right: 100px;
        box-sizing: border-box;
    }
    .register .code .mint-field-clear {
        display: none;
    }
    .register .code .mint-field-other {
        position: absolute;
        right: 15px;
        line-height: 3.5;
        color: #1B69FE;
    }
    .register .mint-cell-wrapper {
        background-position: bottom left;
    }
    .register .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
</style>
