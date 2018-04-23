
<template>
    <div class="workApplyReimbursement received">
        <p class="step"><span>当前审核步骤：</span><span v-html="setpValue"></span></p>
        <mt-field label="报销日期" class="reimbursementTime" style="margin-bottom: 0;">
            <p v-html="information.reimburse_time"></p>
        </mt-field>
        <mt-field label="报销金额" >
            <p v-html="information.money"></p>
        </mt-field>
        <p class="title">原因用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.reason" disabled></textarea>
        </div>

        <!-- <upload-img-add :list="information.image" readonly></upload-img-add> -->
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
        name: 'workApplyReimbursement',
        data () {
            return {
                id: '',
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
                    this.information.image = res.data.image;
                    this.setpValue = res.data.list[0].name || '';
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
<style>
    .workApplyReimbursement .from-textarea .from-textarea-val {
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

