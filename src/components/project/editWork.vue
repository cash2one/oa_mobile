<template>
    <div class="editWork">
        <div v-if="list.length > 0">
            <mt-field label="常规时间" placeholder="请输时间 例：0.5" type="number" v-model="info.normal" ></mt-field>
            <mt-field label="加班时间" placeholder="请输时间 例：0.5" type="number" v-model="info.overtime" ></mt-field>
            <ul class="list">
                <li class="label">项目任务</li>
                <li class="item" v-for="(item, index) in list">
                    <p v-html="item.mission_name"></p>
                    <p>时间：<span v-html="item.pre_time"></span></p>
                    <div v-if="item.status == 1" @click="select(item.status, index)"></div>
                    <img v-else src="../../assets/icon/yes.png" @click="select(item.status, index)">
                </li>
            </ul>
            <mt-button type="primary" size="large" @click="save">保存</mt-button>
        </div>
        <p v-if="list.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无任务</p>
    </div>
</template>

<script>
    export default {
        name: 'editWork',
        data () {
            return {
                id: '',
                info: {
                    normal: '',
                    overtime: '',
                    mission: []
                },
                list: []
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getlist();
        },
        methods: {
            getlist () {
                myFn.ajax('get', {project_id: this.id, status: 1}, apiAddress.project.mission, res => {
                    this.list = res.data.data || [];
                })
            },
            select (status, index) {
                this.list[index].status = parseInt(this.list[index].status) === 1 ? 2 : 1;
            },
            save () {
                for (var i = 0; i < this.list.length; i++) {
                    if (parseInt(this.list[i].status) === 2) {
                        for (var n = 0; n < this.info.mission.length; n++) {
                            if (parseInt(this.info.mission[n].id) !== parseInt(this.list[i].id)) {
                                this.info.mission.push(this.list[i].id)
                            }
                        }
                    }
                }
                var obj = {
                    project_id: this.id,
                    normal: this.info.normal,
                    overtime: this.info.overtime,
                    mission: this.info.mission.join(',')
                }
                for (var j = 0; j < window.task.length; j++) {
                    if (parseInt(window.task[j].project_id) === parseInt(obj.project_id)) {
                        window.task[j] = obj;
                    }
                }
                console.log(window.task);
            }
        }
    }
</script>

<style>
    .editWork .mint-button {
        position: fixed;
        bottom: 0;
        border: 0;
        border-radius: 0;
        background-color: #1B69FE;
    }
</style>

<style scoped>
    .editWork {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        padding-bottom: 41px;
    }
    .list {
        margin-top: 10px;
    }
    .label {
        background-color: #fff;
        padding: 15px;
        border-bottom: 1px solid #d9d9d9;
    }
    .item {
        padding: 15px;
        border-bottom: 1px solid #d9d9d9;
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        padding-right: 45px;
        font-size: 15px;
        color: #787878;
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