
<template>
    <div class="receivedApplyLeave received">
        <p class="step"><span>当前审核步骤：</span><span v-html="setpValue"></span></p>
        <mt-field label="类型" class="selectInput selectInputRight">
            <select v-model="information.type" disabled>
                <option value="0">< 请选择类型</option>
                <option v-for="(item, key) in vacationType" :value="key">{{item}}</option>
            </select>
        </mt-field>

        <mt-field label="开始日期" class="startTime">
            <p v-html="information.start_time"></p>
        </mt-field>

        <mt-field label="结束日期" class="endTime">
            <p v-html="information.end_time"></p>
        </mt-field>
        <mt-field label="天数" class="day">
            <p v-html="information.days"></p>
        </mt-field>
        <p class="title">请假事由</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.reason" disabled></textarea>
        </div>

        <mt-field label="紧急联系人" class="urgentName">
            <p v-html="information.urgency_name"></p>
        </mt-field>
        <mt-field label="联系人电话" type="text" class="urgentPhone">
            <p v-html="information.urgency_mobile"></p>
        </mt-field>
        
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
        name: 'receivedApplyLeave',
        data () {
            return {
                id: '',
                information: {},
                vacationType: [],
                opinion1: '',
                opinion2: '',
                opinion3: '',
                setpValue: ''
            }
        },
        mounted () {
            this.vacationType = JSON.parse(localStorage.vacationType);
            this.id = this.$route.params.id;
            this.get_details();
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.id}, apiAddress.center.applyDetails, (res) => {
                    this.information = res.data;
                    this.setpValue = res.data.list[0].name || '';
                });
            }
        },
        components: {
            receivedApplyButton
        }
    };
</script>
<style>
    .receivedApplyLeave .name .mint-cell-wrapper,
    .receivedApplyLeave .startTime .mint-cell-wrapper,
    .receivedApplyLeave .endTime .mint-cell-wrapper,
    .receivedApplyLeave .urgentName .mint-cell-wrapper{
        border-bottom: none;
        margin-bottom: 0;
    }
    .receivedApplyLeave .type .mint-cell-wrapper,
    .receivedApplyLeave .day .mint-cell-wrapper,
    .receivedApplyLeave .endTime .mint-cell-wrapper,
    .receivedApplyLeave .urgentPhone .mint-cell-wrapper{
        border-top: none;
        /* background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%); */
        margin-top: 0;
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

