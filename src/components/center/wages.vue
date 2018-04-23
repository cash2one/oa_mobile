<template>
    <div class="wages">
        <mt-cell v-for="(item,key) in list" :title="item.create_time" :to="'/index/center/wagesDetails/' + item.aid" is-link>
            <span :class="[item.is_sure == 0 ?'red':'green']" v-html="item.is_sure == 0 ?'未确认':'已确认'"></span>
        </mt-cell>
        <p v-if="list.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无记录</p>
    </div>
</template>

<script>
    export default {
        name: 'wages',
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.getMySalary();
        },
        methods: {
            getMySalary () {
                myFn.ajax('get', {}, apiAddress.center.getMySalary, (res) => {
                    this.list = res.data.data;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .wages .mint-cell-wrapper {
        background-origin: border-box;
        background-position: bottom left;
    }
</style>
<style scoped>
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>