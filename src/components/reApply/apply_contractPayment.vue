
<template>
    <div class="workApplyContractPayment workApply">
        <mt-field label="付款日期" class="contract" style="margin-bottom: 0;">
            <p @click="openPicker('contract')" v-html="contract[0]"></p>
        </mt-field>
        <mt-field label="付款金额" placeholder="请输入金额" type="number" v-model="number"></mt-field>
        <mt-field label="收款方" placeholder="请输入收款方" type="text" v-model="contractName"></mt-field>
        <div class="from-textarea">
            <p class="from-textarea-title">原因用途</p>
            <textarea class="from-textarea-val" rows="7" v-model="reason"></textarea>
        </div>

        <upload-img-add :list="listImg" class="upload-img"></upload-img-add>

        <auditor-add :list="examineList"></auditor-add>
        
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_Time"></mt-datetime-picker>

        <div class="button-Group">
            <mt-button class=" submit" size="large" type="primary" @click="submit">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import auditorAdd from '../tools/auditor_add'
    import uploadImgAdd from '../tools/uploadImg_add'

    export default {
        name: 'workApplyContractPayment',
        data () {
            return {
                contract: ['请输入开始时间 >'],
                number: '',
                contractName: '',
                reason: '',
                examineList: [],
                listImg: [],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: '',
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
                form.append('pay_time', this.contract[1]);
                form.append('money', this.number);
                form.append('reason', this.reason);
                form.append('receive_name', this.contractName);
                for (var i = 0; i < this.listImg.length; i++) {
                    form.append('images[]', this.listImg[i]);
                }
                form.append('uploadtype', 1);
                myFn.uploadImg(form, apiAddress.apply.contractPayment, (res) => {
                    this.$router.back(-1);
                });
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.number = res.data.money;
                    this.contractName = res.data.receive_name;
                    this.reason = res.data.reason;
                    this.contract[0] = res.data.pay_time;
                    this.contract[1] = res.data.pay_time;
                    for (var i = 0; i < res.data.image.length; i++) {
                        res.data.image[i] = '/public' + res.data.image[i];
                    }
                    this.listImg = res.data.image;
                })
            },
            openPicker (key) {
                this.thisTimeSelect = key;
                this.$refs.picker.open();
            },
            set_Time (date) {
                this[this.thisTimeSelect] = myFn.getTime(date);
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
    .workApplyContractPayment .from-textarea .from-textarea-val {
        border-bottom: 0;
    }
</style>
<style scoped>
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

