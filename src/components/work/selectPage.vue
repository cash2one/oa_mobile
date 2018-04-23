<template>
    <div class="selectPage">
        <div v-show="!addTrade.isShow">
            <!-- <div class="search-wrapper">
                <i class="mintui mintui-search" :class="[isfocus?'left':'']"></i>
                <input type="text" placeholder="搜索"
                :class="[isfocus?'onfocus':'']" 
                @focus="control"
                @keyup="query" v-model="search">
                <span class="searchConcel" v-if="isfocus" @click="concel">取消</span>
            </div> -->
            <div class="selected" style="display: none;">
                <p>已选行业</p>
                <div :class="[selected.id?'':'isShow']">
                    <span v-html="selected.name"></span>
                    <!-- <img src="../../assets/icon/del.png" @click="concelSelected"> -->
                </div>
            </div>
            <div class="listDetail">
                <div class="content">
                        <mt-radio v-for="(item, key) in list" :key="key" :title="item.name" v-model="value" :options="item.list"  @change="findOut(item.list)" >
                    </mt-radio>
                </div>
                <mt-popup v-model="addTrade.ContentVisible" :modal="false" class="classfiy" >
                    <div class="modalStylePop">
                        <div class="modalStyle">
                            <div class="modalStyle-first-wrapper">
                                <span class="iconfont icon-style" @click="closeVisable">&#xe616;</span>
                                <span class="modalStyle-title">添加行业</span>
                                <!-- <span class="modalStyle-text" v-show="wrapperVisible">行业分类</span> -->
                                <div v-show="wrapperVisible" :class="[selectId !== '0'?'go-down':'']">
                                    <select v-model="selectId" @change="select">
                                        <option value='' disabled selected style='display:none;'>选择分类</option>
                                        <option v-for="(item,index) in list" :key="item.id" :value="item.id">{{item.name}}</option>
                                        <option value='0'>其他</option>
                                    </select> 
                                </div>
                                <div class="input-style" v-show="selectId === '0'">
                                    <input type="text" v-model="inputContent" placeholder="输入分类直接添加" @click="wrapperVisible = true" @blur="loseFocus">
                                </div>
                            </div>
                            <div class="bottom-focus">
                                <mt-button size="large" class="down-bottom" @click="go_Tname">下一步</mt-button>
                            </div>
                        </div>
                    </div>
                </mt-popup>
                <mt-popup v-model="popupVisible" :modal="false">
                    <div class="searchPage">
                        <p class="联系人"></p>
                        <ul class="search-result-list">
                            <p v-if="searchResult.length">行业列表</p>
                            <div class="content">
                                <mt-radio v-for="(item,index) in searchResult" :key="item.id"
                                :title="item.name"
                                v-model="value"
                                :options="searchResult[index].list" @change="findOut(item.list)">
                                </mt-radio>
                            </div>
                        </ul>
                        <div class="buttonStyle">
                            <mt-button size="large" class="buttonStyleSecond" @click="go_Page">完成</mt-button>
                        </div>
                    </div>
                </mt-popup>
            </div>
            <!-- <div style="width: 100%;margin-bottom: 80px;">
                <mt-button size="large" class="buttonStyleFirst" @click="option_addTrade_popup">添加行业</mt-button> 
            </div> -->
            <!-- <div class="buttonStyle">
                <mt-button size="large" class="buttonStyleSecond"  @click="go_Page">完成</mt-button>
            </div> -->
        </div>
        <add-trade v-show="addTrade.isShow" :data="addTradeNameValue" :show="addTrade" :list="list"></add-trade>
    </div>
