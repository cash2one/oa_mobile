
<template>
    <div class="receivedApplyReceivables received">
        <mt-field label="付款人"  type="text">
            <p v-html="information.payer"></p>
        </mt-field>
        <mt-field label="付款方式" class="selectInput selectInputRight" >
            <select v-model="information.pay_method" disabled>
                <option value="0">< 请输入付款方式</option>
                <option v-for="(item, key) in typeList" :value="key">{{item}}</option>
            </select>
        </mt-field>
        <mt-field label="付款金额">
            <p v-html="information.money"></p>
        </mt-field>
        <mt-field label="收款方"></mt-field>
            <p v-html="information.receive_name"></p>
        <mt-field label="收款日期" class="proceedsTime">
            <p v-html="information.collection_time"></p>
        </mt-field>
        
        <p class="title">申请说明</p>
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
        <!-- <upload-img-add :list="listImg" class="upload-img"></upload-img-add> -->

        <received-apply-button :id="emit" v-if="type == 1"></received-apply-button>

    </div>
</template>

<script>
    import uploadImgAdd from '../tools/uploadImg_add'
    import receivedApplyButton from '../tools/receivedApply_button'

    export default {
        name: 'receivedApplyReceivables',
        data () {
            return {
                id: '',
                information: {},
                listImg: [],
                typeList: [],
                userInfo: {},
                emit: {
                    id: '',
                    content: ''
                },
                type: ''
            }
        },
        mounted () {
            this.typeList = JSON.parse(localStorage.receivablesType);
            this.userInfo = JSON.parse(localStorage.userInfo);
            this.emit.id = this.$route.params.id;
            this.type = this.$route.params.type;
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
            receivedApplyButton,
            uploadImgAdd
        }
    };
</script>

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
