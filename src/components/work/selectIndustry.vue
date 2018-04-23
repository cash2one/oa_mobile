<template>
    <div class="selectIndustry">
        <div class="search-wrapper">
            <i class="mintui mintui-search" :class="[isfocus?'left':'']"></i>
            <input type="text" placeholder="搜索" 
                :class="[isfocus?'onfocus':'']" 
                @focus="control"
                @keyup="query" v-model="search.search">
            <span class="searchConcel" v-if="isfocus" @click="concel">取消</span>
        </div>
        <div class="list">
            <div style="height: 98px;">sdfs</div>
            <mt-popup v-model="popupVisible" :modal="false">
                <div class="searchPage">
                    <p class="联系人"></p>
                    <ul class="search-result-list">
                        <p v-if="searchResult.length">联系人</p>
                        <li v-for="item in searchResult" @click="godetails(item.id)">
                            <img src="../../assets/icon/head.png" width="50">
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
        name: 'selectIndustry',
        data () {
            return {
                list: [],
                isfocus: false,
                isActive: 0,
                search: {
                    page: 1,
                    search: ''
                },
                popupVisible: false,
                searchResult: []
            }
        },
        mounted () {
            // this.getData(this.search)
        },
        methods: {
            // getData: function (data) {
            //     myFn.ajax('get', data, apiAddress.mail.list, (res) => {
            //         this.list = res.data;
            //         console.log(this.list.length)
            //     })
            // },
            query: function () {
                if (this.search.search === '') {
                    this.searchResult = '';
                    return false;
                };
                myFn.ajax('get', this.search, apiAddress.mail.list, (res) => {
                    this.searchResult = res.data;
                    console.log(this.searchResult)
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
                this.searchResult = ''
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
    }
    .search-wrapper input {
        margin: 10px 0 10px 3%;
        width: 94%;
        height: 29px;
        border: 0;
        background: #ededed;
        border-radius: 5px;
        text-align: center;
    }
    .mintui-search {
        position: absolute;
        top: 18px;
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
        color: #757575
    }
    .deep-dark {
        color: #333;
    }
    .gray {
        color: #b8b8b8;
    }
    .float-r {
        float: right;
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
        padding-top: 5px;
    }
    .search-result-list li img,
    .search-result-list li span {
        vertical-align: middle;
    }
    .search-result-list li span {
        display: inline-block;
        margin-left: 10px; 
    }
    .v-modal {
        display: none;
    }
</style>