</template>
<script>
    import addTrade from './addTradeName'
    export default {
        name: 'selectPage',
        data () {
            return {
                vla2: '',
                goId: '',
                sendId: '',
                selectId: '',
                inputContent: '',
                selectName: [],
                list: [],
                value: '55',
                namelist: [],
                isfocus: false,
                isActive: 0,
                search: '',
                popupVisible: false,
                ContentVisible: false,
                wrapperVisible: true,
                selected: {id: '', name: ''},
                searchResult: [],
                addTradeNameValue: {},
                addTrade: {
                    isShow: false,
                    ContentVisible: false
                },
                buttonTop: '',
                industry_item: []
            }
        },
        watch: {
            value: function (newVal, oldVal) {
                setTimeout(() => {
                    for (var i in this.industry_item) {
                        if (this.industry_item[i].value === newVal) {
                            this.selected.id = newVal;
                            this.selected.name = this.industry_item[i].label;
                            this.go_Page();
                        }
                    }
                }, 50);
            },
            selectPageShow: {
                handler: function (val) {
                    if (val.selectPage) {
                        $('html').addClass('prohibitOverflow');
                        // this.buttonTop = $(window).height() - $('.buttonStyleFirst').height()
                        // $('.buttonStyleFirst').css('top', this.buttonTop + 'px')
                    } else {
                        $('html').removeClass('prohibitOverflow');
                    }
                },
                deep: true
            },
            addTrade: {
                handler: function () {
                    this.getData();
                },
                deep: true
            },
            selectPageVal: {
                handler: function (val) {
                    this.value = this.selectPageVal.trade_id.toString();
                },
                deep: true
            }

        },
        mounted () {
            this.getData();
        },
        methods: {
            getData () {
                myFn.ajax('get', {}, apiAddress.tradeList.tradeList, (res) => {
                    this.list = res.data;
                    // var self = this;
                    this.$nextTick(function () {
                        var popupDiv = $('.addCustomer .popup');
                        if (popupDiv.length === 0) {
                            popupDiv = $('.customerPage .popup');
                        }
                        popupDiv.scroll(function (e) {
                            // $('.buttonStyleFirst').css('top', self.buttonTop + popupDiv.scrollTop() + 'px');
                        });
                    });
                })
            },
            option_addTrade_popup () {
                $('.modalStylePop').css('bottom', 0 - $('.addCustomer .popup').scrollTop() - $(window).height() + 632 + 'px');
                $('.modalStylePop').css('top', $('.addCustomer .popup').scrollTop() - 55 + 'px');
                $('.addCustomer .popup').css('overflow', 'hidden');
                this.addTrade.ContentVisible = true;
            },
            query: function () {
                if (this.search === '') {
                    this.searchResult = '';
                    return false;
                };
                let searchData = {
                    name: this.search
                }
                myFn.ajax('get', searchData, apiAddress.tradeList.tradeList, (res) => {
                    this.searchResult = res.data;
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
                this.search = '';
                this.popupVisible = false;
                this.isfocus = false;
                this.searchResult = ''
            },
            go_Tname () {
                let data = {
                    id: this.sendId
                }
                if (data.id === '') {
                    alert('请选择分类')
                    return false;
                } else if (parseInt(data.id) === 0) {
                    if (this.inputContent === '') {
                        alert('请输入分类名称');
                        return false;
                    } else {
                        myFn.ajax('post', {pid: 0, name: [this.inputContent]}, apiAddress.customer.addTrade, (res) => {
                            this.addTradeNameValue.id = 0;
                            this.addTradeNameValue.name = this.inputContent;
                            this.addTrade.isShow = true;
                        })
                    }
                } else {
                    this.addTradeNameValue.id = this.sendId
                    this.addTradeNameValue.name = this.selectName;
                    this.addTrade.isShow = true;
                }
                $('.addCustomer .popup').css('overflow', 'scroll');
                // this.$router.push({name: 'addTname', params: {id: data.id}})
            },
            select () {
                this.sendId = this.selectId
                if (this.sendId === '0') {
                    this.wrapperVisible = true
                }
                for (var i = 0; i < this.list.length; i++) {
                    if (this.selectId === this.list[i].id) {
                        this.selectName = this.list[i].name
                    }
                }
            },
            closeVisable () {
                $('.addCustomer .popup').css('overflow', 'scroll');
                this.addTrade.ContentVisible = false
                this.wrapperVisible = true
            },
            loseFocus () {
                this.wrapperVisible = true
            },
            go_Page () {
                this.selectPageVal.trade_name = this.selected.name;
                this.selectPageVal.trade_id = this.selected.id;
                var data = {
                    trade_id: this.value,
                    id: this.selectPageVal.id
                }
                if (this.selectPageVal.id) {
                    myFn.ajax('post', data, apiAddress.customer.AddCustomer, (res) => {})
                };
                this.selectPageShow.selectPage = false;
            },
            findOut (item) {
                this.industry_item = item;
            },
            concelSelected () {
                this.selected.id = '';
                for (var i = 0; i < this.list.length; i++) {
                    for (var j = 0; j < this.list[i].list.length; j++) {
                        if (this.list[i].list[j].id === this.selected.id) {
                            alert(this.list[i].list[j].id)
                        };
                    };
                };
            }
        },
        components: {
            addTrade
        },
        props: ['selectPageShow', 'selectPageVal']
    }
</script>
<style>
    .selectPage .mint-radiolist-label{
        font-size: 14px;
        color: #666;
    }
    .selectPage .mint-radiolist-title {
        margin: 0;
        padding: 15px;
        background: #fff;
        font-size: 16px;
        color: #333;
    }
    .selectPage .mint-cell-wrapper {
        background-size: 120% 1px;
        background-position: -60% top;
    }
    .selectPage .mint-radiolist .mint-cell:first-of-type .mint-cell-wrapper{
        background-position: 20% top;
    }
    .selectPage .mint-radiolist .mint-cell:last-child {
        background-size: 120% 1px;
        background-position: -75% bottom;
    }
</style>
<style scoped>
    .selectPage {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        /* padding-bottom: 50px; */
    }
    .isShow {
        visibility: hidden; 
    }
    .selected {
        position: fixed;
        width: 100%;
        top: 50px;
        padding: 15px;
        color: #4a4a4a;
        background: #fff;
        z-index: 2;
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
    }
    .selected div img {
        width: 12px;
        margin-left: 7px;
    }
    select {
        border: solid 1px #ededed;
        border-radius:2px;
        width: 100%;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        padding-left: 10px;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        padding-right: 14px;
        background:  url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll 95% 45% transparent;
        background-color:#fafafa;
        color:#adadad;
    }
 
    select::-ms-expand { display: none; } 
 
    input{
       border: solid 1px #ededed;
       border-radius:2px;
       width: 100%;
       height: 34px;
       line-height: 34px;
       box-sizing: border-box;
       padding-left: 10px;
       appearance:none;
       -moz-appearance:none;
       -webkit-appearance:none;
       padding-right: 14px;
       background-color:#fafafa;
       color:#adadad;
   }
   :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #adadad; opacity:1; 
}
 
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #adadad;opacity:1;
}
 
