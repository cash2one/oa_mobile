
<template>
    <div class="receivedApplyLeave received">
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
        
        <p class="title">紧急联系人</p>
        <mt-field label="姓名" class="urgentName">
            <p v-html="information.urgency_name"></p>
        </mt-field>
        <mt-field label="电话" type="text" class="urgentPhone">
            <p v-html="information.urgency_mobile"></p>
        </mt-field>

        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in information.list">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" :placeholder="item.content?'':'无'" v-model="item.content" disabled></textarea>
        </div>
        <div class="from-textarea" v-if="type == 1">
            <textarea class="from-textarea-val" rows="7" placeholder="请在此填写您的审核意见" v-model="emit.content"></textarea>
        </div>

        <received-apply-button :id="emit" v-if="type == 1"></received-apply-button>

    </div>
</template>

<script>
    import receivedApplyButton from '../tools/receivedApply_button'

    export default {
        name: 'receivedApplyLeave',
        data () {
            return {
                information: {},
                vacationType: [],
                emit: {
                    id: '',
                    content: ''
                },
                type: ''
            }
        },
        mounted () {
            this.vacationType = JSON.parse(localStorage.vacationType);
            this.emit.id = this.$route.params.id;
            this.type = this.$route.params.type;
            console.log(this.emit.id)
            this.get_details();
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.emit.id}, apiAddress.receivedApply.details, (res) => {
                    this.information = res.data;
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
        margin-top: 0;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .from-textarea .from-textarea-val {
        -webkit-appearance: none;
        color: #000;
    }
    .received {
        margin-bottom: 41px;
    }
    .title {
        margin: 20px 15px 15px;
    }
    .upload-img {
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
    }
    .button-Group {
        margin-top: 40px;
    }
    .mint-field-other select, .mint-field-other p {
        text-align: left;
        direction: ltr!important;
    }
    .from-textarea-val {
        background-color: #fff;
        -webkit-appearance: none;
    }
</style>

