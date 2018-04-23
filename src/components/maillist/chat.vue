<template>
    <div class="chat">
        <div class="chat-window">
            <ul class="message-area" id="message-area">
                <li v-for="item in chatList">
                    <div class="message" v-if="item.send_uid == aId || item.uid == aId">
                        <div class="time" v-html="item.send_time">09-02 14:00:00</div>
                        <div class="chat-content">
                            <div class="chat-avatar their">
                                <img :src="objHeadImg || require('../../assets/icon/jack.png')">
                            </div>
                            <div class="chat-text-left">
                                <div class="chat-left-box">
                                    <span class="single"></span>
                                    <p v-html="item.message"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="message" v-if="item.send_uid == userInfo.id || item.uid == userInfo.id">
                        <div class="time" v-html="item.send_time">09-02 14:00:00</div>
                        <div class="chat-content">
                            <div class="chat-avatar mine">
                                <img :src="userInfo.image || require('../../assets/icon/head.png')">
                            </div>
                            <div class="chat-text-right">
                                <div class="chat-right-box">
                                    <span class="single"></span>
                                    <p v-html="item.message"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="send-wrapper">
                <span @click="sendMsg()">发送</span>
                <div>
                    <input type="text" id="chat-input" @keyup.13="sendMsg()" @click="inputClick" @blur="inputBlur" @focus="inputFocus" v-model="sendMsgValue">
                    <input type="text" id="ios-input">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../../js/bus.js'
    export default {
        name: 'chat',
        data () {
            return {
                sendMsgValue: '',
                userInfo: {},
                aId: '',
                chatList: [],
                is_IOS: '',
                objHeadImg: ''
            }
        },
        mounted () {
            this.is_IOS = this.is_weixin();
            document.getElementById('message-area').style.height = (document.documentElement.clientHeight - 49) + 'px'; // 设置聊天窗口高度
            this.userInfo = JSON.parse(localStorage.userInfo); // 获取自己的用户信息
            window.document.title = localStorage.chat_obj; // 设置聊天对象名称
            this.aId = this.$route.params.id; // 获取聊天对象ID
            this.getObjImg(); // 获取聊天对象头像
            var self = this;
            setTimeout(() => {
                window.inroom = true;
                self.getHistory(); // 获取历史消息
                self.getNotRead(); // 获取未读消息
            }, 200)
            bus.$on('onmessage', (e) => {
                var res = JSON.parse(e.data);
                if (!window.inroom) return false;
                switch (JSON.parse(e.data).code) {
                    case 201: // 发送消息回调
                        // console.log(res)
                        if (parseInt(res.data.type) === 2) {
                            self.sendMsgValue = ''; // 回调成功清楚输入内容
                            self.chatList.push(res.data); // 数据push进列表
                            self.scroll_bottom(); // 新数据插入滚动到底部
                        } else {
                            [res.data.ruid, res.data.uid] = [res.data.uid, res.data.ruid]
                            self.getNotRead();
                        }
                        break;
                    case 202: // 获取未读消息回调
                        self.chatList = self.chatList.concat(res.data); // 数据push进列表
                        self.scroll_bottom(); // 新数据插入滚动到底部
                        // console.log(res)
                        break;
                    case 204: // 加载已读消息回调
                        self.chatList = self.chatList.concat(res.data.list.data.reverse())
                        self.scroll_bottom(); // 新数据插入滚动到底部
                        break;
                    case 10000: // 错误回调
                        console.log(res);
                        break;
                }
            })
        },
        methods: {
            sendMsg () {
                var data = {
                    type: 2,
                    user_id: this.aId,
                    data: this.sendMsgValue
                }
                if (this.sendMsgValue === '') {
                    alert('发送内容为空！')
                    return false;
                }
                window.websocket.send(JSON.stringify(data))
            },
            getHistory () {
                var data = {type: 5, user_id: this.aId}
                window.websocket.send(JSON.stringify(data))
            },
            getNotRead () {
                var data = {type: 3, user_id: this.aId}
                window.websocket.send(JSON.stringify(data))
            },
            scroll_bottom () {
                this.$nextTick(function () {
                    var h = document.getElementById('message-area').scrollHeight;
                    $('#message-area').scrollTop(h);
                });
            },
            getObjImg () {
                myFn.ajax('get', {id: this.aId}, apiAddress.mail.details, (res) => {
                    this.info = res.data;
                    this.objHeadImg = res.data.headimgurl;
                })
            },
            is_weixin () {
                var u = navigator.userAgent;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isIOS) {
                    return true;
                } else {
                    return false;
                }
            },
            inputFocus () { // ios 底部input框被盖住的问题
                var str = navigator.userAgent.toLowerCase();
                var ver = str.match(/cpu iphone os (.*?) like mac os/);
                var version = parseInt(ver[1].replace(/_/g, '.'))
                if (this.is_IOS) {
                    if (version > 10) {
                        var obj = document.querySelector('.send-wrapper')
                        setInterval(() => {
                            obj.style.position = 'absolute';
                            obj.style.bottom = '0';
                        }, 100)
                    } else {
                        setTimeout(res => {
                            document.body.scrollTop = document.body.scrollHeight;
                            document.querySelector('.send-wrapper').scrollIntoView(true);
                        }, 500);
                    }
                }
            },
            inputBlur () {
                if (this.is_IOS) {
                    document.getElementById('ios-input').focus();
                    setTimeout(res => {
                        document.getElementById('ios-input').blur();
                    }, 100)
                }
            },
            inputClick () {
                if (this.is_IOS) {
                    setTimeout(() => {
                        document.getElementById('ios-input').focus();
                        setTimeout(res => {
                            document.getElementById('chat-input').focus();
                        }, 100)
                    }, 300)
                }
            }
        },
        beforeDestroy () {
            window.inroom = false;
            bus.$off('onmessage');
        }
    }
