<template>
    <div class="otherPlanEdit">
        <div class="form">
            <div class="form-wrapper">
                <label class="form-label">类型</label>
                <div class="form-control"><input type="text" disabled placeholder="理财规划" v-model="cate_name"></div>
            </div>
            <div class="form-wrapper">
                <label class="form-label">目标</label>
                <!-- <div class="form-control"><input type="text" placeholder="购买xxx基金" v-model="content"></div> -->
                <div class="form-control">
                    <!-- <input type="text" placeholder="看完一本名著" v-model="content"> -->
                    <textarea cols="30" rows="5" v-model="content"></textarea>
                </div>
            </div>
            <!-- <div class="form-wrapper">
                <label class="form-label">完成期限</label>
                <div class="form-control"><input type="text" placeholder="周五" v-model="dead_time"></div>
            </div> -->
        </div>
        <div class="btn-group">
            <div @click="del"><img src="../../assets/icon/xxdel.png" width="20"></div>
            <div @click="edit"><img src="../../assets/icon/confirm.png" width="25"></div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'otherPlanEdit',
        data () {
            return {
                pickerVisible: new Date(),
                popupVisible: false,
                id: '',
                cate_name: '',
                content: '',
                dead_time: '',
                date: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getdetail();
        },
        methods: {
            getdetail () {
                myFn.ajax('get', {model_type: 2, id: this.id}, apiAddress.plan.details, (res) => {
                    this.content = res.data.content;
                    // this.dead_time = res.data.dead_time;
                    this.cate_name = res.data.cate_name;
                    this.date = res.data.start_time;
                })
            },
            edit () {
                // var date = new Date();
                // var year = date.getFullYear();
                myFn.ajax('post', {
                    content: this.content,
                    type: 2,
                    // dead_time: this.dead_time,
                    id: this.id,
                    cate_name: this.cate_name,
                    week_start: this.date
                }, apiAddress.plan.addWeekPlan, (res) => {
                    this.$router.back(-1);
                })
            },
            del () {
                MessageBox.confirm('确定删除该目标?').then(action => {
                    myFn.ajax('get', {model_type: 2, id: this.id}, apiAddress.plan.del, (res) => {
                        this.$router.push({name: 'weekPlan'})
                    })
                }, cancel => {
                    console.log(2)
                });
            }
        },
        watch: {
            pickerVisible: function () {
                this.date = this.pickerVisible.getFullYear() + '-' + (this.pickerVisible.getMonth() + 1) + '-' + this.pickerVisible.getDate();
            }
        }
    }
</script>

<style>
    .otherPlanEdit .mint-popup-bottom {
        width: 100%;
    }
    .otherPlanEdit .picker-toolbar {
        padding: 0 15px;
        text-align: right;
        border-bottom: 1px solid #ededed;
        line-height: 40px;
    }
</style>

<style scoped>
    .form {
        padding: 0 15px;
        background: #fff;
    }
    .form-wrapper {
        line-height: 50px;
    }
    .form-label {
        float: left;
        width: 70px;
        margin-top: 3px;
    }
    .form-control {
        width: 100%;
        font-size: 0;
        padding-left: 80px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form-control input,
    .form-control textarea {
        width: 100%;
        font-size: 14px;
        border: 0;
    }
    .form-control textarea {
        margin-top: 10px;
        resize: none;
    }
    .form-control input {
        margin-top: 15px;
        height: 25px;
    }
    .form-control > span {
        width: 10%;
        text-align: center;
    }
    .form-control > div,
    .form-control > span {
        display: inline-block;
        font-size: 14px;
    }
    .form-wrapper,
    .form {
        border-bottom: 1px solid #ededed;
    }
    .form-wrapper:last-child {
        border: 0;
    }
    .timePicker {
        margin-top: 3px;
        text-align: center;
    }
    .selected {
        background: #fff;
        line-height: 55px;
    }
    .selected .form-label {
        margin-top: 0;
    }
    .selected .form-control {
        width: 100%;
    }
    .selected .form-control > div {
        width: 100%;
    }
    .selected .form-control img {
        float:right;
        margin-top: 20px;
    }
    .btn-group {
        position: fixed;
        width: 100%;
        height: 42px;
        bottom: 0;
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
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
</style>