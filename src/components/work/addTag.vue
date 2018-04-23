<template>
    <div class="addTag">
        <div class="form-item">
            <div class="form-label">名称</div>
            <div class="form-control">
                <input v-model="value" placeholder="请输入标签名称">
            </div>
        </div>
        <div class="addTagBtn" @click="popupVisible = true">+ 添加成员</div>
        <div class="list">
            <div class="list-item" v-for="item in listImg">
                <img :src="item.image[0]">
                <span v-html="item.name"></span>
            </div>
        </div>

        <!-- <div class="tagInput">
            <p>请输入标签名称</p>
            <input type="text" v-model="value">
        </div>
        <p class="addCustomer">添加成员</p>
        <div class="addMember">
            <img v-for="item in listImg" :src="item.image[0]">
            <div @click="popupVisible = true">添加</div>
        </div> -->
        <!-- <div class="my-btn"><span @click="goback">确定</span></div> -->
        <div class="btn-wrapper">
            <button class="my-btn" @click="goback">保存</button>
        </div>
        <mt-popup v-model="popupVisible" position="right">
            <ul>
                <li v-for="item in list" class="list-style" @click="choose(item)">
                    <div class="listImg">
                        <div class="add"><img :src="item.image[0]"></div>
                    </div>
                    <div class="listContent">
                        <p class="name">{{item.name}}</p>
                        <p class="type">{{item.trade_name}}</p>
                    </div>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>
<script>
    import uploadImgAdd from '../tools/uploadImg_add'
    export default{
        data () {
            return {
                listImg: [],
                value: '',
                popupVisible: false,
                list: [],
                is_add: false
            }
        },
        mounted () {
            this.get_list();
        },
        methods: {
            goback () {
                if (this.value === '') return;
                var idList = [];
                for (var i = 0; i < this.listImg.length; i++) {
                    idList.push(this.listImg[i].id);
                };
                myFn.ajax('post', {name: this.value}, apiAddress.customer.addTag, (res) => {
                    this.value = '';
                    if (this.is_add) {
                        myFn.ajax('post', {lid: res.data.id, cid: idList}, apiAddress.customer.customerAddTag, (res) => {
                            console.log('res.msg')
                        })
                    }
                    this.$router.back(-1);
                })
            },
            get_list () {
                myFn.ajax('get', {}, apiAddress.customer.customerList, (res) => {
                    this.list = res.data.data;
                });
            },
            choose (item) {
                this.listImg.push(item);
                this.is_add = true;
                this.popupVisible = false;
            }
        },
        components: {
            uploadImgAdd
        }
    }
</script>
<style>
    .addTag .mint-popup-right {
        width: 70%;
        height: 100%;
    }
</style>
<style scoped>
    .addTag {
        background-color: #f7f7f7;
    }
    .list-style{
        display: flex;
        flex-direction: row;
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #ededed;
        font-size: 14px;
    }
    .listImg{
        padding: 15px 20px;
    }
    .listContent{
        position: relative;
        flex: 1;
        padding-top: 18px;
        line-height: 25px;
    }
    .listContent .name {
        font-size: 15px;
    }
    .listContent .type {
        color: #BDBDBD;
    }
    .add{
        width: 50px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #ddd;
        background: #fff;
        overflow: hidden;
    }
    .add img {
        width: 100%;
        height: 100%;
    }
    .addTagBtn {
        padding: 15px;
        box-sizing: border-box;
        font-size: 16px;
        color: #1C69FE;
        background-color: #fff;
        margin-top: 10px;
    }
    .form-item {
        padding: 15px;
        box-sizing: border-box;
        /* margin-top: 10px; */
        background-color: #fff;
        font-size: 0;
    }
    .form-item .form-label {
        display: inline-block;
        width: 40px;
        float: left;
        font-size: 16px;
        margin-top: 2px;
    }
    .form-item .form-control {
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 50px;
    }
    .form-item .form-control input {
        width: 100%;
        font-size: 16px;
        border: 0;
        background: none; 
    }
    .list {
        margin-top: 20px;
        background-color: #fff;
    }
    .list-item {
        font-size: 0;
        box-sizing: border-box;
        padding: 20px 15px;
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: 0 84px;
        background-origin: content-box;
    }
    .list .list-item:last-child {
        background: none;
    }
    .list-item img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 25px;
    }
    .list-item span {
        font-size: 16px;
        color: #1B1C20;
        vertical-align: middle;
    }
    .btn-wrapper {
        padding: 30px 0;
        background-color: #f7f7f7;
    }
    .my-btn {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
        display: block;
        margin: auto;
    }
</style>