<template>
    <div class="addCustomer">
        <mt-field class="headerImg" label="照片 / 企业LOGO / 头像"  disabled>
            <!-- <span class="uploadImgGroup" v-for="item in imgUrlList">
                <img :src="'/public' + item" @click="openWindow">
            </span>
            <div @click="openWindow" v-show="ishow" class="addPic"><i class="iconfont addPic-icon">&#xe60a;</i></div>
            <input type="file" id="selectImg" @change="slelectImg"/> -->

            <div v-if="is_wx==2">
                <span v-if="previewImgUrl.length" class="uploadImgGroup">
                    <img :src="previewImgUrl[0]" @click="openWindow">
                </span>
                <div class="addPic" v-if="!previewImgUrl.length" @click="openWindow">
                    <i class="iconfont addPic-icon">&#xe60a;</i>
                </div>
            </div>
            <div v-if="is_wx==1">
                <span class="uploadImgGroup" v-for="item in imgUrlList">
                    <img :src="item" @click="openWindow">
                </span>
                <div @click="openWindow" v-show="ishow" class="addPic"><i class="iconfont addPic-icon">&#xe60a;</i></div>
                <input type="file" id="selectImg" @change="slelectImg"/>
            </div>
        </mt-field>
        <mt-field label="姓名"  type="text" v-model="info.name"></mt-field>
        <mt-field label="性别" class="selectInput">
            <select v-model="sex_text">
                <option value="1">男</option>
                <option value="2">女</option>
            </select>
        </mt-field>
        <mt-field label="电话" type="text" v-model="info.phone"></mt-field>
        <mt-field label="公司" type="text" v-model="info.company" placeholder="请输入公司名称"></mt-field>
        <mt-field label="职位" type="text" v-model="info.position"></mt-field>
        <mt-field label="地址" type="text" v-model="info.address"></mt-field>
        <mt-field label="邮箱"  type="text" v-model="info.email" placeholder="请输入邮箱"></mt-field>
        <p class="title"><span>备注</span></p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="info.remark"></textarea>
        </div>
        <div class="btn-wrapper">
            <button class="my-btn" @click="go_Management">保存</button>
        </div>
    </div>
</template>
<script>
    import circleUploadingAdd from '../tools/circleUploading_add'
    import wx from 'weixin-js-sdk'

    export default {
        name: 'addCustomer',
        data () {
            return {
                ishow: true,
                imgUrlList: [],
                info: {
                    name: '',
                    listImg: {},
                    sex: '0',
                    phone: '',
                    birthday: '',
                    company: '',
                    position: '',
                    address: '',
                    email: ''
                },
                is_wx: 1,
                previewImgUrl: [],
                serverId: '',
                popup_sex: false,
                slots: [
                    {
                        flex: 1,
                        values: []
                    }
                ],
                sex_text: 0,
                isShowNotice: false,
                id: 0,
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: ''
            }
        },
        mounted () {
            if (parseInt(window.uploadtype) === 2) {
                this.is_wx = 2;
            }
            this.id = this.$route.params.id;
            this.getUserInfo();
            var url = location.href.split('#')[0];
            // this.wxConfig(url);
            myFn.ajax('get', {url: url}, apiAddress.wx.config, (res) => {
                console.log(res.data);
                res.data.debug = false;
                wx.config(res.data);
            })
        },
        methods: {
            onValuesChange (picker, values) {
                if (values[0]) {
                    this.info.sex = values[0].value;
                    this.sex_text = values[0].sex;
                }
            },
            getUserInfo () {
                myFn.ajax('get', {id: this.id}, apiAddress.customer.customerInfo, (res) => {
                    this.info = res.data;
                    console.log(this.info)
                    this.imgUrlList = res.data.image;
                    this.previewImgUrl = res.data.image;
                    this.sex_text = res.data.sex;
                })
            },
            openPicker (key) {
                console.log(key)
                this.thisTimeSelect = key;
                this.$refs.picker.open();
            },
            set_Time (date) {
                this[this.thisTimeSelect] = myFn.getTime(date);
                console.log(this[this.thisTimeSelect])
                if (this[this.thisTimeSelect][1]) {
                    this.isShowNotice = true
                }
            },
            slelectImg () {
                var imgObj = document.getElementById('selectImg').files[0];
                var imgUrl = window.URL.createObjectURL(imgObj);
                this.imgUrlList[0] = imgUrl;
                this.info.listImg = imgObj;
                console.log(this.imgUrlList)
                this.ishow = false;
            },
            openWindow () {
                if (parseInt(this.is_wx) === 1) {
                    if (this.readonly !== undefined) {
                        return false;
                    }
                    document.getElementById('selectImg').click();
                } else {
                    var self = this;
                    wx.chooseImage({
                        // 默认9
                        count: 1,
                        // 可以指定是原图还是压缩图，默认二者都有
                        sizeType: ['original', 'compressed'],
                        // 可以指定来源是相册还是相机，默认二者都有
                        sourceType: ['album', 'camera'],
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        success: function (res) {
                            var localIds = res.localIds;
                            if (window.__wxjs_is_wkwebview) {
                                wx.getLocalImgData({
                                    localId: localIds[0],
                                    success: function (result) {
                                        self.previewImgUrl.unshift(result.localData);
                                    }
                                })
                            } else {
                                self.previewImgUrl = res.localIds;
                            }
                            wx.uploadImage({
                                // 需要上传的图片的本地ID，由chooseImage接口获得
                                localId: localIds.toString(),
                                // 默认为1，显示进度提示
                                isShowProgressTips: 1,
                                success: function (res) {
                                    // 返回图片的服务器端ID
                                    self.serverId = res.serverId;
                                    // console.log(serverId)
                                    // alert('上传成功')
                                }
                            });
                        }
                    });
                }
                /* if (this.readonly !== undefined) {
                    return false;
                }
                document.getElementById('selectImg').click(); */
            },
            go_Management () {
                var form = new FormData();
                form.append('name', this.info.name);
                form.append('id', this.id)
                form.append('sex', this.info.sex)
                form.append('phone', this.info.phone);
                form.append('company', this.info.company);
                form.append('position', this.info.position);
                form.append('address', this.info.address);
                form.append('email', this.info.email);
                form.append('remark', this.info.remark);
                // form.append('image[]', this.info.listImg);
                // form.append('uploadtype', 1);
                if (parseInt(this.is_wx) === 1) {
                    form.append('image[]', this.info.listImg);
                    form.append('uploadtype', 1);
                } else {
                    form.append('image[]', this.serverId);
                    form.append('uploadtype', 2);
                }
                if (form.get('image[]') === undefined || form.get('image[]') === 'undefined') {
                    form.delete('image[]');
                    // form.append('image', '');
                }
                myFn.uploadImg(form, apiAddress.customer.AddCustomer, (res) => {
                    /* this.$router.push({name: 'customerDetails'}) */
                    this.$router.back();
                });
            },
            wxConfig (url) {
                myFn.ajax('get', {url: url}, apiAddress.wx.JSSDK, (res) => {
                    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    wx.config({
                        debug: true,
                        // 必填，公众号的唯一标识
                        appId: res.data.appId,
                        // 必填，生成签名的时间戳
                        timestamp: res.data.timestamp,
                        // 必填，生成签名的随机串
                        nonceStr: res.data.nonceStr,
                        // 必填，签名，见附录1
                        signature: res.data.signature,
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        jsApiList: res.data.jsApiList
                    });
                })
            }
        },
        components: {
            circleUploadingAdd
        }
    };
