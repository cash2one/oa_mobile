<template>
    <div class="home">
        <div class="message-list">
            <ul>
                <li @click="godetails(2)" v-show="notice.length >0">
                    <div class="message-wrapper">
                        <img src="../../assets/icons/announce.png" width="50">
                        <div>
                            <div class="message-content">
                                <div class="message-header">
                                    <!-- badge -->
                                    <span class="message-title">通知公告</span>
                                    <span class="message-date" v-html="notice_time.split(' ')[0].split('-')[1] + '月' + notice_time.split(' ')[0].split('-')[2] + '日'"></span>
                                </div>
                                <div class="message-body">
                                    <span class="message-desc" v-html="notice_title"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li @click="godetails(1)"  v-show="list1.length >0">
                    <div class="message-wrapper">
                        <img src="../../assets/icons/apply.png" width="50">
                        <div>
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="message-title">收到<span style="color:#f31212" v-html="applylength">3</span>个申请</span>
                                    <span class="message-date" v-html="applyTime.split(' ')[0].split('-')[1] + '月' + applyTime.split(' ')[0].split('-')[2] + '日'">9月4日</span>
                                </div>
                                <div class="message-body">
                                    <span class="message-desc" v-for="item in applyNum">[{{applyType[item.type]}}]</span>
                                    <!-- <span class="message-desc">[请假申请]</span>
                                    <span class="message-desc">[请假申请]</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="chat" v-for="(item, index) in chatlist" @click="goChat(item.uid, item.name)">
                    <div class="message-wrapper" :class="[item.not_read_num != 0 ? 'badge' : '']">
                        <img :src="item.image || '../assets/icon/head.png'" width="50">
                        <div>
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="message-title" v-html="item.name"></span>
                                    <span class="message-date" v-html="item.max_create_time.split(' ')[0].split('-')[1] + '月' + item.max_create_time.split(' ')[0].split('-')[2] + '日'"></span>
                                </div>
                                <div class="message-body">
                                    <span class="message-desc" v-html="item.msg"></span>
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
    import bus from '../../js/bus.js'
    export default {
        name: 'home',
        data () {
            return {
                list1: [],
                list2: [],
                applylength: 0,
                notice: [],
                notice_time: '',
                notice_title: '',
                userInfo: {},
                chatlist: [],
                applyType: {},
                applyTime: '',
                applyNum: []
            };
        },
        mounted () {
            window.document.title = 'OA';
            if (localStorage.userInfo) {
                this.userInfo = JSON.parse(localStorage.userInfo);
            };
            if (localStorage.applyType) {
                this.applyType = JSON.parse(localStorage.applyType);
            };
            this.getData(1, 1);
            bus.$on('msg', (e) => {
                if (Array.isArray(e)) {
                    this.chatlist = e;
                } else {
                    if (this.chatlist.length > 0) {
                        for (var i = 0; i < this.chatlist.length; i++) {
                            if (parseInt(this.chatlist[i].uid) === e.ruid) {
                                this.chatlist[i].msg = e.message;
                                this.chatlist[i].not_read_num = parseInt(this.chatlist[i].not_read_num) + 1;
                            }
                        }
                    } else {
                        this.chatlist.push(e)
                    }
                }
            })
            setTimeout(() => {
                // console.log('获取聊天列表')
                window.websocket.send(JSON.stringify({type: 7, user_id: 1}));
            }, 200)
        },
        methods: {
            getData: function (page, type) {
                var data = {};
                data.page = page || '';
                data.status = type || '';
                myFn.ajax('get', data, apiAddress.home.receivedList, (res) => {
                    this.list1 = res.data.data;
                    if (res.data.data[res.data.data.length - 1]) {
                        this.applyTime = res.data.data[res.data.data.length - 1].create_time;
                    };
                    // console.log(this.list1)
                    this.applylength += res.data.total;
                    for (var i = 0; i < this.list1.length; i++) {
                        if (this.applyNum.length < 3) {
                            this.applyNum.push(this.list1[i]);
                        };
                    };
                })
                myFn.ajax('get', {page: 1}, apiAddress.home.noticeList, (res) => {
                    this.notice = res.data.data
                    // console.log(this.notice)
                    if (res.data.data.length) {
                        if (res.data.data[0]) {
                            this.notice_time = res.data.data[0].create_time;
                        };
                        this.notice_title = res.data.data[0].title;
                    }
                })
            },
            godetails: function (key) {
                switch (key) {
                    case 1:
                        this.$router.push({name: 'applyList'});
                        break;
                    case 2:
                        this.$router.push({name: 'announcementList'});
                        break;
                }
            },
            goChat: function (aId, aName) {
                // console.log(aId, aName);
                localStorage.chat_obj = aName;
                this.$router.push({name: 'mailchat', params: {id: aId}});
            }
        },
        beforeDestroy () {
            bus.$off('msg');
        }
    };
</script>

<style>
    .home .mint-cell .mint-cell-wrapper {
        background-image: none;
        align-items: self-start
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    .message-wrapper {
        width: 100%;
        position: relative;
        height: 80px;
    }
    .message-wrapper > img,
    .message-wrapper > div {
        display: inline-block;
    }
    .message-wrapper > img {
        left: 0;
        margin: 15px;
        position: absolute;
        border-radius: 50%;
    }
    .message-wrapper > div {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding-left: 80px;
    }
    .message-list {
        margin-bottom: 55px;
    }
    .message-content {
        height: 79px;
        border-bottom: 1px solid #ededed;
    }
    .message-header {
        padding: 15px 15px 5px 0;
    }
    .message-body {
        padding-right: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .message-title {
        font-size: 16px;
        color: #333;
    }
    .badge {
        position: relative;
    }
    .badge:before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        background-color: #f31212;
        right: 15px;
        bottom: 15px;
    }
    .message-date {
        float: right;
        font-size: 12px;
        color: #999;
    }
    .message-desc {
        color: #6980AA;
        font-size: 14px;
    }
    .chat .message-desc {
        color: #999;
    }
    .left {
        left: 17px;
        margin-left: 0;
    }
    .fading-circle {
        height: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
    }
    .fading-circle > span {
        display: inline-block;
        vertical-align: bottom;
        padding-left: 5px;
    }
</style>
