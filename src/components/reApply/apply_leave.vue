
<template>
    <div class="workApplyLeave workApply">
        <mt-field label="类型" class="selectInput selectInputRight"  v-model="type">
            <select v-model="type">
                <option value="0">< 请选择类型</option>
                <option v-for="(item, key) in vacationType" :value="key">{{item}}</option>
            </select>
        </mt-field>

        <mt-field label="开始日期" class="startTime" style="margin-bottom: 0;">
            <p @click="openPicker('startTime')" v-html="startTime[0]"></p>
        </mt-field>

        <mt-field label="结束日期" class="endTime" style="margin: 0;">
            <p @click="openPicker('endTime')" v-html="endTime[0]"></p>
        </mt-field>
        <mt-field label="天数" placeholder="输入天数" type="number" v-model="day" class="day" style="margin-top: 0;"></mt-field>
        
        <div class="from-textarea">
            <p class="from-textarea-title">事由</p>
            <textarea class="from-textarea-val" rows="7" v-model="reason"></textarea>
        </div>

        <mt-field label="紧急联系人" placeholder="请输入紧急联系人姓名" type="text" v-model="urgentName" class="urgentName" style="margin-bottom: 0;"></mt-field>
        <mt-field label="紧急联系人电话" placeholder="联系人电话" type="number" v-model="urgentPhone" class="urgentPhone" style="margin-top: 0;"></mt-field>
        
        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in opinion">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" v-model="item.content" disabled></textarea>
        </div>

        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_Time"></mt-datetime-picker>

        <auditor-add :list="examineList"></auditor-add>

        <div class="button-Group">
            <mt-button class=" submit" size="large" type="primary" @click="submit">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import auditorAdd from '../tools/auditor_add'

    export default {
        name: 'workApplyLeave',
        data () {
            return {
                type: 0,
                startTime: ['请输入开始时间 >'],
                endTime: ['请输入开始时间 >'],
                day: '',
                reason: '',
                urgentName: '',
                urgentPhone: '',
                opinion: [],
                // 类型列表
                vacationType: [],
                // 审核人列表
                examineList: [],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: '',
                receivedID: ''
            }
        },
        mounted () {
            this.vacationType = JSON.parse(localStorage.vacationType);
            if (this.$route.params.id) {
                this.receivedID = this.$route.params.id;
            };
            this.getDetails();
        },
        methods: {
            submit () {
                var data = {
                    type: this.type,
                    start_time: this.startTime[1],
                    end_time: this.endTime[1],
                    days: this.day,
                    reason: this.reason,
                    urgency_name: this.urgentName,
                    urgency_mobile: this.urgentPhone,
                    aid: this.examineList
                }
                myFn.ajax('post', data, apiAddress.apply.leave, (res) => {
                    this.$router.back(-1);
                });
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.type = res.data.type;
                    this.day = res.data.days;
                    this.reason = res.data.reason;
                    this.urgentName = res.data.urgency_name;
                    this.urgentPhone = res.data.urgency_mobile;
                    this.opinion = res.data.list;
                    this.startTime[1] = res.data.start_time;
                    this.endTime[1] = res.data.end_time;
                    this.startTime[0] = res.data.start_time;
                    this.endTime[0] = res.data.end_time;
                })
            },
            openPicker (key) {
                this.thisTimeSelect = key;
                this.$refs.picker.open();
            },
            set_Time (date) {
                this[this.thisTimeSelect] = myFn.getTime(date);
            }
        },
        components: {
            auditorAdd
        }
    };
</script>
<style>
    .workApplyLeave .name .mint-cell-wrapper,
    .workApplyLeave .startTime .mint-cell-wrapper,
    .workApplyLeave .endTime .mint-cell-wrapper,
    .workApplyLeave .urgentName .mint-cell-wrapper{
        border-bottom: none;
        margin-bottom: 0;
    }
    .workApplyLeave .type .mint-cell-wrapper,
    .workApplyLeave .day .mint-cell-wrapper,
    .workApplyLeave .endTime .mint-cell-wrapper,
    .workApplyLeave .urgentPhone .mint-cell-wrapper{
        border-top: none;
        /* background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%); */
        margin-top: 0;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title {
        margin: 25px 15px 15px;
    }
    .upload-img {
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
    }
    .submit {
        width: 125px;
        height: 36px;
        color: #fff;
        font-size: 15px;
        background: #1B69FE;
    }
    .button-Group {
        margin-top: 40px;
    }
</style>

