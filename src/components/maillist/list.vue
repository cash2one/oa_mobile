<template>
    <div class="maillist">
        <div class="search-wrapper">
            <i class="mintui mintui-search" :class="[isfocus?'left':'']" style="color: #C5CDD4;"></i>
            <input type="text" placeholder="搜索" 
                :class="[isfocus?'onfocus':'']"
                @focus="control"
                @keyup="query" v-model="search.search">
            <span class="searchConcel" v-if="isfocus" @click="concel">取消</span>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in list" :class="[isActive === index?'border-b-0':'']" class="list-style">
                    <div class="toggle dark" @click="active(index)">
                        <i class="mintui mintui-back" :class="[isActive === index?'rotate':'']"></i>
                        <span v-html="item.name"></span>
                        <span class="float-r" v-html="item.list.length"></span>
                    </div>
                    <div class="content-wrapper" :class="[isActive === index?'':'height']">
                        <div class="content" v-for="(obj,index) in item.list" @click="godetails(obj.id)">
                            <img slot="icon" v-if="!obj.image.length" src="../../assets/icon/head.png" width="50">
                            <img slot="icon" v-if="obj.image.length" :src="obj.image[0]" width="50">
                            <div>
                                <div class="border-b">
                                    <p class="deep-dark" v-html="obj.name"></p>
                                    <p class="gray" v-html="obj.mobile"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <mt-popup v-model="popupVisible" :modal="false">
                <div class="searchPage">
                    <p class="联系人"></p>
                    <ul class="search-result-list">
                        <p v-if="searchResult.length">联系人</p>
                        <li v-for="item in searchResult" @click="godetails(item.id)">
                            <img :src="item.headimgurl || require('../../assets/icon/applyAvatar.png')" width="50">
                            <span v-html="item.name"></span>
                        </li>
                    </ul>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'maillist',
        data () {
            return {
                list: [],
                isfocus: false,
                isActive: -1,
                search: {
                    page: 1,
                    search: ''
                },
                popupVisible: false,
                searchResult: []
            }
        },
        mounted () {
            this.getData(this.search)
        },
        methods: {
            getData: function (data) {
                myFn.ajax('get', data, apiAddress.mail.list, (res) => {
                    this.list = res.data;
                    // console.log(this.list.length)
                })
            },
            query: function () {
                if (this.search.search === '') {
                    this.searchResult = '';
                    return false;
                };
                myFn.ajax('get', this.search, apiAddress.mail.list, (res) => {
                    this.searchResult = res.data || [];
                    // console.log(this.searchResult)
                })
            },
            active: function (index) {
                if (this.isActive === index) {
                    this.isActive = -1;
                } else {
                    this.isActive = index;
                }
            },
            godetails: function (id) {
                this.$router.push({name: 'maildetails', params: {id: id}})
            },
            control: function () {
                this.popupVisible = true;
                this.isfocus = true;
            },
            concel: function () {
                this.search.search = '';
                this.popupVisible = false;
                this.isfocus = false;
                this.searchResult = '';
            }
        }
    }
</script>

<style scoped>
    .search-wrapper {
        top: 0;
        width: 100%;
        position: fixed;
        border-bottom: 1px solid #ededed;
        z-index: 999;
        background-color: #fff;
        text-align: center;
    }
    .search-wrapper input {
        margin: 10px 0;
        width: 90%;
        height: 29px;
        border: 0;
        background: #ededed;
        border-radius: 5px;
        text-align: center;
        font-size: 16px;
    }
    .mintui-search {
        position: absolute;
        top: 19px;
        left: 50%;
        margin-left: -35px;
        transition: all 0.1s;
    }
    .left {
        left: 17px;
        margin-left: 0;
    }
    .list {
        margin-top: 52px;
        margin-bottom: 90px;
        padding: 0 15px;
        position: relative;
    }
    .list li {
        border-bottom: 1px solid #ededed;
        overflow-y: auto;
    }
    .content-wrapper {
        overflow: hidden;
        height: auto;
        transition: all 0.3s;
    }
    .content-wrapper > .content {
        margin-top: 16px;
    }
    .content-wrapper > div:first-child {
        margin-top: 0;
    }
    .toggle {
        padding: 20px 0;
        line-height: 1.0;
    }
    .toggle i {
        transition: all 0.3s;
        vertical-align: middle;
    }
    .toggle span {
        vertical-align: middle;
    }
    .list-style:first-child{
        padding-top:10px;
    }
    .content {
        position: relative;
        padding-bottom: 5px;
    }
    .content img {
        position: absolute;
        border-radius: 50%;
    }
    .content > div {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        padding-left: 65px;
    }
    .content > div p {
        margin: 5px;
        margin-left: 0;
    }
    .fading-circle {
        height: 30px;
        padding-top: 15px;
        text-align: center;
    }
    .fading-circle > span {
        display: inline-block;
    }
    .list > ul .border-b-0{
        border-bottom: 0;
    }
    .mintui-back {
        font-size: 12px;
        margin-right: 10px;
        display: inline-block;
        transform:rotate(-180deg);
        -ms-transform:rotate(-180deg);     /* IE 9 */
        -moz-transform:rotate(-180deg);    /* Firefox */
        -webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
        -o-transform:rotate(-180deg);  /* Opera */
    }
    .rotate {
        transform:rotate(-90deg);
        -ms-transform:rotate(-90deg);     /* IE 9 */
        -moz-transform:rotate(-90deg);    /* Firefox */
        -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
        -o-transform:rotate(-90deg);  /* Opera */
    }
    .border-b {
        border-bottom: 1px solid #ededed;
    }
    .height {
        height: 0;
    }
    .dark {
        color: #424242;
    }
    .deep-dark {
        color: #333;
    }
    .gray {
        color: #A0A9BA;
    }
    .float-r {
        float: right;
        color: #757575;
    }
    /**
     *  search 弹层
     */
    .searchPage {
        width: 100%;
        height: 100%;
    }
    .mint-popup {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 52px;
        left: 0;
        transform: none;
    }
    .searchConcel {
        padding: 0 10px;
        font-size: 14px;
    }
    .search-wrapper input.onfocus {
        width: 80%;
    }
    .search-result-list {
        padding: 0 15px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
    }
    .search-result-list p {
        padding: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
    }
    .search-result-list li {
        overflow: auto;
        padding: 5px 0;
    }
    .search-result-list li img,
    .search-result-list li span {
        vertical-align: middle;
    }
    .search-result-list li img {
        border-radius: 50%;
    }
    .search-result-list li span {
        display: inline-block;
        margin-left: 10px; 
    }
    .v-modal {
        display: none;
    }
</style>