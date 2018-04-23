<template>
    <div class="yearTarget_details">
        <div v-if="details.type==1">
            <p class="title"><span v-html="details.start_time"></span>——<span v-html="details.end_time"></span>目标</p>
            <p class="contont_title">目标内容</p>
            <p class="content" v-html="details.content">汇丰银行开户，购买XXX基金</p>
            <p class="method">方法和措施</p>
            <ul class="method_content_list">
                <li v-html="details.method">1、如果你无法简洁的表达你的想法，那只说明你还不够了解它</li>
            </ul>
        </div>
        <div v-if="details.type==2">
            <p class="title"><span v-html="month"></span>月份目标</p>
            <p class="contont_title">目标类型</p>
            <p class="content" v-html="details.cate_name">汇丰银行开户，购买XXX基金</p>
            <p class="contont_title">目标内容</p>
            <p class="content" v-html="details.content">汇丰银行开户，购买XXX基金</p>
        </div>
        <!-- <mt-button class="editBtn" type="default">编辑</mt-button> -->
        <mt-button type="primary" class="submitBtn" @click="edit" v-if='!details.is_success'>
            编辑
        </mt-button>
    </div>
</template>
<script>
    export default {
        name: 'yearTarget_details',
        data () {
            return {
                id: '',
                details: '',
                month: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getdetail()
        },
        methods: {
            getdetail () {
                myFn.ajax('get', {model_type: 4, id: this.id}, apiAddress.plan.details, (res) => {
                    this.details = res.data;
                })
            },
            edit () {
                this.$router.push({name: 'yearTargetEdit', params: {id: this.id}})
            }
        }
    }
</script>
<style scoped>
    .yearTarget_details {
        padding: 15px 15px;
        box-sizing: border-box;
        line-height: 25px;
    }
    .title {
        font-size: 15px;
        color: #999;
    }
    .contont_title {
        margin:10px 0px;
        font-size: 15px;
    }
    .content {
        font-size: 20px;
        border-bottom: 1px #ccc solid;
        padding-bottom: 20px;
    }
    .method {
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .method_content_list li {
        font-size: 14px;
        margin-top: 7px;
        line-height: 20px;
    }
    .editBtn {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding-left: 0px;
        margin-left: -15px;
    }
    .submitBtn {
        width: 100%;
        position: fixed;
        bottom: 0px;
        left: 0;
        border-radius: 0;
        background: #1B69FE;
        font-size: 16px;
    }
</style>