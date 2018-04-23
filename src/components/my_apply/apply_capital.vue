<template>
    <div class="receivedApplyCapital received">
        <p class="step"><span>当前审核步骤：</span><span v-html="setpValue"></span></p>
        <mt-field label="申请金额" placeholder="请输入金额" type="text" disabled>
            <p v-html="applynumber"></p>
        </mt-field>
        <mt-field label="预算余额" placeholder="请输入预算余额" type="text" disabled>
            <p v-html="budget_balance"></p>
        </mt-field>
        <p class="title">申请原因</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="reason" disabled></textarea>
        </div>

        <!-- <upload-img-add :list="listImg" disabled></upload-img-add> -->
        <p class="title"><span>图片说明：</span></p>
        <div class="img-box" style="margin-top: 10px;border: 0;">
            <img v-for="item in information.image" :src="item">
        </div>
        
        <!-- <received-apply-button :id="id"></received-apply-button> -->
    </div>
</template>

<script>
    import uploadImgAdd from '../tools/uploadImg_add'
    import receivedApplyButton from '../tools/receivedApply_button'

    export default {
        name: 'receivedApplyCapital',
        data () {
            return {
                id: '',
                applynumber: '',
                budget_balance: '',
                reason: '',
                listImg: [],
                information: {},
                setpValue: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.get_details();
        },
        methods: {
            get_details () {
                myFn.ajax('get', {id: this.id}, apiAddress.center.applyDetails, (res) => {
                    this.information = res.data;
                    this.setpValue = res.data.list[0].name || '';
                    this.applynumber = res.data.money;
                    this.budget_balance = res.data.budget_balance;
                    this.reason = res.data.reason;
                    this.listImg = res.data.image;
                })
            }
        },
        components: {
            uploadImgAdd,
            receivedApplyButton
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .receivedApplyCapital .from-textarea .from-textarea-val {
        border-bottom: 0;
    }
</style>
<style scoped>
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
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
