<template>
    <div class="centerMyApplyDetails">
        <ul>
            <li>
                <p class="key">开始日期:</p>
                <p class="val" v-html="details.start_time">2017-02-03 00:00:00</p>
            </li>
            <li>
                <p class="key">结束日期:</p>
                <p class="val" v-html="details.end_time">2017-02-03 00:00:00</p>
            </li>
            <li>
                <p class="key">天数:</p>
                <p class="val" v-html="details.days">1</p>
            </li>
            <li>
                <p class="key">事由:</p>
                <p class="val" v-html="details.reason">三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛</p>
            </li>
            <li>
                <p class="key">紧急联系人:</p>
                <p class="val" v-html="details.urgency_name">李四</p>
            </li>
            <li>
                <p class="key">紧急联系人电话:</p>
                <p class="val" v-html="details.urgency_mobile">139410165487</p>
            </li>
        </ul>
        <p class="auditOpinion">审核意见</p>
        <ul class="auditOpinion-val">
            <li v-for="item in details.list">
                <p class="key" v-html="item.name">直属领导:</p>
                <p class="val" v-html="item.content">2017-02-03 00:00:00</p>
            </li>
        </ul>
        <div class="button-Group">
            <mt-button class=" submit submit-login" size="large" type="primary">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'centerMyApplyDetails',
        data () {
            return {
                itemID: '',
                details: {}
            };
        },
        mounted () {
            if (this.$route.params.id) {
                this.itemID = this.$route.params.id;
            };
            this.getDetails();
        },
        methods: {
            getDetails: function () {
                myFn.ajax('get', {id: this.itemID}, apiAddress.center.applyDetails, (res) => {
                    this.details = res.data;
                })
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        padding-top: 10px;
        background: #fff;
        font-size: 1em;
    }
    ul li {
        padding: 5px 15px;
    }
    .val {
        margin: 7px 0px;
        padding: 7px 10px;
        border: 1px #ccc solid;
        color: #6e6e6e;
    }
    .button-Group {
        margin-top: 30px;
    }
    .auditOpinion {
        border-top: 1px #ccc solid;
        padding: 10px 15px;
        padding-top: 30px;
        background: #fff;
    }
    .auditOpinion-val .val {
        height: 70px;
    }
</style>
