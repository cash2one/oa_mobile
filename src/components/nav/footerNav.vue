<template>
    <div class="footerNav">
        <mt-tabbar v-model="selected" fixed @input='go_page'>
            <mt-tab-item id="1" class="message" :class="[selected == 1?'is-selected':'']">
                <img class="nav-icon" src="../../assets/nav/message.png" v-if="selected != 1">
                <img class="nav-icon" src="../../assets/nav/message_select.png" v-if="selected == 1">
                <div class="mas_satic" v-show="is_showMas"></div>
                消息
            </mt-tab-item>
            <mt-tab-item id="2" :class="[selected == 2?'is-selected':'']">
                <img class="nav-icon" src="../../assets/nav/maillist.png" v-if="selected != 2">
                <img class="nav-icon" src="../../assets/nav/maillist_select.png" v-if="selected == 2">
                通讯录
            </mt-tab-item>
            <mt-tab-item id="3" :class="[selected == 3?'is-selected':'']">
                <img class="nav-icon" src="../../assets/nav/work.png" v-if="selected != 3">
                <img class="nav-icon" src="../../assets/nav/work_select.png" v-if="selected == 3">
                工作
            </mt-tab-item>
            <mt-tab-item id="4" :class="[selected == 4?'is-selected':'']">
                <img class="nav-icon" src="../../assets/nav/center.png" v-if="selected != 4">
                <img class="nav-icon" src="../../assets/nav/center_select.png" v-if="selected == 4">
                个人中心
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>


<script>
    import bus from '../../js/bus.js'
    export default {
        name: 'footerNav',
        data () {
            return {
                selected: '1',
                is_showMas: false
            }
        },
        mounted () {
            this.setSelect();
            var self = this;
            bus.$on('onmessage', (e) => {
                var response = JSON.parse(e.data);
                // console.log(response)
                switch (parseInt(response.code)) {
                    case 201:
                        self.set_static(true);
                        if (parseInt(response.data.type) === 1) {
                            bus.$emit('msg', response.data)
                        }
                        break;
                    case 205:
                        var size = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            if (parseInt(response.data[i].not_read_num) !== 0) {
                                size++;
                            }
                        }
                        if (size > 0) {
                            self.set_static(true);
                        }
                        if (self.$route.path === '/index/home') {
                            bus.$emit('msg', response.data)
                        }
                        break;
                }
            })
        },
        methods: {
            go_page: function (id) {
                var index = parseInt(id);
                var goName = '';
                switch (index) {
                    case 1: goName = 'index'; break;
                    case 2: goName = 'maillist'; break;
                    case 3: goName = 'work'; break;
                    case 4: goName = 'center'; break;
                }
                this.$router.push({name: goName});
            },
            setSelect () {
                switch (this.$route.path) {
                    case '/index/home':
                        this.selected = 1;
                        break;
                    case '/index/maillist':
                        this.selected = 2;
                        break;
                    case '/index/work':
                        this.selected = 3;
                        break;
                    case '/index/center':
                        this.selected = 4;
                        break;
                }
            },
            set_static (bo) {
                if (bo) {
                    this.is_showMas = true;
                } else {
                    this.is_showMas = false;
                }
            }
        },
        watch: {
            '$route': function () {
                this.setSelect();
            }
        },
        beforeDestroy () {
            bus.$off('msg');
            bus.$off('onmessage');
        }
    }
</script>

<style>
    .footerNav .mint-tab-item {
        color: #6980AA;
        padding: 5px 0;
        padding-top: 7px;
    }
    .footerNav .mint-tabbar > .mint-tab-item.is-selected {
        color: #1B69FE;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav-icon {
        display: block;
        font-size: 14px;
        margin-bottom: 3px;
        width: 18px;
        height: 18px;
        margin: auto;
        padding-bottom: 7px;
    }
    .nav-icon img {
        padding: 2px;
    }
    .mint-tabbar {
        background: #f7f7f7;
        border-top: 1px solid #d4d4d4;
    }
    .message {
        position: relative;
    }
    .mas_satic {
        position: absolute;
        background: red;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        right: 32%;
        top: 11%;
    }
</style>
