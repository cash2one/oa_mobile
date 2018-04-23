
<template>
    <div class="receivedApplyGoods received">
        <p class="step"><span>当前审核步骤：</span><span v-html="setpValue"></span></p>
        <mt-field label="类型">
            <p v-html="information.goodsname"></p>
        </mt-field>

        <mt-field label="数量" placeholder="请输入需要数量" type="text" disabled>
            <p v-html="information.num"></p>
        </mt-field>
        <p class="title">原因用途</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="information.remark" disabled></textarea>
        </div>

        <!-- <received-apply-button :id="id"></received-apply-button> -->

    </div>
</template>

<script>
    import receivedApplyButton from '../tools/receivedApply_button'
    export default {
        name: 'receivedApplyGoods',
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
                    this.setpValue = res.data.list[0].name || '';
                });
            }
        },
        components: {
            receivedApplyButton
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

