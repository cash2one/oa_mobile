<template>
    <div class="tagList-tpl">
        <p class="createTag" @click="golist">+ 创建标签</p>
        <ul class="tagList">
            <li class="tagList-item" v-for="item in list">
                <p class="key" v-html="item.name + ' ('+ item.list.length +')'"></p>
                <p class="val" v-if="item.list.length">
                    <span v-for="obj in item.list" v-html="obj.client_name">张三</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                data: '',
                list: []
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            getList () {
                myFn.ajax('get', {}, apiAddress.customer.tagMapCustomer, (res) => {
                    console.log(res)
                    this.list = res.data;
                })
            },
            golist () {
                this.$router.push({name: 'addTag'})
            }
        }
    }
</script>

<style>
    .tagList-tpl {
        width: 100%;
        background: #f7f7f7;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    /* .tagList-tpl * {
        background: #fff;
    } */
</style>
<style scoped>
    .createTag {
        height: 60px;
        line-height: 60px;
        /* border-top:1px #ccc solid;
        border-bottom:1px #ccc solid; */
        padding-left: 20px;
        color: #1C69FE;
        background: #fff;
    }
    .title {
        margin: 30px 0 15px;
        padding-left: 15px;
        color: #8a8a8a;
        font-size: 15px;
    }
    .tagList {
        /* padding:0 15px; */
        margin-bottom: 15px;
    }
    .tagList .tagList-item {
        background: #fff;
        padding: 20px 15px;
        /* border-bottom: 1px #e0e0e0 solid; */
        margin-top: 10px;
    }
    .tagList .key {
        font-size: 16px;
    }
    .tagList .val {
        margin-top: 15px;
        color: #878787;
        font-size: 13px;
        height: 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .tagList .val span {
        margin-right: 10px;
    }
</style>