</script>
<style>

</style>
<style scoped>
    /* .footerNav {
        display: none;
    } */
    .chat {
        height: 100%;
    }
    .message {
        margin-bottom: 15px;
    }
    .message-area {
        box-sizing: border-box;
        padding: 25px 15px 30px;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .time {
        width: 130px;
        height: 24px;
        margin: auto;
        border-radius: 30px;
        background: #f0f0f0;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        color: #878787;
        margin-bottom: 10px;
    }
    .chat-avatar {
        width: 40px;
        height: 40px;
    }
    .chat-avatar img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .their {
        float: left;
        margin-right: 10px;
    }
    .mine {
        float: right;
        margin-left: 10px;
    }
/*    .chat-text-left {
        width: 100%;
        padding-left: 53px;
        box-sizing: border-box;
    }*/
    .chat-left-box,.chat-right-box{
        display: inline-block;
        box-sizing: border-box;
        word-wrap:break-word;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        padding: 15px;
        background: #fff;
        color: #757575;
        font-size: 14px;
        position: relative;
    }
    .chat-text-right, .chat-text-left {
        width: 100%;
        padding-left: 53px;
        padding-right: 53px;
        box-sizing: border-box;
    }
    .chat-text-right {
        text-align: right;
    }
    .single {
        display: block;
        border-width: 10px;
        position: absolute;
        top: 8px;
        border-style: solid;
        font-size: 0;
        line-height: 0;
    }
    .single:before {
        content: "";
        display: block;
        border-width: 10px;
        position: absolute;
        top: -10px;
        border-style: solid;
        font-size: 0;
        line-height: 0;
        position: absolute;
    }
    .chat-left-box .single {
        left: -20px;
        border-color: transparent #e6e6e6 transparent transparent;
    }
    .chat-left-box .single:before {
        left: -9px;
        border-color: transparent #fff transparent transparent;
    }
    .chat-right-box .single {
        right: -20px;
        border-color: transparent transparent transparent #e6e6e6;
    }
    .chat-right-box .single:before {
        right: -9px;
        border-color: transparent transparent transparent #fff;
    }
    .chat-right-box p {
        text-align: left;
    }
    .send-wrapper {
        width: 100%;
        bottom: 0;
        padding: 7px 0px;
        padding-left: 10px;
        background: #fff;
        height: 49px;
        box-sizing: border-box;
    }
    .send-wrapper div {
        width: 100%;
        box-sizing: border-box;
        display: inline-block;
        padding-right: 82px;
    }
    .send-wrapper input {
        height: 35px;
        background: #dedede;
        border: 0;
        width: 100%;
        box-sizing: border-box;
        display: inline-block;
        border-radius: 5px;
        text-indent: 7px;
        color: #333;
    }
    .send-wrapper span {
        display: inline-block;
        padding: 0 20px;
        font-size: 16px;
        line-height: 35px;
        color: #878787;
        font-size: 16px;
        position: absolute;
        right: 0;
        z-index: 99999;
    }
    .send-wrapper > div {
        position: relative;
    }
    #ios-input {
        position: absolute;
        width: 100px;
        left: -120px;
        top: 0;
    }
</style>