</script>

<style>
    .addCustomer .headerImg .mint-field-core {
        display: none;
    }
    .addCustomer .headerImg .mint-field-other {
        position: absolute;
        top: -20px;
    }
    .addCustomer .mint-field .mint-field-core {
        font-size: 15px;
        color: #4d4d4d;
    }
    .addCustomer .mint-cell:first-child .mint-cell-wrapper{
        height: 90px;
    }
    .addCustomer .mint-field .mint-cell-title{
        font-size: 15px;
        color: #4d4d4d;
    }
    .addCustomer .mint-field:nth-child(1) .mint-cell-title{
        width: 200px;
    }
    .addCustomer .mint-cell-wrapper {
        background-size: 120% 1px;
        background-position: top;
    }
    .addCustomer .mint-field .mint-cell-value {
        text-align: right;
        position: relative;
        height: 15px;
        font-size: 15px;
    }
    .addCustomer .industry .mint-field-core {
        display: none;
    }
    .addCustomer .industry .mint-field-other {
        position: absolute;
        display: inline-block;
        right: 5px;
    }
    .addCustomer .mint-popup.sex {
        width: 100%;
    }
</style>

<style scoped>
    .title {
        padding: 25px 15px 15px;
        background-color: #f7f7f7;
    }
    .title span {
        display: inline-block;
        line-height: 1.0;
        width: 100%;
        border-left: 3px solid #1B69FE;
        padding-left: 6px;
    }
    .cell {
        position: relative;
        line-height: 55px;
        /* display: flex; */
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 0;
    }
    .cell:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #d9d9d9;
        transform: rotateX(60deg);
    }
    .cell .label {
        display: inline-block;
        width: 105px;
        font-size: 15px;
    }
    .cell .sex {
        color: inherit;
        text-align: left;
        font-size: 15px;
        display: inline-block;
        width: calc(100% - 105px);
        padding-left: 7px;
        box-sizing: border-box;
    }
    .selectValue {
        color: #4a4a4a;
        font-size: 13px;
    }
    .addCustomer{
        background: #fff;
        font-size: 13px;
        color: #4d4d4d;
    }
    .addPic{
        opacity: 0;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 30px;
        background: #f7f7f7;
        border: 1px dashed #ddd; 
    }
    .addPic:after{
        display: block; 
        content: '';
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size:20px;
    }
    .message-wrapper{
        font-size: 13px;
        color: #4d4d4d;
    }
    .from-textarea{
        padding: 0;
        margin-bottom: -13px;
    }
    .from-textarea .from-textarea-val{
        width: 100%;
        height: 100%;
        border: none;
        padding: 15px;
        margin-top: 0px;
        /*border-bottom: 1px #dedede solid;*/
        background: #fff;
        box-sizing: border-box;
        font-size: 16px;
    }
     .from-textarea-title{
        color: #4d4d4d;
    }
    .mt-button-style{
        border-radius: 0;
        font-size: 13px;
        background: #1b69fe;
        color: #fff;
    }
    .uploadImgGroup {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 30px;
    }
    .uploadImgGroup img {
        width: 50px;
        height: 50px;
        border-radius: 30px;
    }
    .uploadImgIcon {
        width: 50px;
        height: 50px;
        border-radius: 30px;
        border:1px dashed #ddd;
    }
    #selectImg {
        display: none;
    }
    .addPic{
        text-align: center;
        width: 50px;
        height: 50px;
        border-radius: 30px;
        background: #f7f7f7;
        border: 1px dashed #ddd; 
    }
    .addPic-icon{
        display: block; 
        content: '';
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size:20px;
    }
    .btn-wrapper {
        padding: 30px 0;
        background-color: #f7f7f7;
    }
    .my-btn {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 80%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        display: block;
        margin: auto;
        font-size: 17px;
    }
</style>