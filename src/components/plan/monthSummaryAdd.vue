<template>
    <div class="weekSummaryAdd">
        <!-- <div class="date-wrapper">
            <div>
                <div style="display:inline-block" @click="openPicker">
                    <span v-html="date"></span>
                    <img src="../../assets/icon/pull_down.png" width="15">
                </div>
            </div>
            <div class="date-title">月工作目标</div>
        </div> -->
        <div class="weekSummary-content">
            <div>
                <div class="label">目标完成情况</div>
                <textarea cols="30" rows="5" placeholder="请输入目标完成情况" v-model="value1"></textarea>
            </div>
            <div>
                <div class="label">未完成目标的原因与障碍</div>
                <textarea cols="30" rows="5" placeholder="请输入未完成目标原因与障碍" v-model="value2"></textarea>
            </div>
            <div>
                <div class="label">克服障碍的对策和方法</div>
                <textarea cols="30" rows="5" placeholder="请输入障碍的对策和方法" v-model="value3"></textarea>
            </div>
            <div>
                <div class="label">本周创新与收获</div>
                <textarea cols="30" rows="5" placeholder="请输入本周收获" v-model="value4"></textarea>
            </div>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerValue1" type="date"></mt-datetime-picker>
        <button class="my-btn" @click="submit"><img src="../../assets/icon/confirm.png" width="30"></button>
    </div>
</template>

<script>
    export default {
        name: 'weekSummaryAdd',
        data () {
            return {
                date: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                pickerValue1: new Date(),
                type: '',
                id: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.type = this.$route.params.type;
            this.date = this.getDate(this.pickerValue1);
            if (parseInt(this.type) === 2) {
                this.getSummary();
            }
        },
        methods: {
            getDate (value) {
                var date = value.getFullYear() + '-' + (value.getMonth() + 1);
                return date;
            },
            openPicker (type) {
                this.$refs.picker.open();
            },
            getSummary () {
                var data = {
                    type: 2,
                    month: this.date
                }
                myFn.ajax('get', data, apiAddress.plan.weekSummaryDetails, (res) => {
                    this.value1 = res.data.finish_description;
                    this.value2 = res.data.finish_difficult;
                    this.value3 = res.data.overcome;
                    this.value4 = res.data.harvest;
                })
            },
            submit () {
                var data = {
                    type: 2,
                    month: this.date,
                    finish_description: this.value1,
                    finish_difficult: this.value2,
                    overcome: this.value3,
                    harvest: this.value4
                }
                if (parseInt(this.type) === 2) {
                    data.id = this.id;
                    myFn.ajax('post', data, apiAddress.plan.editSummary, (res) => {
                        this.$router.back(-1);
                    })
                } else {
                    myFn.ajax('post', data, apiAddress.plan.weekSummaryAdd, (res) => {
                        this.$router.back(-1);
                    })
                }
            }
        },
        watch: {
            pickerValue1: function () {
                this.date = this.getDate(this.pickerValue1);
            }
        }
    }
</script>

<style scoped>
    .weekSummaryAdd {
        margin-bottom: 42px;
    }
    .date-wrapper {
        background: #fff;
        padding-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
        text-align: center;
        color: #999;
    }
    .date-wrapper > div span,
    .date-wrapper > div img {
        vertical-align: middle;
    }
    .date-wrapper > div img {
        margin-left: 10px;
    }
    .date-title {
        font-size: 12px;
        margin: 10px 0;
    }
    .weekSummary-content {
        background: #fff;
        padding: 0 15px;
        margin-top: 5px;
    }
    .weekSummary-content > div {
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
    }
    .weekSummary-content > div:last-child {
        border-bottom-width: 0;
    }
    .weekSummary-content > div textarea {
        width: 100%;
        resize: none;
        color: #666;
        font-size: 14px;
        border: 0;
    }
    .weekSummary-content > div .label {
        padding-top: 20px;
        padding-bottom: 10px;
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
        color:  #999;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color: #999;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color: #999;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #999;
    }
</style>