
<template>
    <div class="workApplyCar workApply">
        <!-- <p class="title">类型</p> -->
        <mt-field label="类型" placeholder="请输入用车类型 例：宝马 X5" type="text" v-model="carType" ></mt-field>
        <mt-field label="开始日期" class="startTime" v-model="startTime" type="date"></mt-field>
        <mt-field label="结束日期" class="endTime" v-model="endTime" type="date"></mt-field>
        <mt-field label="起步地点" placeholder="请输入起步地点" type="text" v-model="startAddress" class="startAddress"></mt-field>
        <mt-field label="到达地点" placeholder="请输入到达地点" type="text" v-model="endAddress" class="endAddress"></mt-field>
        <mt-field label="往返里程(KM)" placeholder="请输入往返里程" type="number" v-model="returnAddress" class="returnAddress"></mt-field>
        <p class="title">用车用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="purpose" placeholder="请输入用车用途"></textarea>
        </div>
        <p class="title">随同人员(个数或具体姓名)</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="entourage" placeholder="请输入随同人员"></textarea>
        </div>
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
                startTime: '',
                endTime: '',
                day: '',
                purpose: '',
                startAddress: '',
                endAddress: '',
                returnAddress: '',
                entourage: '',
                opinion1: '',
                opinion2: '',
                opinion3: '',
                examineList: []
            }
        },
        mounted () {
            this.startTime = myFn.getToday();
            this.endTime = myFn.getToday();
        },
        methods: {
            submit () {
                var data = {
                    type: this.carType,
                    aid: this.examineList,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    // days: this.day,
                    reason: this.purpose,
                    start_location: this.startAddress,
                    end_location: this.endAddress,
                    round_trips: this.returnAddress,
                    fellow_member: this.entourage
                }
                myFn.ajax('post', data, apiAddress.apply.userCar, (res) => {
                    this.$router.push({name: 'centerMyApply'});
                });
                console.log(data);
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
        background: none;
        margin-top: 0;
        font-size: 15px;
    }
    .workApplyCar .startTime .mint-cell-wrapper,
    .workApplyCar .endTime .mint-cell-wrapper,
    .workApplyCar .startAddress .mint-cell-wrapper,
    .workApplyCar .endAddress .mint-cell-wrapper{
        border-bottom: none;
        margin-bottom: 0;
        font-size: 15px;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .workApplyCar {
        padding: 0;
    }
    .from-textarea .from-textarea-val {
        resize: none;
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

