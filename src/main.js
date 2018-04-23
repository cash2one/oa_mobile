// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './css/public_main.css'
import './css/public_reset.css'
import './font/iconfont.css'
import './css/icon.css'

import './js/zepto.js'
Vue.use(MintUI)

import {apiAddress} from './js/apiAddress.js'
import {myFn} from './js/main.js'

window.apiAddress = apiAddress
window.myFn = myFn;
window.polling = false;

var u = navigator.userAgent;
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
