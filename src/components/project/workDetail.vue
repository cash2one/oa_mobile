<template>
    <div class="workDetail">
        <div class="table">
            <div class="table-head">
                <div>日期</div>
                <div>常规</div>
                <div>加班</div>
                <div>合计</div>
            </div>
            <div class="table-body" v-for="item in list">
                <div>2018/1/30</div>
                <div v-html="item.normal">0.8天</div>
                <div v-html="item.overtime">0.2天</div>
                <div v-html="parseFloat(item.normal) + parseFloat(item.overtime)">1天</div>
            </div>
            <div class="table-footer">
                <div>合计</div>
                <div v-html="sum1">0</div>
                <div v-html="sum2">0</div>
                <div v-html="sum3">0</div>
            </div>
            <p v-if="list.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无数据</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'workDetail',
        data () {
            return {
                id: '',
                list: [],
                sum1: 0,
                sum2: 0,
                sum3: 0
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getlist();
        },
        methods: {
            getlist () {
                myFn.ajax('get', {project_id: this.id}, apiAddress.project.workTime, res => {
                    if (res.data.data.length > 0) {
                        this.list = res.data.data || [];
                        for (var i = 0; i < this.list.length; i++) {
                            this.sum1 = parseFloat(this.sum1) + parseFloat(this.list[i].normal);
                            this.sum2 = parseFloat(this.sum2) + parseFloat(this.list[i].overtime);
                        }
                        this.sum3 = parseFloat(this.sum1) + parseFloat(this.sum2);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .workDetail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-sizing: border-box;
    }
    .table-head,
    .table-body,
    .table-footer {
        width: 100%;
        display: flex;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
    }
    .table-head {
        line-height: 45px;
    }
    .table-head > div,
    .table-body > div,
    .table-footer > div {
        flex: 1;
        text-align: center;
    }
    .table-body > div,
    .table-footer > div {
        font-size: 14px;
        color: #787878;
    }
</style>