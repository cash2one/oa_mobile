<template>
	<div class="dayWork">
		<div class="content-wrapper" v-if="project_list.length > 0">
            <mt-cell v-for="(item, index) in project_list" class="center-item" :title="item.name" is-link @click.native="open(item.id, index)"></mt-cell>
            <mt-button type="primary" size="large" @click="submit">提交</mt-button>
        </div>
        <p v-if="project_list.length == 0" style="text-align: center;color: #999;font-size: 14px;margin-top: 30%;">暂无项目</p>
        <mt-popup v-model="popupVisible" position="right">
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
        </mt-popup>
	</div>
</template>

<script>
    export default {
        name: 'dayWork',
        data () {
            return {
                project_id: '',
                project_list: [],
                page: 1,
                popupVisible: false,
                list: [],
                info: {
                    normal: '',
                    overtime: '',
                    mission: []
                },
                index: '',
                cache: []
            }
        },
        mounted () {
            this.getlist();
        },
        methods: {
            open (id, index) {
                this.popupVisible = true;
                this.getTaskList(id);
                this.index = index;
                this.project_id = id;
            },
            getlist () {
                myFn.ajax('get', {status: 1}, apiAddress.project.list, res => {
                    this.project_list = res.data.data || [];
                    if (this.project_list.length) {
                        // 存项目任务列表初始状态
                        for (var i = 0; i < this.project_list.length; i++) {
                            this.cache.push({
                                project_id: this.project_list[i].id,
                                normal: '',
                                overtime: '',
                                mission: ''
                            })
                        }
                    }
                })
            },
            // 当前的项目编辑状态
            getTaskList (id) {
                myFn.ajax('get', {project_id: id, status: 1}, apiAddress.project.mission, res => {
                    for (var i = 0; i < res.data.data.length; i++) {
                        for (var j = 0; j < this.cache.length; j++) {
                            if (parseInt(res.data.data[i].project_id) === parseInt(this.cache[j].project_id)) {
                                if (this.cache[j].mission !== '') {
                                    var arr = this.cache[j].mission.split(',');
                                    for (var k = 0; k < arr.length; k++) {
                                        if (parseInt(res.data.data[i].id) === parseInt(arr[k])) {
                                            res.data.data[i].status = 2;
                                        }
                                    }
                                }
                                this.info.normal = this.cache[j].normal;
                                this.info.overtime = this.cache[j].overtime;
                            }
                        }
                    }
                    this.list = res.data.data || [];
                })
            },
            select (status, index) {
                this.list[index].status = parseInt(this.list[index].status) === 1 ? 2 : 1;
            },
            save () {
                // 提交编辑后的项目状态
                this.info.mission = []
                for (var i = 0; i < this.list.length; i++) {
                    if (parseInt(this.list[i].status) === 2) {
                        this.info.mission.push(this.list[i].id)
                    }
                }
                if (this.info.mission.length) {
                    this.info.mission = this.info.mission.join(',');
                } else {
                    this.info.mission = ''
                }
                var obj = {
                    project_id: this.project_id,
                    normal: this.info.normal,
                    overtime: this.info.overtime,
                    mission: this.info.mission
                }
                if (this.info.mission !== '') {
                    this.info.mission = this.info.mission.split(',');
                } else {
                    this.info.mission = [];
                }
                for (var j = 0; j < this.cache.length; j++) {
                    if (parseInt(this.cache[j].project_id) === parseInt(obj.project_id)) {
                        this.cache[j] = obj;
                    }
                }
                this.popupVisible = false;
                // console.log(this.cache)
            },
            submit () {
                var form = new FormData();
                for (var i = 0; i < this.cache.length; i++) {
                    form.append('project[]', JSON.stringify(this.cache[i]));
                }
                myFn.uploadImg(form, apiAddress.project.submit, (res) => {
                    this.$router.back(-1);
                });
            }
        }
    }
</script>

<style>
    .dayWork .mint-cell {
        margin-bottom: 7px;
    }
    .dayWork .mint-popup-right {
        left: 30%;
        height: 100%;
    }
    .dayWork .mint-button {
        position: fixed;
        bottom: 0;
        border: 0;
        border-radius: 0;
        background-color: #1B69FE;
    }
    .dayWork .mint-field .mint-cell-title {
        width: 70px;
    }
    .dayWork .mint-cell-wrapper {
        background: none;
    }
</style>

<style scoped>
    .content-wrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #f2f2f2;
        padding-bottom: 54px;
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