input:-ms-input-placeholder{
    color: #adadad;opacity:1;
}
 
input::-webkit-input-placeholder{
    color: #adadad;opacity:1;}
    .searchPage{
        background: #fff;
        font-size: 12px;
    }
    .middle{
        height: 53px;
        line-height: 53px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        background: #fff;
    }
    .add{
        width: 50px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #ddd;
    }
    .list-style{
        display: flex;
        flex-direction: row;
        height: 68px;
        border-bottom: 1px solid #ddd;
        background:#fff;
    }
    .list-style:first-child{
        border-top: 1px solid #ddd;
    }
    .listImg{
        flex: 0 1 80px;
        box-sizing: border-box;
        padding: 5px 0 5px 10px;
    }
    .imgstyle{
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: #ddd;
    }
    .listContent{
        position: relative;
        flex: 1;
        padding: 10px 0;
    }
    .listContent span:first-child{
        position:absolute;
        left: 10px;
        top:10px;
    }
    .listContent span:nth-child(2){
        display: block;
        position:absolute;
        left: 10px;
        top:30px;
    }
    .listContent span:last-child{
        position:absolute;
        right: 10px;
        top:10px;
    }
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
    .listDetail{
        /*margin-top: 43px;*/
        position: relative;
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
    .mint-popup.classfiy {
        background: none;
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
    .buttonStyle{
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .buttonStyleFirst{
        position: fixed;
        color: #fff;
        background: #1b69fe;
        border-radius: 0;
        /*bottom: 0;*/
        /*top: 100px;*/
    }
    .buttonStyleSecond{
        background: #1b69fe;
        color: #fff;
        border-radius: 0;
    }
    .modalStylePop {
        position: absolute;
        top: -55px;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
    }
    .modalStyle{
        position: relative;
        top:20%;
        width: 90%;
        left: 50%;
        margin-left: -45%;
        height: 270px;
        background: #fff;
        border-radius: 5px;
        text-align: center;
    }
    .modalStyle-first-wrapper{
        padding: 20px 25px 42px 25px;
        box-sizing: border-box;
    }
    .modalStyle-title{
        color: #140d0d;
        display: inline-block;
        padding-bottom: 20px;
    }
    .icon-style{
        display: inline-block;
        float: left;
        color: red;
    }
    .modalStyle-text{
        color: #7a7a7a;
        display: block;
        text-align: left;
        margin-bottom: 15px;
    }
    .down-bottom{
        background: #1B69FE;
        color: #fff;
        box-shadow: none;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
    .input-style{
        margin-top: 25px;
    }
    .bottom-focus{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .go-down{
        margin-top:40px;
    }
</style>