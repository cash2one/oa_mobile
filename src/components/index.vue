<template>
    <div class="index">
        <router-view></router-view>
        <!-- <keep-alive>
        </keep-alive> -->
        <router-view name="footerNav" ref="footer"></router-view>
    </div>
</template>
<script>
    import bus from '../js/bus.js'
    export default {
        name: 'index',
        data () {
            return {
                messageList: [{
                    aId: '',
                    alist: [1]
                }]
            }
        },
        beforeRouteEnter (to, from, next) {
            myFn.wxlogin();
            if (!localStorage.userInfo) return;
            next();
        },
        mounted () {
            window.inroom = false;
            window.websocket = '';
            this.creatSocket()
        },
        methods: {
            creatSocket () {
                var self = this;
                var wsServer = 'ws://120.25.225.119:9501';
                window.websocket = new WebSocket(wsServer);
                window.websocket.onopen = function (evt) {
                    window.websocket.send(JSON.stringify({
                        type: 1,
                        user_id: JSON.parse(localStorage.userInfo).id
                    }));
                    window.ws_isOpen = true;
                    window.ws_isOpen_footer = true;
                    // console.log(window.ws_isOpen)
                    console.log('打开' + evt);
                };
                window.websocket.onclose = function (evt) {
                    window.websocket = '';
                    self.creatSocket()
                    console.log(evt);
                };
                window.websocket.onmessage = function (evt) {
                    if (parseInt(JSON.parse(evt.data).code) === 10000) {
                        window.websocket.close();
                    }
                    bus.$emit('onmessage', evt)
                };
            }
        }
    }
</script>

<style scoped>
    .index{
        height: 100%;
    }
</style>