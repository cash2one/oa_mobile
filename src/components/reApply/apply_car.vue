
<template>
    <div class="workApplyCar workApply">
        <mt-field label="类型" placeholder="请输入用车类型 例：宝马 X5" type="text" v-model="carType" ></mt-field>

        <mt-field label="开始日期" class="startTime" style="margin-bottom: 0;">
            <p @click="openPicker('startTime')" v-html="startTime[0]"></p>
        </mt-field>

        <mt-field label="结束日期" class="endTime" style="margin: 0;">
            <p @click="openPicker('endTime')" v-html="endTime[0]"></p>
        </mt-field>

        <!-- <mt-field label="天数" placeholder="输入天数" type="number" v-model="day" class="day" style="margin-top: 0;"></mt-field> -->

        <div class="from-textarea">
            <p class="from-textarea-title">用车用途</p>
            <textarea class="from-textarea-val" rows="7" v-model="purpose"></textarea>
        </div>

        <mt-field label="起步地点" placeholder="请输入起步地点" type="text" v-model="startAddress" class="startAddress" style="margin-bottom: 0;"></mt-field>
        <mt-field label="到达地点" placeholder="请输入到达地点" type="text" v-model="endAddress" class="endAddress" style="margin: 0;"></mt-field>
        <mt-field label="往返里程（KM）" placeholder="请输入往返里程" type="number" v-model="returnAddress" class="returnAddress" style="margin-top: 0;"></mt-field>
        
        <div class="from-textarea">
            <p class="from-textarea-title">随同人员(个数或具体姓名)</p>
            <textarea class="from-textarea-val" rows="7" placeholder="请输入相关人员姓名" v-model="entourage"></textarea>
        </div>
        
        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in opinion">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" v-model="item.content" disabled></textarea>
        </div>

        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_Time"></mt-datetime-picker>

        <auditor-add :list="examineList"></auditor-add>

        <div class="button-Group">
            <mt-button class="submit" size="large" type="primary" @click="submit">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import auditorAdd from '../tools/auditor_add'

    export default {
        name: 'workApplyCar',
        data () {
            return {
                carType: '',
                startTime: ['请输入开始时间 >'],
                endTime: ['请输入开始时间 >'],
                day: '',
                purpose: '',
                startAddress: '',
                endAddress: '',
                returnAddress: '',
                entourage: '',
                opinion: [],
                examineList: [1],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: '',
                receivedID: ''
            }
        },
        mounted () {
            if (this.$route.params.id) {
                this.receivedID = this.$route.params.id;
            };
            this.getDetails();
        },
        methods: {
            submit () {
                var data = {
                    type: this.carType,
                    aid: this.examineList,
                    start_time: this.startTime[1],
                    end_time: this.endTime[1],
                    // days: this.day,
                    reason: this.purpose,
                    start_location: this.startAddress,
                    end_location: this.endAddress,
                    round_trips: this.returnAddress,
                    fellow_member: this.entourage
                }
                myFn.ajax('post', data, apiAddress.apply.userCar, (res) => {
                    this.$router.back(-1);
                });
                console.log(data);
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.carType = res.data.car_type;
                    this.day = res.data.days;
                    this.purpose = res.data.reason;
                    this.startAddress = res.data.start_location;
                    this.endAddress = res.data.end_location;
                    this.returnAddress = res.data.round_trips;
                    this.entourage = res.data.fellow_member;
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
    .workApplyCar .day .mint-cell-wrapper,
    .workApplyCar .endTime .mint-cell-wrapper,
    .workApplyCar .returnAddress .mint-cell-wrapper,
    .workApplyCar .endAddress .mint-cell-wrapper{
        border-top: none;
        /* background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%); */
        margin-top: 0;
    }
    .workApplyCar .startTime .mint-cell-wrapper,
    .workApplyCar .endTime .mint-cell-wrapper,
    .workApplyCar .startAddress .mint-cell-wrapper,
    .workApplyCar .endAddress .mint-cell-wrapper{
        border-bottom: none;
        margin-bottom: 0;
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

