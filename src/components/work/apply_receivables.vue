<template>
    <div class="workApplyReceivables workApply">
        <!-- <p class="title">付款人</p> -->
        <mt-field label="付款人" placeholder="请输入付款人姓名" type="text" v-model="name"></mt-field>
        <mt-field label="付款方式" class="selectInput" >
            <select v-model="type">
                <option value="0">请输入付款方式</option>
                <option v-for="(item, key) in typeList" :value="key">{{item}}</option>
            </select>
        </mt-field>
        <mt-field label="付款金额" placeholder="请输入金额" type="number" v-model="number"></mt-field>
        <mt-field label="收款日期" class="proceedsTime" type="date" v-model="proceedsTime"></mt-field>
        <p class="title">申请说明</p>
        <div class="from-textarea"><textarea class="from-textarea-val" rows="7" v-model="reason"></textarea></div>
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
        name: 'workApplyReceivables',
        data () {
            return {
                proceedsTime: '',
                name: '',
                type: 1,
                number: '',
                reason: '',
                typeList: {},
                examineList: [],
                listImg: [],
                serverId: []
            }
        },
        mounted () {
            this.typeList = JSON.parse(localStorage.receivablesType);
            this.proceedsTime = myFn.getToday();
        },
        methods: {
            submit () {
                var form = new FormData();
                form.append('aid[]', this.examineList);
                form.append('payer', this.name);
                form.append('pay_method', this.type);
                form.append('reason', this.reason);
                form.append('money', this.number);
                form.append('collection_time', this.proceedsTime);
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
                myFn.uploadImg(form, apiAddress.apply.proceeds, (res) => {
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
    .workApplyReceivables {
        /* padding: 0 15px; */
    }
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    .upload-img {
        /* border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid; */
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
