<template>
    <div class="task">
        <ul class="list">
            <li class="item" v-for="item in list">
                <p v-html="item.mission_name"></p>
                <p>时间：<span v-html="item.pre_time"></span></p>
                <img v-if="item.status == 2" src="../../assets/icon/yes.png">
            </li>
        </ul>
        <p v-if="list.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无任务</p>
    </div>
</template>

<script>
    export default {
        name: 'task',
        data () {
            return {
                id: '',
                list: []
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getlist();
        },
        methods: {
            getlist () {
                myFn.ajax('get', {project_id: this.id}, apiAddress.project.mission, res => {
                    if (res.data.data.length > 0) {
                        this.list = res.data.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        margin-top: 10px;
        padding: 15px;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        padding-right: 45px;
        font-size: 15px;
    }
    .item > p {
        margin-bottom: 5px;
    }
    .item > div {
        position: absolute;
        top: 25px;
        right: 15px;
        width: 20px;
        height: 20px;
        border: 1px solid #d9d9d9;
        border-radius: 50%;
    }
    .item > img {
        position: absolute;
        top: 21px;
        right: 10px;
        width: 31px;
    }
</style>