<template>
    <div class="contactsList">
<!--         <div class="search-wrapper">
            <i class="mintui mintui-search" :class="[isfocus?'left':'']"></i>
            <input type="text" placeholder="搜索" @keyup="query()" v-model="search.search">
        </div> -->
        <div class="list">
            <ul>
                <li v-for="(item,index) in list" :class="[isActive === index?'border-b-0':'']">
                    <div class="toggle dark" @click="active(index)">
                        <i class="mintui mintui-back" :class="[isActive === index?'rotate':'']"></i>
                        <span v-html="item.name"></span>
                        <span class="float-r" v-html="item.list.length"></span>
                    </div>
                    <div class="content-wrapper" :class="[isActive === index?'':'height']">
                        <div class="content" v-for="(obj,index) in item.list" @click="get_id(obj)">
                            <img slot="icon" v-if="obj.image.length == 0" src="../../assets/icon/head.png" width="50">
                            <img slot="icon" v-else :src="obj.image[0]" width="50">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contactsList',
        data () {
            return {
                list: [],
                isfocus: false,
                isActive: 0,
                search: {
                    page: 1,
                    search: ''
                }
            }
        },
        mounted () {
            this.getData(this.search);
        },
        methods: {
            getData: function (data) {
                myFn.ajax('get', data, apiAddress.mail.list, (res) => {
                    this.list = res.data;
                    console.log(this.list.length)
                })
            },
            query: function () {
                if (this.search.search) {
                    this.isfocus = true;
                    this.getData(this.search)
                } else {
                    this.isfocus = false;
                }
            },
            active: function (index) {
                if (this.isActive === index) {
                    this.isActive = -1;
                } else {
                    this.isActive = index;
                }
            },
            get_id: function (item) {
                this.$emit('close', item);
            }
        }
    }
</script>

<style scoped>
/*    .contactsList {
        margin-top: 52px;
    }*/
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
        margin-bottom: 90px;
        padding: 0 15px;
    }
    .list li {
        border-bottom: 1px solid #ededed;
        overflow-y: auto;
    }
    .content-wrapper {
        overflow: hidden;
        height: auto;
    }
    .content-wrapper > .content {
        margin-top: 16px;
    }
    .content-wrapper > div:first-child {
        margin-top: 0;
    }
    .toggle {
        padding: 15px 0;
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
</style>