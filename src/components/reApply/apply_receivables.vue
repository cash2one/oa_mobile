
<template>
    <div class="workApplyReceivables workApply">
        <mt-field label="付款人" placeholder="请输入付款人姓名" type="text" v-model="name"></mt-field>
        <mt-field label="付款方式" class="selectInput selectInputRight" >
            <select v-model="type">
                <option value="0">< 请输入付款方式</option>
                <option v-for="(item, key) in typeList" :value="key">{{item}}</option>
            </select>
        </mt-field>
        <mt-field label="付款金额" placeholder="请输入金额" type="number" v-model="number"></mt-field>
        
        <mt-field label="收款日期" class="proceedsTime">
            <p @click="openPicker('proceedsTime')" v-html="proceedsTime[0]"></p>
        </mt-field>

        <div class="from-textarea">
            <p class="from-textarea-title">申请说明</p>
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
        name: 'workApplyReceivables',
        data () {
            return {
                proceedsTime: ['请选择日期 > '],
                name: '',
                type: 0,
                number: '',
                reason: '',
                typeList: {},
                examineList: [],
                listImg: [],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: '',
                receivedID: ''
            }
        },
        mounted () {
            this.typeList = JSON.parse(localStorage.receivablesType);
            if (this.$route.params.id) {
                this.receivedID = this.$route.params.id;
            };
            this.getDetails();
        },
        methods: {
            submit () {
                var form = new FormData();
                form.append('aid[]', this.examineList);
                form.append('payer', this.name);
                form.append('pay_method', this.type);
                form.append('reason', this.reason);
                form.append('money', this.number);
                form.append('collection_time', this.proceedsTime[1]);
                for (var i = 0; i < this.listImg.length; i++) {
                    form.append('images[]', this.listImg[i]);
                }
                form.append('uploadtype', 1);
                myFn.uploadImg(form, apiAddress.apply.proceeds, (res) => {
                    this.$router.back(-1);
                });
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.name = res.data.payer;
                    this.type = res.data.pay_method;
                    this.number = res.data.money;
                    this.reason = res.data.reason;
                    for (var i = 0; i < res.data.image.length; i++) {
                        res.data.image[i] = '/public' + res.data.image[i];
                    }
                    this.listImg = res.data.image;
                    this.proceedsTime[0] = res.data.collection_time;
                    this.proceedsTime[1] = res.data.collection_time;
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
    .workApplyReceivables .from-textarea .from-textarea-val {
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
