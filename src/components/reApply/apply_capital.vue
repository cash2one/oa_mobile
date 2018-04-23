<template>
    <div class="workApplyCapital workApply">
        <mt-field label="申请金额" placeholder="请输入金额" type="number" v-model="applynumber"></mt-field>
        <mt-field label="预算余额" placeholder="请输入预算余额" type="number" v-model="budgetnumber"></mt-field>
        <div class="from-textarea">
            <p class="from-textarea-title">申请原因</p>
            <textarea class="from-textarea-val" rows="7" v-model="reason"></textarea>
        </div>

        <upload-img-add :list="listImg" ></upload-img-add>

        <auditor-add :list="examineList"></auditor-add>

        <div class="button-Group">
            <mt-button class=" submit" size="large" type="primary" @click="submit">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import auditorAdd from '../tools/auditor_add'
    import uploadImgAdd from '../tools/uploadImg_add'

    export default {
        name: 'workApplyCapital',
        data () {
            return {
                applynumber: '',
                budgetnumber: '',
                reason: '',
                examineList: [],
                listImg: [],
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
                var form = new FormData();
                form.append('aid[]', this.examineList);
                form.append('money', this.applynumber);
                form.append('pay_method', this.type);
                form.append('budget_balance', this.budgetnumber);
                form.append('reason', this.reason);

                for (var i = 0; i < this.listImg.length; i++) {
                    form.append('images[]', this.listImg[i]);
                }
                form.append('uploadtype', 1);
                myFn.uploadImg(form, apiAddress.apply.reserve, (res) => {
                    this.$router.back(-1);
                });
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.type = res.data.type;
                    this.applynumber = res.data.money;
                    this.budgetnumber = res.data.budget_balance;
                    this.reason = res.data.reason;
                    for (var i = 0; i < res.data.image.length; i++) {
                        res.data.image[i] = '/public' + res.data.image[i];
                    }
                    this.listImg = res.data.image;
                })
            }
        },
        components: {
            auditorAdd,
            uploadImgAdd
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .workApplyCapital .from-textarea .from-textarea-val {
        border-bottom: 0;
    }
</style>
<style scoped>
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
