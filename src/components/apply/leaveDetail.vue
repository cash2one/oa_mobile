<template>
    <div class="leaveDetail">
        <ul>
            <li>
                <p class="key">申请人:</p>
                <p class="val">张三</p>
            </li>
            <li>
                <p class="key">开始日期:</p>
                <p class="val">2017-02-03 00:00:00</p>
            </li>
            <li>
                <p class="key">结束日期:</p>
                <p class="val">2017-02-03 00:00:00</p>
            </li>
            <li>
                <p class="key">天数:</p>
                <p class="val">1</p>
            </li>
            <li>
                <p class="key">事由:</p>
                <p class="val">三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛三艘艾默生毛毛搜啊大扫荡莫萨摩没懂啥摸摸沙漠的模式毛毛</p>
            </li>
            <li>
                <p class="key">紧急联系人:</p>
                <p class="val">李四</p>
            </li>
            <li>
                <p class="key">紧急联系人电话:</p>
                <p class="val">139410165487</p>
            </li>
        </ul>
        <div class="button-Group">
            <mt-button class=" submit submit-login" size="large" type="primary">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'leaveDetail',
        data () {
            return {
                selected: '1'
            };
        },
        methods: {

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
</style>
