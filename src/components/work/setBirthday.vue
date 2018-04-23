<template>
    <div class="setBirthday">
        <mt-radio align="right" v-model="value" :options="options" @change="select"></mt-radio>
        <!-- <div class="my-btn" @click="goback"><span>关闭</span></div> -->
    </div>
</template>
<script>
    export default{
        name: 'setBirthday',
        data () {
            return {
                id: '',
                value: '',
                options: [
                    /* {
                        label: '暂不提醒',
                        value: '0'
                    }, */
                    {
                        label: '1天前提醒我',
                        value: '6'
                    },
                    {
                        label: '3天前提醒我',
                        value: '7'
                    },
                    {
                        label: '7天前提醒我',
                        value: '8'
                    }
                ]
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getUserInfo();
        },
        methods: {
            getUserInfo () {
                myFn.ajax('get', {id: this.id}, apiAddress.customer.customerInfo, (res) => {
                    this.value = res.data.is_warn;
                })
            },
            select (val) {
                myFn.ajax('get', {cid: this.id, is_warn: val}, apiAddress.customer.setBirthday, (res) => {
                    this.$router.back(-1)
                })
            },
            goback () {
                this.$router.back(-1)
            }
        }
    }
</script>
<style>
    .setBirthday .mint-radiolist-title {
        display: none;
    }
    .setBirthday .mint-cell:first-of-type .mint-cell-wrapper {
        background: none;
    }
    .setBirthday .mint-radiolist-label {
        padding-left: 0;
    }
</style>
<style scoped>
    .my-btn {
        height: 41px;
        line-height: 41px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-left: 0;
        border-right: 0;
        margin-top: 30px;
        padding-left: 25px;
    }
</style>