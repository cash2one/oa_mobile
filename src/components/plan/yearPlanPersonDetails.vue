<template>
    <div class="yearPlanPersonDetails">
        <div class="classify-title">
            <div v-html="className">学习成长</div>
            <p>——— 编辑目标</p>
        </div>
        <p class="subdivideTitle">目标内容</p>
        <mt-field class="subdivideVal" label="细分目标" placeholder="请输入目标内容">
            <p v-html="content"></p>
        </mt-field>
        <p class="subdivideTitle">方法和措施</p>
        <mt-field class="subdivideVal" label="细分目标" placeholder="请输入方法和措施">
            <p v-html="method"></p>
        </mt-field>
        <p class="subdivideTitle">起止时间</p>
        <mt-field placeholder="例如:2017-01-01" class="datePicker">
            <div>
                <span v-html="date1_text"></span>
                <span>--</span>
                <span v-html="date2_text"></span>
            </div>
        </mt-field>
        <mt-datetime-picker ref="picker" type="date" v-model="date1" @confirm="selectTime"></mt-datetime-picker>
    </div>
</template>

<script>
    export default {
        name: 'yearPlanPersonDetails',
        data () {
            return {
                date1: new Date(),
                date2: new Date(),
                date1_text: '',
                date2_text: '',
                content: '',
                method: '',
                id: '',
                className: '',
                // 选择哪个对话框
                selectId: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.className = this.$route.params.name;
            this.getdetail();
        },
        methods: {
            getdetail () {
                myFn.ajax('get', {model_type: 4, id: this.id}, apiAddress.plan.details, (res) => {
                    this.content = res.data.content;
                    this.method = res.data.method;
                    this.date1_text = res.data.start_time.replace(/-/g, '/');
                    this.date2_text = res.data.end_time.replace(/-/g, '/');
                })
            },
            open_time (type) {
                this.$refs.picker.open();
                this.selectId = type;
            },
            selectTime (val) {
                var time = myFn.getTime(val)[1].split('/');
                if (this.selectId === 1) {
                    this.date1_text = time[1] + '/' + time[2];
                } else {
                    this.date2_text = time[1] + '/' + time[2];
                }
            },
            submit () {
                var date = new Date();
                var year = date.getFullYear();
                var data = {
                    content: this.content,
                    start_time: year + '/' + this.date1_text,
                    end_time: year + '/' + this.date2_text,
                    type: 2,
                    method: this.method,
                    id: this.id
                }
                myFn.ajax('post', data, apiAddress.plan.yearPlanAdd, (res) => {
                    this.$router.push({name: 'yearTargetPersonal'})
                })
            }
        }
    }
</script>

<style>
    .yearPlanPersonDetails .mint-field .mint-cell-title {
        color: #333;
    }
    .yearPlanPersonDetails input::-moz-placeholder {
        color: #bababa;
    }
    .yearPlanPersonDetails .subdivideVal .mint-cell-wrapper {
        background-position: bottom left;
    }
    .yearPlanPersonDetails .mint-cell-wrapper {
        background-position: bottom left;
    }
    .yearPlanPersonDetails .mint-cell:last-child {
        background-size: 93% 1px;
    }
    .yearPlanPersonDetails .subdivideVal .mint-cell-title {
        display: none;
    }
    .yearPlanPersonDetails .mint-cell:first-child .mint-cell-wrapper {
        background: none;
    }
    .yearPlanPersonDetails .mint-field .mint-field-core {
        text-align: left;
        display: none;
    }
    .yearPlanPersonDetails .mint-field.datePicker .mint-field-core {
        display: none;
    }
    .yearPlanPersonDetails .mint-popup-bottom {
        width: 100%;
    }
    .yearPlanPersonDetails .picker-slot:first-child {
        display: none;
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
<style scoped>
    .subdivideTitle {
        margin: 0 15px 0px;
        /* border-top: 1px #d9d9d9 solid; */
        padding-top: 30px;
    }
    .timePicker {
        display: inline-block;
        color: #999;
    }
    .classify-title {
            padding: 20px 15px;
            position: relative;
    }
    .classify-title > div {
        display: inline-block;
        font-size: 24px;
    }
    .classify-title > p {
        margin-top: 10px;
        font-size: 12px;
        color: #999;
    }
    .submitBtn {
        width: 100%;
        position: absolute;
        bottom: 0px;
        border-radius: 0;
        background: #1B69FE;
    }
</style>