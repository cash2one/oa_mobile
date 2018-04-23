<template>
    <div class="selectTag">
        <div class="addTag-link" @click="popupVisible = true">+ 创建标签</div>
        <div class="selected" v-if="tagList.length">
            <p>已有标签</p>
            <!-- <div :class="[selected.id?'':'isShow']">
                <span v-html="selected.name"></span>
                <img src="../../assets/icon/del.png" @click="concelSelected">
            </div> -->
            <div v-for="(item, index) in tagList">
                <span v-html="item.name"></span>
                <img src="../../assets/icon/del.png" @click="concelSelected(item.id, index)">
            </div>
        </div>
        <div class="tagList">
            <p>全部标签</p>
            <ul>
                <li v-for="item in list" v-html="item.name" @click="select(item.id, item.name)"></li>
            </ul>
        </div>
        <div class="my-btn"><span @click="goback">确定</span></div>
        <div class="dialog" v-if="popupVisible">
            <p>标签名称</p>
            <input type="text" v-model="value" placeholder="请输入名称">
            <button @click="submit">确定</button>
        </div>
        <div class="mask" v-if="popupVisible" @click="popupVisible = false"></div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                selected: {
                    id: '',
                    name: ''
                },
                list: [],
                tagList: [],
                popupVisible: false,
                value: ''
            }
        },
        mounted () {
            this.getTagList()
            setTimeout(() => {
                this.tagList = this.selectTagVal.label;
            }, 2000)
        },
        methods: {
            getTagList () {
                myFn.ajax('get', {}, apiAddress.customer.tagList, (res) => {
                    this.list = res.data || [];
                })
            },
            select (id, name) {
                this.selected.id = id;
                this.selected.name = name;
                myFn.ajax('post', {cid: this.selectTagVal.id, lid: id}, apiAddress.customer.customerAddTag, (res) => {
                    this.tagList.push({id: id, name: name})
                })
            },
            concelSelected (id, index) {
                // console.log(this.list);
                myFn.ajax('post', {id: id}, apiAddress.customer.delCustomerTag, (res) => {
                    this.tagList.splice(index, 1);
                })
            },
            goAddTag () {
                this.$router.push({name: 'addTag'})
            },
            goback () {
                this.selectTagShow.selectTag = false;
            },
            submit () {
                if (this.value === '') return;
                myFn.ajax('post', {name: this.value}, apiAddress.customer.addTag, (res) => {
                    this.value = '';
                    this.list.push({id: res.data.id, name: res.data.name});
                    this.popupVisible = false;
                })
            }
        },
        props: ['selectTagShow', 'selectTagVal']
    }
</script>
<style scoped>
    .isShow {
        visibility: hidden; 
    }
    .dialog {
        position: absolute;
        width: 90%;
        margin-left: 5%;
        padding: 20px;
        box-sizing: border-box;
        top: 20%;
        z-index: 2;
        background: #fff;
        border-radius: 5px;
        overflow: hidden;
    }
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
    }
    .dialog p{
        margin-bottom: 10px;
    }
    .dialog input {
        display: inline-block;
        width: 100%;
        height: 21px;
        border-radius: 2px;
        border: 0;
        border: 1px solid #ddd;
        text-indent: 5px;
    }
    .dialog button {
        width: 100%;
        background: none;
        border: 0;
        background: #1b69fe;
        border-radius: 5px;
        outline: none;
        color: #fff;
        margin-top: 20px;
        height: 24px;
    }
    .selected {
        padding: 20px 15px;
        color: #4a4a4a;
        background: #fff;
        border-bottom: 1px solid #ededed;
    }
    .selected p {
        margin-bottom: 15px;
    }
    .selected div {
        display: inline-block;
        padding: 3px 15px;
        border: 1px dashed #ccc;
        background: #f1f1f1;
        border-radius: 30px;
        font-size: 14px;
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .selected div img {
        width: 12px;
        margin-left: 7px;
    }
    .addTag-link {
        padding: 15px;
        color: #1b69fe;
        font-size: 15px;
        border-bottom: 1px solid #ededed;
    }
    .tagList {
        padding: 15px;
        padding-top: 25px;
    }
    .tagList p {
        margin-bottom: 5px;
        color: #4a4a4a;
        font-size: 15px;
    }
    .tagList ul {
        height: 160px;
        overflow: auto;margin-bottom: 120px;
    }
    .tagList ul li {
        display: inline-block;
        margin: 10px 15px 10px 0;
        margin-left: 0;
        border: 1px dashed #ccc;
        background: #f1f1f1;
        padding: 3px 15px;
        border-radius: 30px;
        font-size: 14px;
        color: #343434;
    }
    .my-btn {
        width: 100%;
        box-sizing: border-box;
        padding: 15px;
        position: absolute;
        bottom: 10%;
    }
    .my-btn span {
        display: block;
        background: #1b69fe;
        text-align: center;
        color: #fff;
        padding: 7px 0;
        border-radius: 5px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
</style>