<template>
    <div class="wagesDetails">
        <div class="table">
            <div><span>工资项</span><span>金额</span></div>
            <div v-for="(item,key) in salary"><span v-html="item.name">工资项</span><span v-html="item.value">金额</span></div>
        </div>
        <div class="button-Group" v-if="is_sure == 0">
            <mt-button @click="submit" class="submit" size="large">确认</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wagesDetails',
        data () {
            return {
                list: {},
                ruleName: [],
                id: '',
                salary: [],
                is_sure: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getdetails();
        },
        methods: {
            getdetails () {
                myFn.ajax('get', {aid: this.id}, apiAddress.center.salaryDetails, (res) => {
                    this.list = res.data.salary_json;
                    this.is_sure = res.data.is_sure;
                    this.getRuleName();
                })
            },
            getRuleName () {
                myFn.ajax('get', {aid: this.id}, apiAddress.center.salaryRule, (res) => {
                    this.ruleName = res.data.salary_rule;
                    for (var item in this.list) {
                        for (var i = 0; i < this.ruleName.length; i++) {
                            if (parseInt(this.ruleName[i].id) === parseInt(item)) {
                                this.salary.push({name: this.ruleName[i].salary_field, value: this.list[item]})
                            };
                        };
                    }
                })
            },
            submit () {
                myFn.ajax('get', {aid: this.id}, apiAddress.center.salaryConfirm, (res) => {
                    this.$router.push({name: 'wages'})
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wagesDetails {
        padding: 10px;
    }
    .table > div {
        font-size: 0;
    }
    .table > div span {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: 16px;
        box-sizing: border-box;
        border: 1px solid #aaa;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        border-bottom: 0;
    }
    .table > div span:nth-child(even) {
        border-left: 0;
    }
    .table > div:last-child span {
        border-bottom: 1px solid #aaa;
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
</style>