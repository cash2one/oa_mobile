
<template>
    <div class="receivedApplyCar received">
        <p class="step"><span>当前审核步骤：</span><span v-html="setpValue"></span></p>
        <mt-field label="类型" placeholder="请输入用车类型 例：宝马 X5" type="text" disabled>
            <p v-html="information.type"></p>
        </mt-field>

        <mt-field label="开始日期" class="startTime">
            <p v-html="information.start_time"></p>
        </mt-field>

        <mt-field label="结束日期" class="endTime">
            <p v-html="information.end_time"></p>
        </mt-field>

        <!-- <mt-field label="天数" placeholder="输入天数" type="text" lass="day" style="margin-top: 0;" disabled>
            <p v-html="information.days"></p>
        </mt-field> -->
        <p class="title">用车用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.reason" disabled></textarea>
        </div>

        <mt-field label="起步地点" placeholder="请输入起步地点" type="text" class="startAddress" disabled>
            <p v-html="information.start_location"></p>
        </mt-field>
        <mt-field label="到达地点" placeholder="请输入到达地点" type="text" class="endAddress" disabled>
            <p v-html="information.end_location"></p>
        </mt-field>
        <mt-field label="往返里程（KM）" placeholder="请输入往返里程" type="text" class="returnAddress" disabled>
            <p v-html="information.round_trips"></p>
        </mt-field>
        
        <div class="from-textarea">
            <p class="from-textarea-title">随同人员(个数或具体姓名)</p>
            <textarea class="from-textarea-val" rows="7" placeholder="请输入相关人员姓名" v-model="information.fellow_member" disabled></textarea>
        </div>
        
        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in information.list">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" :placeholder="item.content?'':'无'" v-model="item.content" disabled></textarea>
        </div>

        <!-- <received-apply-button :id="id"></received-apply-button> -->
    </div>
</template>

<script>
    import receivedApplyButton from '../tools/receivedApply_button'

    export default {
        name: 'receivedApplyCar',
        data () {
            return {
                id: '',
                information: {},
                opinion1: '',
                opinion2: '',
                opinion3: '',
                applyType: {},
                setpValue: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.get_details();
            this.applyType = JSON.parse(localStorage.applyType);
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.id}, apiAddress.center.applyDetails, (res) => {
                    this.information = res.data;
                    this.setpValue = res.data.list[0].name || '';
                    console.log(this.information)
                });
            }
        },
        components: {
            receivedApplyButton
        }
    };
</script>
<style>
    .receivedApplyCar .day .mint-cell-wrapper,
    .receivedApplyCar .endTime .mint-cell-wrapper,
    .receivedApplyCar .returnAddress .mint-cell-wrapper,
    .receivedApplyCar .endAddress .mint-cell-wrapper{
        border-top: none;
        /* background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%); */
        margin-top: 0;
    }
    .receivedApplyCar .startTime .mint-cell-wrapper,
    .receivedApplyCar .endTime .mint-cell-wrapper,
    .receivedApplyCar .startAddress .mint-cell-wrapper,
    .receivedApplyCar .endAddress .mint-cell-wrapper{
        border-bottom: none;
        margin-bottom: 0;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        width: 125px;
        height: 36px;
        color: #fff;
        font-size: 15px;
        background: #1B69FE;
    }
    .button-Group {
        margin-top: 40px;
    }
    .step {
        box-sizing: border-box;
        padding: 15px 15px 5px;
        font-size: 15px;
    }
    .step span:first-child {
        margin-right: 7px;
        display: inline-block;
    }
</style>

