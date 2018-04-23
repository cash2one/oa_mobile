<template>
    <div class="dayPlanEdit">
        <div class="form">
            <div class="form-wrapper">
                <label class="form-label">日期</label>
                <div class="form-control"><input type="text" disabled placeholder="请选择日期" v-model="date" @click="openPicker(1)" :disabled="isedit == 1"></div>
            </div>
            <div class="form-wrapper">
                <label class="form-label">时间</label>
                <div class="form-control">
                    <div class="timePicker" @click="openPicker(2)" v-html="pickerValue1"></div>
                    <span> -- </span>
                    <div class="timePicker" @click="openPicker(3)" v-html="pickerValue2"></div>
                </div>
            </div>
            <div class="form-wrapper">
                <label class="form-label">事项</label>
                <div class="form-control" style="padding-left: 0;">
                    <textarea cols="30" rows="5" placeholder="请输入事项内容" v-model="content" :disabled="isedit == 1"></textarea>
                </div>
            </div>
        </div>
        <div class="selected">
            <label class="form-label">优先级</label>
            <div class="form-control">
                <div @click="openSelect">
                    <span v-html="selectedValue?selectedValue:'A'"></span>
                    <img v-if="isedit == 0" src="../../assets/icon/triangle_down.png" width="15">
                </div>
            </div>
        </div>
        <!-- <button class="my-btn" @click="submit"><img src="../../assets/icon/confirm.png" width="30"></button> -->
        <div class="btn-group" v-if="isedit == 0">
            <div @click="del"><img src="../../assets/icon/xxdel.png" width="20"></div>
            <div @click="submit"><img src="../../assets/icon/confirm.png" width="25"></div>
        </div>
        <mt-datetime-picker
            ref="picker1"
            v-model="pickerVisible"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>
        <mt-datetime-picker ref="picker2" type="time" v-model="pickerValue1"></mt-datetime-picker>
        <mt-datetime-picker ref="picker3" type="time" v-model="pickerValue2"></mt-datetime-picker>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" showToolbar @change="onValuesChange">
                <span class="confirm" @click="popupVisible = false">确认</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'dayPlanEdit',
        data () {
            return {
                pickerValue1: '08:00',
                pickerValue2: '12:00',
                pickerVisible: new Date(),
                date: '',
                popupVisible: false,
                slots: [
                    {
                        flex: 1,
                        values: ['A', 'B', 'C', 'D', 'E', 'F'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                selectedValue: 'A',
                id: '',
                content: '',
                isedit: ''
            }
        },
        mounted () {
            this.isedit = this.$route.params.isedit;
            this.getPriority();
            this.id = this.$route.params.id;
            this.getdetail();
        },
        methods: {
            openPicker (type) {
                if (this.isedit) return;
                switch (parseInt(type)) {
                    case 1:
                        this.$refs.picker1.open();
                        this.date = this.pickerVisible.getFullYear() + '-' + (this.pickerVisible.getMonth() + 1) + '-' + this.pickerVisible.getDate();
                        break;
                    case 2:
                        this.$refs.picker2.open();
                        break;
                    case 3:
                        this.$refs.picker3.open();
                        break;
                }
            },
            openSelect () {
                if (parseInt(this.isedit) === 0) {
                    this.popupVisible = true;
                }
            },
            onValuesChange (picker, values) {
                this.selectedValue = values[0];
                // console.log(values[0])
            },
            getdetail () {
                myFn.ajax('get', {id: this.id}, apiAddress.plan.dayItemDetails, (res) => {
                    this.date = res.data.day;
                    this.pickerValue1 = res.data.detail_time_start;
                    this.pickerValue2 = res.data.detail_time_end;
                    this.content = res.data.content;
                    this.selectedValue = res.data.prior_code;
                })
            },
            getPriority () {
                myFn.ajax('get', {}, apiAddress.plan.priority, (res) => {
                    this.slots[0].values = res.data;
                })
            },
            del () {
                MessageBox.confirm('确定删除该目标?').then(action => {
                    myFn.ajax('get', {model_type: 1, id: this.id}, apiAddress.plan.del, (res) => {
                        // this.$router.push({name: 'dayPlan'})
                        this.$router.back(-1);
                    })
                }, cancel => {
                    console.log(2)
                });
            },
            submit () {
                var data = {
                    day: this.date,
                    detail_time_start: this.pickerValue1,
                    detail_time_end: this.pickerValue2,
                    content: this.content,
                    prior_code: this.selectedValue,
                    id: this.id
                }
                if (!this.content) return;
                myFn.ajax('post', data, apiAddress.plan.dayPlanAdd, (res) => {
                    this.$router.back(-1);
                })
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
    .dayPlanEdit .mint-popup-bottom {
        width: 100%;
    }
    .dayPlanEdit .picker-toolbar {
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
        line-height: 60px;
    }
    .form-label {
        float: left;
        width: 60px;
        /* margin-top: 3px; */
    }
    .form-control {
        width: 100%;
        font-size: 0;
        padding-left: 60px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form-control input,
    .form-control textarea {
        width: 100%;
        font-size: 16px;
        border: 0;
    }
    .form-control textarea {
        margin-top: 0;
        resize: none;
        padding: 0;
    }
    .form-control input {
        margin-top: 18px;
        height: 25px;
    }
    .form-control > span {
        width: 10%;
        text-align: center;
    }
    .form-control > div,
    .form-control > span {
        display: inline-block;
        font-size: 16px;
    }
    .form-wrapper,
    .form {
        border-bottom: 1px solid #ededed;
    }
    .form-wrapper:last-child {
        border: 0;
    }
    .timePicker {
        /* margin-top: 3px; */
        text-align: center;
    }
    .selected {
        background: #fff;
        line-height: 55px;
        margin-top: 10px;
        padding: 0 15px;
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
        font-size: 0;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .btn-group > div {
        display: inline-block;
        width: 50%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        vertical-align: top;
    }
    .btn-group > div:first-child {
        background: #e6e6e6;
    }
    .btn-group > div:last-child {
        background: blue;
    }
    .btn-group > div img {
        margin-top: 12px;
    }
    .my-btn {
        background: #1b69fe;
        position: fixed;
        bottom: 0;
        color: #fff;
        border: 0;
        width: 100%;
        height: 42px;
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