<template>
    <div class="birthdayRemind">
        <mt-radio
        align="right"
        v-model="value"
        :options="options" @change="select(value)">
        </mt-radio>    
    <div class="go_Add" @click="go_AddCustomer">关闭</div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                options: [
                    {
                        label: '一天后提醒我',
                        value: 'A'
                    },
                    {
                        label: '三天后提醒我',
                        value: 'B'
                    },
                    {
                        label: '七天后提醒我',
                        value: 'C'
                    }],
                value: ''
            }
        },
        methods: {
            go_AddCustomer () {
                this.$router.push({name: 'addCustomer'})
            },
            select (value) {
                if (value === 'A') {
                    myFn.ajax('get', {}, apiAddress.birthday.birthdayRemind, (res) => {})
                }
                if (value === 'B') {
                    myFn.ajax('get', {}, apiAddress.birthday.birthdayRemind, (res) => {})
                }
                if (value === 'C') {
                    myFn.ajax('get', {}, apiAddress.birthday.birthdayRemind, (res) => {})
                }
            }
        }
    }
</script>
<style>
    .go_Add{
        margin-top:30px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 55px;
        line-height: 56px;
        padding: 0 30px;
        background: #fff;
    }
</style>