<template>
    <div class="monthTarget_create">
        <div class="navbar">
            <span :class="{'active': selectTab==1}" @click="toggleTab(1)">工作目标</span>
            <i class="line"></i>
            <span :class="{'active': selectTab==2}" @click="toggleTab(2)">其他目标</span>
        </div>
        <div class="tab1" v-show="selectTab == 1">
            <mt-field label="日期" placeholder="例如:2017-01-01" class="datePicker">
                <div>
                    <div class="timePicker" @click="openPicker(2)" v-html="date1"></div>
                </div>
            </mt-field>
            <mt-field label="目标" placeholder="请输入目标" type="text" v-model="content1"></mt-field>
            <p class="subdivideTitle">方法和措施</p>
            <mt-field class="subdivideVal" label="细分目标" placeholder="请输入方法和措施" v-model="methods"></mt-field>
        </div>
        <div class="tab2" v-show="selectTab == 2">
            <mt-field label="日期" placeholder="例如:2017-01-01" class="datePicker">
                <div>
                    <div class="timePicker" @click="openPicker(3)" v-html="date2"></div>
                </div>
            </mt-field>
            <mt-field label="目标类型" placeholder="请输入目标" type="text" v-model="cate_name"></mt-field>
            <p class="subdivideTitle">目标细分</p>
            <mt-field class="subdivideVal" v-for="(item,key) in targetObj" :key="key" placeholder="输入内容" v-model="item.value"></mt-field>
            <div class="creatTarget">
                <div style="display:inline-block" @click="addTarget"><span>+</span>新建目标</div>
            </div>
            <!-- <div class="creatTarget">
                <span>+</span>新建目标
            </div> -->
        </div>
        <mt-button type="primary" class="submitBtn" @click="submit">
            <img slot="icon" src="../../assets/icon/confirm.png" style="width: 30px;" />
        </mt-button>
        <mt-datetime-picker ref="picker2" v-model="pickerValue1" type="date"></mt-datetime-picker>
        <mt-datetime-picker ref="picker3" v-model="pickerValue2" type="date"></mt-datetime-picker>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" showToolbar @change="onValuesChange">
                <span class="confirm" @click="popupVisible = false">确认</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    export default {
        name: 'monthTarget_create',
        data () {
            return {
                selectTab: 1,
                username: '',
                phone: '',
                date1: '',
                date2: '',
                content1: '',
                content2: '',
                methods: '',
                cate_name: '',
                pickerValue1: new Date(),
                pickerValue2: new Date(),
                slots: [
                    {
                        flex: 1,
                        values: ['A', 'B', 'C', 'D', 'E', 'F'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                popupVisible: false,
                targetObj: [
                    {value: ''}
                ]
            }
        },
        mounted () {
            this.date1 = this.getDate(this.pickerValue1);
            this.date2 = this.getDate(this.pickerValue2);
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
                console.log(value)
                var date = value.getFullYear() + '-' + (value.getMonth() + 1);
                return date;
            },
            onValuesChange () {},
            submit () {
                var data = {};
                switch (parseInt(this.selectTab)) {
                    case 1:
                        data.month_start = this.date1;
                        data.type = 1;
                        data.content = this.content1;
                        data.method = this.methods;
                        break;
                    case 2:
                        var arr = [];
                        for (var i = 0; i < this.targetObj.length; i++) {
                            arr.push(this.targetObj[i].value);
                        };
                        data.month_start = this.date2;
                        data.type = 2;
                        data.cate_name = this.cate_name;
                        data.content_add = arr;
                }
                myFn.ajax('post', data, apiAddress.plan.monthPlanAdd, (res) => {
                    this.$router.back(-1);
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
    .monthTarget_create .mint-field .mint-cell-title {
        color: #333;
    }
    .monthTarget_create input::-moz-placeholder {
        color: #bababa;
    }
    .monthTarget_create .subdivideVal .mint-cell-wrapper {
        background-position: bottom left;
    }
    .monthTarget_create .mint-cell:last-child {
        background-size: 93% 1px;
    }
    .monthTarget_create .subdivideVal .mint-cell-title {
        display: none;
    }
    .monthTarget_create .mint-cell:first-child .mint-cell-wrapper {
        background: none;
    }
    .monthTarget_create .mint-field .mint-field-core {
        text-align: left;
    }
    .monthTarget_create .mint-field.datePicker .mint-field-core {
        display: none;
    }
    .monthTarget_create .picker-items .picker-slot:nth-child(3) {
        display: none;
    }
    .monthTarget_create .mint-cell-wrapper {
        height: 70px
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
    .navbar {
        text-align: center;
        font-size: 21px;
        margin-top: 55px;
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
        background: #a2c2ff;
        width: 60px;
        height: 1px;
        position: absolute;
        bottom: -7px;
        left: 14px;
    }
    .tab1, .tab2 {
        margin-top: 60px;
    }
    .tab2 {
        padding-bottom: 70px;
    }
    .submitBtn {
        width: 100%;
        position: absolute;
        bottom: 0px;
        border-radius: 0;
        background: #1B69FE;
    }
    .subdivideTitle {
        margin: 0 15px 0px;
        border-top: 1px #d9d9d9 solid;
        padding-top: 30px;
    }
    .creatTarget {
        color: #9cbf3f;
        margin: 0 15px 0px;
        /* border-top: 1px #ececec solid; */
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
</style>