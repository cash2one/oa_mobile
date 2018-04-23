
var myFn = {
    ajax: function (type, data, url, sucFn) {
        sucFn = sucFn || function () {};
        $.ajax({
            url: '/public' + url,
            type: type,
            data: data,
            cache: true,
            timeout: 30000,
            dataType: 'json',
            success: function (res, textStatus, XMLHttpRequest) {
                // window.myFn.option_loading();
                window.myFn.statusCode(res, sucFn);
            },
            error: function () {
                console.log('网络错误');
            }
        });
    },
    // 服务器返回状态
    statusCode: function (res, sucFn) {
        switch (parseInt(res.code)) {
            case 200:
                sucFn(res);
                break;
            case 99994:
                window.vm.$router.push({name: 'statePage', params: {type: 3}});
                break;
            case 99995:
                // 高级授权
                this.getWxCode('99995');
                break;
            case 99996:
                // 普通授权
                this.getWxCode('99996')
                break;
            case 99997:
                // 未注册
                window.vm.$router.push('/login');
                break;
            case 99999:
                localStorage.removeItem('userInfo');
                window.myFn.wxlogin()
                break;
            case 10000:
                alert(res.msg)
                break;
            default:
                alert(res.msg);
                break;
        }
    },
    // 获取wxCode
    getWxCode: function (type) {
        // location.href = location.protocol + '//' + location.hostname + ':10081/public' + window.apiAddress.wx.getCode + '?redirect_uri=' + escape(location.protocol + '//' + location.hostname + ':10081/') + '&state=' + type + '&other=' + escape(location.hash);
        location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/public' + window.apiAddress.wx.getCode + '?redirect_uri=' + escape(location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/') + '&state=' + type + '&other=' + escape(location.hash);
    },
    wxlogin: function () {
        if (window.myFn.isWechat() && !localStorage.userInfo) {
            var data = {
                code: '',
                state: ''
            }
            if (myFn.GetQueryString('code')) {
                data.code = myFn.GetQueryString('code');
                data.state = myFn.GetQueryString('state');
            } else {
                data.code = 0;
            }
            myFn.ajax('get', data, apiAddress.wx.login, function (res) {
                localStorage.userInfo = JSON.stringify(res.data);
                location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/#/index/home';
                // location.href = location.protocol + '//localhost:10081/#/index/home';
            });
        }
    },
    // 获取get参数
    GetQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return '';
    },
    isWechat: function () {
        var ua = window.navigator.userAgent.toLowerCase()
        if (ua.indexOf('micromessenger') > -1) {
            return true
        }
        return false
    },
    uploadImg: function (form, url, sucFn) {
        $.ajax({
            url: '/public' + url,
            type: 'post',
            data: form,
            processData: false,
            contentType: false,
            success: function (res) {
                window.myFn.statusCode(res, sucFn);
            }
        });
    },
    toastMiddle: function (text) {
        window.vm.$toast({
            message: text,
            position: 'middle',
            duration: 2000
        });
    },
    setUserInfo: function (key, val) {
        var data = {}
        data = JSON.parse(localStorage.userInfo);
        data[key] = val;
        localStorage.userInfo = JSON.stringify(data);
    },
    getToday (type) {
        var current = new Date();
        var year = current.getFullYear();
        var month = (current.getMonth() + 1) > 9 ? (current.getMonth() + 1) : '0' + (current.getMonth() + 1);
        var day = current.getDate() > 9 ? current.getDate() : '0' + current.getDate();
        var today = year + '-' + month + '-' + day;
        if (type === 'month') {
            return year + '-' + month
        } else {
            return today;
        }
    },
    getTime: function (t) {
        var time = [];
        time[0] = t.getFullYear();
        time[1] = t.getMonth() + 1;
        time[2] = t.getDate();
        return [time[0] + '年' + time[1] + '月' + time[2] + '日', time[0] + '/' + time[1] + '/' + time[2]];
    },
    option_loading: function () {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
    },
    clase_loading: function () {
        Indicator.close();
    },
    storageLog: function (userId, aId, aName, mes) {
        var chatlog = []
        if (!localStorage.chatlog) {
            localStorage.chatlog = [];
            chatlog = [];
        } else {
            chatlog = JSON.parse(localStorage.chatlog);
        }
        hasUserId(chatlog, userId);
        for (var i in chatlog) {
            if (chatlog[i].userId === parseInt(userId)) {
                hasAId(chatlog[i].list, aName, aId);
                for (var x in chatlog[i].list) {
                    if (chatlog[i].list[x].aId === parseInt(aId)) {
                        if (mes !== undefined) {
                            chatlog[i].list[x].alist.push(mes);
                            localStorage.chatlog = JSON.stringify(chatlog);
                        }
                        return chatlog[i].list[x].alist;
                    }
                }
            }
        }
        // 是否有当前用户聊天记录容器
        function hasUserId (list, id) {
            for (var i in list) {
                if (list[i].userId === parseInt(id)) {
                    return true;
                }
            }
            list.push({userId: parseInt(id), list: []});
        }
        // 是否有当前用户对话记录
        function hasAId (list, aName, id) {
            for (var i in list) {
                if (list[i].aId === parseInt(id)) {
                    return true;
                }
            }
            list.push({aId: parseInt(id), aName: aName, alist: []});
        }
    }
}
export { myFn }
