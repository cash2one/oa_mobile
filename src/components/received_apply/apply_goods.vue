
<template>
    <div class="receivedApplyGoods received">

        <mt-field label="类型">
            <p v-html="information.goodsname"></p>
        </mt-field>

        <mt-field label="数量" class="contract">
            <p v-html="information.num"></p>
        </mt-field>
        <div class="from-textarea">
            <p class="from-textarea-title">原因用途</p>
            <textarea class="from-textarea-val" rows="7" v-model="information.remark" disabled></textarea>
        </div>
        <p class="title">审核意见</p>
        <div class="from-textarea" v-for="item in information.list">
            <p class="from-textarea-title" v-html="item.name">直属领导</p>
            <textarea class="from-textarea-val" rows="7" :placeholder="item.content?'':'无'" v-model="item.content" disabled></textarea>
        </div>
        <div class="from-textarea" v-if="type == 1">
            <p class="from-textarea-title">我的意见</p>
            <textarea class="from-textarea-val" rows="7" placeholder="请在此填写您的审核意见" v-model="emit.content"></textarea>
        </div>
        <received-apply-button :id="emit" v-if="type == 1"></received-apply-button>
    </div>
</template>

<script>
    import receivedApplyButton from '../tools/receivedApply_button'
    export default {
        name: 'receivedApplyGoods',
        data () {
            return {
                information: {},
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
    .received {
        margin-bottom: 41px;
    }
    .title {
        margin: 25px 15px 15px;
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
</style>

