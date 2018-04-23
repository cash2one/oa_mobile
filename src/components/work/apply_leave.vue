
<template>
    <div class="workApplyLeave workApply">
        <!-- <p class="title">类型</p> -->
        <mt-field label="类型" class="selectInput" >
            <select v-model="type">
                <option v-for="(item, key) in vacationType" :value="key">{{item}}</option>
            </select>
        </mt-field>
        <mt-field label="开始日期" class="startTime" type="date" v-model="startTime"></mt-field>
        <mt-field label="结束日期" class="endTime" type="date" v-model="endTime"></mt-field>
        <mt-field label="天数" placeholder="输入天数" type="number" v-model="day" class="day"></mt-field>
        <p class="title">请假事由</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="reason" placeholder="请输入事由"></textarea>
        </div>
        <mt-field label="紧急联系人姓名" placeholder="请输入紧急联系人姓名" type="text" v-model="urgentName" class="urgentName"></mt-field>
        <mt-field label="紧急联系人电话" placeholder="请输入紧急联系人电话" type="number" v-model="urgentPhone" class="urgentPhone"></mt-field>
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
                type: 1,
                startTime: '',
                endTime: '',
                day: '',
                reason: '',
                urgentName: '',
                urgentPhone: '',
                opinion1: '',
                opinion2: '',
                opinion3: '',
                // 类型列表
                vacationType: [],
                // 审核人列表
                examineList: []
            }
        },
        mounted () {
            this.vacationType = JSON.parse(localStorage.vacationType);
            this.startTime = myFn.getToday();
            this.endTime = myFn.getToday();
        },
        methods: {
            submit () {
                var data = {
                    type: this.type,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    days: this.day,
                    reason: this.reason,
                    urgency_name: this.urgentName,
                    urgency_mobile: this.urgentPhone,
                    aid: this.examineList
                }
                myFn.ajax('post', data, apiAddress.apply.leave, (res) => {
                    this.$router.push({name: 'centerMyApply'});
                });
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
    .workApplyLeave .urgentName .mint-cell-wrapper {
        border-bottom: none;
        margin-bottom: 0;
        font-size: 15px;
    }
    .workApplyLeave .type .mint-cell-wrapper,
    .workApplyLeave .day .mint-cell-wrapper,
    .workApplyLeave .endTime .mint-cell-wrapper,
    .workApplyLeave .urgentPhone .mint-cell-wrapper {
        border-top: none;
        background: none;
        margin-top: 0;
        font-size: 15px;
    }
    .workApplyLeave .mint-cell-wrapper,
    .workApplyLeave .selectInput select {
        font-size: 15px;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .from-textarea .from-textarea-val {
        resize: none;
    }
    .workApplyLeave {
        /* padding: 0 15px; */
    }
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    .upload-img {
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
    }
    .submit {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
    }
    .button-Group {
        margin-top: 40px;
    }
</style>

