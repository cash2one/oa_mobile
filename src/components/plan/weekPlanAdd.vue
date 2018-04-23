<template>
    <div class="weekTargetNew">
        <div class="navbar">
            <span :class="{'active': selectTab==1}" @click="toggleTab(1)">工作目标</span>
            <i class="line"></i>
            <span :class="{'active': selectTab==2}" @click="toggleTab(2)">其他目标</span>
        </div>
        <div class="tab1" v-show="selectTab == 1">
            <mt-field label="日期" placeholder="请选择日期" class="datePicker">
                <div>
                    <div class="timePicker" @click="openPicker(2)" v-html="date1"></div>
                </div>
            </mt-field>
            <mt-field class="mb" label="目标" placeholder="请输入目标" type="text" v-model="targetContent"></mt-field>
            <div class="selected">
                <label class="form-label">完成期限</label>
                <div class="form-control">
                    <div @click="popupVisible2 = true">
                        <span v-html="selectedValue2?selectedValue2:'周六'"></span>
                        <img src="../../assets/icon/triangle_down.png" width="15">
                    </div>
                </div>
            </div>
            <div class="selected">
                <label class="form-label">优先顺序</label>
                <div class="form-control">
                    <div @click="popupVisible = true">
                        <span v-html="selectedValue?selectedValue:'A'"></span>
                        <img src="../../assets/icon/triangle_down.png" width="15">
                    </div>
                </div>
            </div>
        </div>
        <div class="tab2" v-show="selectTab == 2">
            <mt-field label="日期" placeholder="请选择日期" class="datePicker">
                <div>
                    <div class="timePicker" @click="openPicker(3)" v-html="date2"></div>
                </div>
            </mt-field>
            <mt-field class="mb" label="目标类型" placeholder="例：学习成长" v-model="targerClassify"></mt-field>
            <p class="subdivideTitle">目标内容</p>
            <mt-field class="subdivideVal" v-for="(item,key) in targetObj" :key="key" placeholder="输入内容" type="textarea" v-model="item.value"></mt-field>
            <div class="creatTarget">
                <div style="display:inline-block" @click="addTarget"><span>+</span>新建目标</div>
            </div>
        </div>
        <mt-button type="primary" class="submitBtn" @click="addWeekPlan">提交</mt-button>
        <mt-datetime-picker ref="picker2" v-model="pickerValue1" type="date"></mt-datetime-picker>
        <mt-datetime-picker ref="picker3" v-model="pickerValue2" type="date"></mt-datetime-picker>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" showToolbar @change="onValuesChange">
                <span class="confirm" @click="popupVisible = false">确认</span>
            </mt-picker>
        </mt-popup>
        <mt-popup v-model="popupVisible2" position="bottom">
            <mt-picker :slots="slots2" showToolbar @change="onValuesChange2">
                <span class="confirm" @click="popupVisible2 = false">确认</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    export default {
        name: 'weekTargetNew',
        data () {
            return {
                selectTab: 1,
                username: '',
                phone: '',
                date1: new Date(),
                date2: new Date(),
                pickerValue1: new Date(),
                pickerValue2: new Date(),
                slots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                slots2: [
                    {
                        flex: 1,
                        values: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                selectedValue: '',
                selectedValue2: '',
                targetContent: '',
                targerClassify: '',
                popupVisible: false,
                popupVisible2: false,
                sendData: {},
                dateOut: '',
                targetObj: [
                    {value: ''}
                ]
            }
        },
        mounted () {
            this.date1 = this.getDate(this.pickerValue1);
            this.date2 = this.getDate(this.pickerValue2);
            this.getPriority();
            setTimeout(() => {
                this.slots2[0].defaultIndex = 5;
            }, 20)
        },
        methods: {
            toggleTab (num) {
                this.selectTab = num;
            },
            openPicker (type) {
                switch (parseInt(type)) {
                    case 2:
                        this.$refs.picker2.open();
                        break;
                    case 3:
                        this.$refs.picker3.open();
                        break;
                }
            },
            addTarget () {
                this.targetObj.push({value: ''})
            },
            getDate (value) {
                // console.log(value)
                var date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                return date;
            },
            onValuesChange (picker, values) {
                this.selectedValue = values[0];
            },
            onValuesChange2 (picker, values) {
                this.selectedValue2 = values[0];
            },
            getPriority () {
                myFn.ajax('get', {}, apiAddress.plan.priority, (res) => {
                    this.slots[0].values = res.data;
                })
            },
            addWeekPlan () {
                if (parseInt(this.selectTab) === 1) {
                    this.sendData = {
                        type: this.selectTab,
                        week_start: this.date1,
                        prior_code: this.selectedValue,
                        content: this.targetContent,
                        dead_time: this.selectedValue2
                    }
                } else {
                    var arr = [];
                    for (var i = 0; i < this.targetObj.length; i++) {
                        arr.push(this.targetObj[i].value);
                    };
                    this.sendData = {
                        type: this.selectTab,
                        week_start: this.date2,
                        prior_code: this.selectedValue,
                        cate_name: this.targerClassify,
                        content_add: arr
                    }
                }
                myFn.ajax('post', this.sendData, apiAddress.plan.addWeekPlan, (res) => {
                    this.$router.back()
                })
            }
        },
        watch: {
            pickerValue1: function () {
                this.date1 = this.getDate(this.pickerValue1);
            },
            pickerValue2: function () {
                this.date2 = this.getDate(this.pickerValue2);
            }
        }
    }
</script>
<style>
    .weekTargetNew .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .weekTargetNew .mint-cell:last-child {
        background-size: 93% 1px;
    }
    .weekTargetNew .mint-field .mint-cell-title {
        color: #333;
    }
    .weekTargetNew input::-moz-placeholder {
        color: #bababa;
    }
    .weekTargetNew .subdivideVal .mint-cell-wrapper {
        background-position: bottom left;
    }
    .weekTargetNew .subdivideVal .mint-cell-title {
        display: none;
    }
    .weekTargetNew .mint-cell-wrapper {
        background-position: bottom left;
        height: 70px;
    }
    .weekTargetNew .mint-field .mint-field-core {
        text-align: left;
    }
    .weekTargetNew .mint-field.datePicker .mint-field-core {
        display: none;
    }
    .weekTargetNew .mint-popup-bottom {
        width: 100%;
    }
    .weekTargetNew .picker-toolbar {
        padding: 0 15px;
        text-align: right;
        border-bottom: 1px solid #ededed;
        line-height: 40px;
    }
    .weekTargetNew .mb input {
        padding-left: 0px;
        font-size: 15px;
        padding-right: 0;
    }
    .weekTargetNew .subdivideVal {
        margin-bottom: 10px;
    }
    .weekTargetNew .subdivideVal .mint-cell-wrapper,
    .weekTargetNew .tab2 > .mb  .mint-cell-wrapper {
        background: none;
    }
    .weekTargetNew .subdivideVal .mint-cell-wrapper {
        height: 130px;
        padding: 10px 15px;
    }
    .weekTargetNew .subdivideVal .mint-cell-wrapper .mint-cell-value,
    .weekTargetNew .subdivideVal .mint-cell-wrapper .mint-cell-value .mint-field-core {
        height: 100%;
    }
</style>
<style scoped>
    .weekTargetNew {
        background-color: #f7f7f7;
        font-size: 15px;
    }
    .navbar {
        text-align: center;
        font-size: 18px;
        background-color: #fff;
        padding: 15px 0 10px;
    }
    .navbar span {
        color: #333;
        margin: 0 15px;
        position: relative;
    }
    .navbar i {
        display: inline-block;
        height: 13px;
        width: 1px;
        background: #ccc; 
    }
    .navbar .active {
        color: #1b69fe;
    }
    .navbar .active::after {
        content: '';
        background: #1b69fe;
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -7px;
        left: 0;
    }
    .tab1, .tab2 {
        margin-top: 10px;
    }
    .tab2 {
        padding-bottom: 100px;
    }
    .tab1 .selected:last-child .form-control {
        border: 0;
    }
    .submitBtn {
        width: 85%;
        line-height: 42px;
        position: fixed;
        bottom: 0px;
        border-radius: 0;
        background: #1B69FE;
        left: 7.5%;
        bottom: 30px;
        border-radius: 4px;
    }
    .subdivideTitle {
        margin: 0 15px 10px;
        padding-top: 30px;
    }
    .creatTarget {
        color: #9cbf3f;
        margin: 0 15px 0px;
        padding-top: 30px;
    }
    .creatTarget span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-width: 1px;
        border-style: dashed;
        vertical-align: bottom;
        margin-right: 10px;
        line-height: 18px;
        font-size: 20px;
        text-align: center;
        border-radius: 3px;
    }
    .timePicker {
        display: inline-block;
    }
    .form-label {
        float: left;
        width: 114px;
        margin-top: 3px;
    }
    .form-control {
        width: 100%;
        font-size: 0;
        padding-left: 80px;
        box-sizing: border-box;
        font-size: 14px;
        border-bottom: 0.5px #d9d9d9 solid;
    }
    .selected {
        background: #fff;
        line-height: 70px;
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
        margin-top: 28px;
    }

</style>