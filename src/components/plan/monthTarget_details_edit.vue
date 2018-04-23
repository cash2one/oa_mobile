<template>
    <div class="monthTarget_details_edit">
        <div v-if="details.type==1">
            <p class="title"><span v-html="month"></span>月份目标</p>
            <p class="contont_title">目标内容</p>
            <input type="text" class="content" v-model="details.content"/>
            <p class="method">方法和措施</p>
            <textarea class="method_content_list" v-model="details.method"></textarea>
        </div>
        <div v-if="details.type==2">
            <p class="title"><span v-html="month"></span>月份目标</p>
            <p class="contont_title">目标类型</p>
            <input type="text" class="content" disabled v-model="details.cate_name"/>
            <p class="method">目标内容</p>
            <textarea class="method_content_list" v-model="details.content"></textarea>
        </div>
        <div class="btn-group">
            <div @click="del"><img src="../../assets/icon/xxdel.png" width="20"></div>
            <div @click="edit"><img src="../../assets/icon/confirm.png" width="25"></div>
        </div>
        <!-- <mt-button class="delBtn" type="default">删除</mt-button>
        <mt-button class="preservationBtn" type="default">保存</mt-button> -->
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'monthTarget_details',
        data () {
            return {
                id: '',
                details: '',
                month: '',
                date: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getdetail()
        },
        methods: {
            getdetail () {
                myFn.ajax('get', {model_type: 3, id: this.id}, apiAddress.plan.details, (res) => {
                    this.details = res.data;
                    var date = new Date(res.data.start_time);
                    this.month = date.getMonth() + 1;
                    this.date = date.getFullYear() + '-' + this.month;
                })
            },
            edit () {
                var data = {};
                if (parseInt(this.details.type) === 1) {
                    data.month_start = this.date;
                    data.type = this.details.type;
                    data.method = this.details.method;
                    data.id = this.id;
                    data.content = this.details.content;
                };
                if (parseInt(this.details.type) === 2) {
                    data.month_start = this.date;
                    data.type = this.details.type;
                    data.id = this.id;
                    data.content = this.details.content;
                    data.cate_name = this.details.cate_name;
                };
                myFn.ajax('post', data, apiAddress.plan.monthPlanAdd, (res) => {
                    this.$router.back(-1);
                })
            },
            del () {
                MessageBox.confirm('确定删除该目标?').then(action => {
                    myFn.ajax('get', {model_type: 3, id: this.id}, apiAddress.plan.del, (res) => {
                        this.$router.push({name: 'monthPlan'})
                    })
                }, cancel => {
                    console.log(2)
                });
            }
        }
    }
</script>
<style scoped>
    .monthTarget_details_edit {
        padding: 15px 15px;
        box-sizing: border-box;
        line-height: 25px;
    }
    .title {
        font-size: 15px;
        color: #999;
    }
    .contont_title {
        margin:10px 0px;
        font-size: 15px;
    }
    .content {
        width: 100%;
        border: none;
        font-size: 20px;
        margin-bottom: 20px;
    }
    .method {
        font-size: 15px;
        margin-bottom: 10px;
        padding-top: 20px;
        border-top: 1px #ccc solid;
    }
    .method_content_list {
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        border: none;
        padding: 7px;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
        resize: none;
    }
    .delBtn, .preservationBtn {
        position: fixed;
        bottom: 0;
        width: 50%;
        padding-left: 0px;
        margin-left: -15px;
    }
    .preservationBtn {
        left: 50%;
    }
    .btn-group {
        position: fixed;
        width: 100%;
        height: 42px;
        bottom: 0;
        left: 0;
        display: flex;
    }
    .btn-group >  div {
        flex: 1;
        text-align: center;
    }
    .btn-group >  div:first-child {
        background: #E6E6E6;
    }
    .btn-group >  div:last-child {
        background: #1b69fe;
    }
    .btn-group >  div:first-child img {
        margin-top: 11px;
    }
    .btn-group >  div:last-child img {
        margin-top: 8px;
    }
</style>