<template>
    <div class="yearPlanAdd_cause">
        <mt-field label="起始时间" placeholder="例如:2017-01-01" class="datePicker" >
            <div>
                <div class="timePicker" v-html="date1_text||'开始时间'" @click="open_time(1)"></div>
                <span>--</span>
                <div class="timePicker" v-html="date2_text||'结束时间'" @click="open_time(2)"></div>
            </div>
        </mt-field>
        <p class="subdivideTitle">目标内容</p>
        <mt-field class="subdivideVal" label="细分目标" placeholder="请输入目标内容" v-model="content"></mt-field>
        <p class="subdivideTitle">方法和措施</p>
        <mt-field class="subdivideVal" label="细分目标" placeholder="请输入方法和措施" v-model="methods"></mt-field>
        <mt-datetime-picker ref="picker" type="date" v-model="date1" @confirm="selectTime"></mt-datetime-picker>
        <mt-button type="primary" class="submitBtn" @click="submit">
            <img slot="icon" src="../../assets/icon/confirm.png" style="width: 30px;" />
        </mt-button>
    </div>
</template>

<script>
    export default {
        name: 'yearPlanAdd_cause',
        data () {
            return {
                date1: new Date(),
                date2: new Date(),
                date1_text: '',
                date2_text: '',
                content: '',
                methods: '',
                // 选择哪个对话框
                selectId: ''
            }
        },
        mounted () {},
        methods: {
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
                    type: 1,
                    method: this.methods
                }
                myFn.ajax('post', data, apiAddress.plan.yearPlanAdd, (res) => {
                    this.$router.back(-1);
                })
            }
        }
    }
</script>

<style>
    .yearPlanAdd_cause .mint-field .mint-cell-title {
        color: #333;
    }
    .yearPlanAdd_cause input::-moz-placeholder {
        color: #bababa;
    }
    .yearPlanAdd_cause .subdivideVal .mint-cell-wrapper {
        background-position: bottom left;
    }
    .yearPlanAdd_cause .mint-cell-wrapper {
        background-position: bottom left;
    }
    .yearPlanAdd_cause .mint-cell:last-child {
        background-size: 93% 1px;
    }
    .yearPlanAdd_cause .subdivideVal .mint-cell-title {
        display: none;
    }
    .yearPlanAdd_cause .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .yearPlanAdd_cause .mint-field .mint-field-core {
        text-align: left;
    }
    .yearPlanAdd_cause .mint-field.datePicker .mint-field-core {
        display: none;
    }
    .yearPlanAdd_cause .mint-popup-bottom {
        width: 100%;
    }
    .yearPlanAdd_cause .picker-slot:first-child {
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
    .submitBtn {
        width: 100%;
        position: absolute;
        bottom: 0px;
        border-radius: 0;
        background: #1B69FE;
    }
</style>