<template>
    <div class="workApplyCapital workApply">
        <!-- <p class="title">申请金额</p> -->
        <mt-field label="申请金额" placeholder="请输入金额" type="number" v-model="applynumber"></mt-field>
        <!-- <p class="title">预算余额</p> -->
        <mt-field label="预算余额" placeholder="请输入预算余额" type="number" v-model="budgetnumber"></mt-field>

        <p class="title">申请原因</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="reason"></textarea>
        </div>
        
        <p class="title">上传图片</p>
        <upload-img-add :list="listImg" :serverId="serverId" class="upload-img"></upload-img-add>

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
                serverId: []
            }
        },
        methods: {
            /* uploadChange (list, serverId) {
                this.listImg = list;
                this.serverId = serverId;
                console.log('接收' + this.listImg.toString());
                console.log('接收' + this.serverId.toString());
            }, */
            submit () {
                var form = new FormData();
                form.append('aid[]', this.examineList);
                form.append('money', this.applynumber);
                form.append('pay_method', this.type);
                form.append('budget_balance', this.budgetnumber);
                form.append('reason', this.reason);
                if (parseInt(window.uploadtype) === 1) {
                    for (var i = 0; i < this.listImg.length; i++) {
                        form.append('images[]', this.listImg[i]);
                    }
                } else {
                    for (var j = 0; j < this.serverId.length; j++) {
                        form.append('images[]', this.serverId[j]);
                    }
                }
                form.append('uploadtype', window.uploadtype);
                myFn.uploadImg(form, apiAddress.apply.reserve, (res) => {
                    this.$router.push({name: 'centerMyApply'});
                });
            }
        },
        components: {
            auditorAdd,
            uploadImgAdd
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .workApplyCapital {
        /* padding: 0 15px; */
    }
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    .submit {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
    }
    .button-Group {
        margin-top: 40px;
    }
</style>
