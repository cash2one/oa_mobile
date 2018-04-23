<template>
    <div class="addTname">
        <p class="tradeClassify"><span>行业分类</span><span v-html="tradeName"></span></p>
        <p class="addTradeName">添加行业名称</p>
        <div class="form-field">
            <input type="text" class="form-control" v-model="tagValue" @keydown.13="tags" @blur="tags">
            <ul>
                <li v-for="(item,index) in tagList"><span v-html="item.name"></span><img src="../../assets/icon/del.png" @click="concelSelected(index)"></li>
            </ul>
        </div>
        <!-- <button class="addNameBtn" v-if="!isShow" @click="isShow = true">添加名称</button> -->
        <div class="my-btn" @click="submit">完成</div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                tradeID: '',
                tradeName: '',
                isShow: false,
                tagList: [],
                tagValue: '',
                sendTagList: []
            }
        },
        mounted () {
            this.$watch('show', (newVal, oldVal) => {
                if (this.show.isShow) {
                    console.log(this.data)
                    if (parseInt(this.data.id) === 0) {
                        this.getTradeList()
                    } else {
                        this.tradeID = this.data.id;
                    }
                    this.tradeName = this.data.name;
                }
            }, {deep: true})
        },
        methods: {
            getTradeList () {
                myFn.ajax('get', {}, apiAddress.tradeList.tradeList, (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        if (this.data.name === res.data[i].name) {
                            this.tradeID = res.data[i].id;
                        }
                    }
                })
            },
            tags () {
                if (this.tagValue === '') return;
                this.tagList.push({name: this.tagValue});
                this.sendTagList.push(this.tagValue);
                this.tagValue = '';
            },
            concelSelected (index) {
                this.tagList.splice(index, 1);
                this.sendTagList.splice(index, 1);
            },
            submit () {
                myFn.ajax('post', {pid: this.tradeID, name: this.sendTagList}, apiAddress.customer.addTrade, (res) => {
                    this.sendTagList = [];
                    this.tagList = [];
                    this.show.isShow = false;
                    this.show.ContentVisible = false;
                })
            }
        },
        props: ['data', 'show', 'list']
    }
</script>
<style scoped>
    .tradeClassify {
        padding: 15px;
        border-bottom: 1px solid #ededed;
        color: #999;
        font-size: 14px;
    }
    .tradeClassify span:first-child {
        margin-right: 15px;
    }
    .addTradeName {
        padding: 25px 15px 15px;
        color: #4a4a4a;
    }
    .addNameBtn {
        width: 100%;
        border: 0;
        padding: 15px;
        background: #ededed;
        color: #999;
        font-size: 15px;
    }
    .form-field {
        padding: 0 15px;
    }
    .form-field .form-control {
        border: 0;
        height: 25px;
        width: 100%;
        border-radius: 5px;
        text-indent: 10px;
        color: #4a4a4a;
        border: 1px solid #ededed;
    }
    .form-field ul li {
        margin: 10px;
        margin-left: 0;
        padding: 3px 10px;
        background: #f1f1f1;
        border-radius: 30px;
        border: 1px solid #ededed;
        display: inline-block;
        color: #4a4a4a;
        font-size: 14px;
    }
    .form-field ul li img,
    .form-field ul li span {
        vertical-align: baseline;
    }
    .form-field ul li img {
        width: 10px;
        margin-left: 5px;
    }
    .my-btn{
        position: fixed;
        bottom: 0;
        color: #fff;
        width: 100%;
        height: 41px;
        line-height: 41px;
        text-align: center;
        background: #1b69fe;
    }
</style>