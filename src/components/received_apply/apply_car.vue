
<template>
    <div class="receivedApplyCar received">
        <mt-field label="类型" placeholder="请输入用车类型 例：宝马 X5" type="text" v-model="information.type" disabled></mt-field>

        <mt-field label="开始日期" class="startTime">
            <p v-html="information.start_time"></p>
        </mt-field>

        <mt-field label="结束日期" class="endTime">
            <p v-html="information.end_time"></p>
        </mt-field>

        <mt-field label="天数" placeholder="输入天数" type="text" v-model="information.days" class="day" disabled></mt-field>
        
        <mt-field label="起步地点" placeholder="请输入起步地点" class="startAddress" disabled>
            <p v-html="information.start_location"></p>
        </mt-field>
        <mt-field label="到达地点" placeholder="请输入到达地点" type="text" v-model="information.end_location" class="endAddress" disabled></mt-field>
        <mt-field label="往返里程（KM）" placeholder="请输入往返里程" type="text" v-model="information.round_trips" class="returnAddress" disabled></mt-field>
        
        <p class="title">用车用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.reason" disabled></textarea>
        </div>
        
        <p class="title">随同人员(个数或具体姓名)</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" placeholder="请输入相关人员姓名" v-model="information.fellow_member" disabled></textarea>
        </div>
        
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
        name: 'receivedApplyCar',
        data () {
            return {
                information: {},
                emit: {
                    id: '',
                    content: ''
                },
                type: ''
            }
        },
        mounted () {
            this.emit.id = this.$route.params.id;
            this.type = this.$route.params.type;
            // console.log(this.emit.id)
            this.get_details();
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.emit.id}, apiAddress.receivedApply.details, (res) => {
                    this.information = res.data;
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

