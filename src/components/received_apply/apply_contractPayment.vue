
<template>
    <div class="receivedApplyContractPayment received">
        <mt-field label="付款日期" class="contract" >
            <p v-html="information.pay_time"></p>
        </mt-field>
        <mt-field label="付款金额" class="contract">
            <p v-html="information.money"></p>
        </mt-field>
        <mt-field label="收款方">
            <p v-html="information.receive_name"></p>
        </mt-field>

        <p class="title">原因用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.reason" disabled></textarea>
        </div>
        
        <p class="title">申请图片</p>
        <div class="img-box">
            <img v-for="item in information.image" :src="item">
        </div>

        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in information.list">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" :placeholder="item.content?'':'无'" v-model="item.content" disabled></textarea>
        </div>
        <div class="from-textarea" v-if="type == 1">
            <textarea class="from-textarea-val" rows="7" placeholder="请在此填写您的审核意见" v-model="emit.content"></textarea>
        </div>
        
        <!-- <upload-img-add :list="listImg"  class="upload-img" disabled></upload-img-add> -->

        <received-apply-button :id="emit" v-if="type == 1"></received-apply-button>
    </div>
</template>

<script>
    import uploadImgAdd from '../tools/uploadImg_add'
    import receivedApplyButton from '../tools/receivedApply_button'

    export default {
        name: 'receivedApplyContractPayment',
        data () {
            return {
                information: {},
                listImg: [],
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
            this.get_details();
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.emit.id}, apiAddress.receivedApply.details, (res) => {
                    this.information = res.data;
                    this.listImg = res.data.image;
                });
            }
        },
        components: {
            uploadImgAdd,
            receivedApplyButton
        }
    };
</script>
<style>
   /* .receivedApplyContractPayment input {
        display: 
    }*/
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
    
    .img-box {
        padding: 20px 15px;
        background: #fff;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
    }
    .img-box img {
        width: 76px;
        height: 76px;
        margin-right: 15px;
        margin-bottom: 12px;
        vertical-align: top;
    }
</style>

