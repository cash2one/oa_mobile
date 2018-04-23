<template>
    <div class="customerManagement">
        <div v-if="!bool" class="no_customer">
            <div>
                <p>还没有添加客户喔</p>
                <button class="my-btn" @click="go_Add">去添加</button>
            </div>
        </div>
        <div v-if="bool">
            <mt-search v-model="searchVal" class="search"></mt-search>
            <div v-show="is_search">
                <div class="tag" @click="golist">
                    <p><img src="../../assets/icon/tagIcon.png">标签</p>
                </div>
                <!-- <div class="middle">当前人数 {{list.length}}  人</div> -->
                <div class="content">
                    <ul class="customer-list">
                        <li v-for="item in list" class="list-style" @click="go_details(item.id)">
                            <div class="listImg">
                                <div class="add">
                                    <img v-if="item.image" :src="item.image">
                                    <img v-if="!item.image" src="../../assets/icon/head.png">
                                </div>
                            </div>
                            <div class="listContent">
                                <p class="name">{{item.name}}</p>
                                <p class="type">{{item.trade_name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="footerdown">
                    <div class="addIcon iconfont" @click="go_Add">&#xe60a;</div>
                </div>
            </div>
            <div v-show="!is_search">
                <!-- <p>111</p> -->
                <div class="content">
                    <ul>
                        <li v-for="item in searchlist" class="list-style" @click="go_details(item.id)">
                            <div class="listImg">
                                <div class="add"><img :src="item.image"></div>
                            </div>
                            <div class="listContent">
                                <p class="name">{{item.name}}</p>
                                <p class="type">{{item.trade_name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'customerManagement',
        data () {
            return {
                list: [],
                searchlist: [],
                is_search: true,
                searchVal: '',
                isfocus: false,
                search: {
                    page: 1,
                    search: ''
                },
                popupVisible: false,
                searchResult: [],
                seletShow: true,
                bool: ''
            }
        },
        watch: {
            searchVal: function (val, oldVal) {
                if (val !== '') {
                    this.is_search = false;
                    $('.customerManagement .mint-searchbar-inner .mintui-search').css({
                        'left': '15px'
                    })
                } else {
                    this.is_search = true;
                    $('.customerManagement .mint-searchbar-inner .mintui-search').css({
                        'left': '38%'
                    })
                }
                // 暂无接口
                myFn.ajax('get', {name: val}, apiAddress.customer.customerList, (res) => {
                    this.searchlist = res.data.data;
                });
            }
        },
        mounted () {
            this.bool = this.$route.params.bool;
            this.get_list();
            document.documentElement.classList.remove('prohibitOverflow');
            document.documentElement.classList.remove('overflow-y');
            document.body.classList.remove('prohibitOverflow');
        },
        methods: {
            get_list () {
                myFn.ajax('get', {}, apiAddress.customer.customerList, (res) => {
                    this.list = res.data.data || [];
                    if (this.list.length > 0) {
                        this.bool = true;
                    }
                });
            },
            go_Add () {
                this.$router.push({name: 'addCustomer'})
            },
            go_details (id) {
                this.$router.push({name: 'customerDetails', params: {id: id}});
            },
            golist () {
                this.$router.push({name: 'tagList'})
            }
        }
    }
</script>
<style>
    .customerManagement .mint-searchbar {
        background: #fff;
        padding: 10px 15px;
    }
    .customerManagement .mint-searchbar-inner {
        border-radius: 5px;
        text-align: center;
        position: relative;
        background: #EBEBEB;
    }
    .customerManagement .mint-searchbar-core {
        text-align: center;
        background: #EBEBEB;
    }
    .customerManagement .mintui .mintui-search {
        font-size: 20px;
    }
    .customerManagement .mint-searchbar-inner .mintui-search {
        position: absolute;
        left: 38%;
        top: 12px;
        font-size: 16px;
        transition: all 0.2s;
    }
</style>
<style scoped>
    .customer-list {
        padding: 0 10px;
        background-color: #fff;
    }
    .customer-list .listImg {
        padding-left: 0;
    }
    .customer-list > li:last-child {
        border: 0;
    }
    .customerManagement{
        font-size: 13px;
    }
    .search {
        height: auto;
    }
    .tag {
        margin: 10px 0;
        color: #1CCBD6;
        font-size: 17px;
        background: #fff;
        padding: 7px 15px;
        border-top:1px #ededed solid;
        border-bottom:1px #ededed solid;
    }
    .tag img {
        width: 35px;
        height: 35px;
        margin-right: 7px;
        vertical-align: middle;
    }
    .middle{
        background: #fff;
        padding: 13px 20px;
        font-size: 15px;
        color: #BDBDBD;
        border-bottom: 1px solid #ededed;
    }
    .list-style{
        display: flex;
        flex-direction: row;
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #ededed;
    }
    .listImg{
        padding: 15px 20px 15px 15px;
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
    .addIcon{
        position: fixed;
        bottom: 30px;
        right: 20px;
        width: 50px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background: #1b69fe;
    }
    .no_customer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('../../assets/icon/img/no_data.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-color: #fff;
    }
    .no_customer > div {
        position: absolute;
        width: 100%;
        bottom: 15%;
        text-align: center;
    }
    .no_customer > div p {
        font-size: 24px;
        color: #6980AA;
        margin-bottom: 50px;
    }
    .my-btn {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 30%;
        height: 42px;
        font-size: 17px;
        border-radius: 4px;
        outline: none;
        display: block;
        margin: auto;
    }
</style>