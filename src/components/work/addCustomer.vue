<template>
	<div class="addCustomer">
        <div>
    		<mt-field class="headerImg" label="照片 / 企业LOGO / 头像" disabled>
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
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="info.name"></mt-field>
            <mt-field label="性别" class="selectInput">
                <select v-model="info.sex">
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
            </mt-field>
            <mt-field label="电话" placeholder="请输入联系电话" type="number" v-model="info.phone"></mt-field>
            <mt-field label="生日" class="startTime" v-model="info.birthday" type="date" style="margin-bottom: 10px;"></mt-field>
    		<mt-field label="公司" placeholder="请输入公司名称" type="text" class="bg-none" v-model="info.company"></mt-field>
    		<mt-field label="职位" placeholder="请输入职位名称" type="text" v-model="info.position"></mt-field>
            <mt-field label="地址" placeholder="请输入联系地址" type="text" v-model="info.address"></mt-field>
    		<mt-field label="邮箱" placeholder="请输入联系邮箱" type="text" v-model="info.email" style="margin-bottom: 10px;"></mt-field>
    		<mt-field label="所在行业" v-model="info.trade_name" disabled class="industry bg-none" >
                <p v-if="info.trade_name" v-html="info.trade_name" class="selectValue border-t" @click="go_select"></p>
                <div class="message-wrapper" v-if="!info.trade_name">
                    <span @click="go_select">请选择</span>
                </div>
    		</mt-field>
            <mt-field label="分类"  v-model="info.classifyName" disabled class="industry" style="margin-bottom: 10px;">
                <p v-if="info.classifyName" v-html="info.classifyName" @click="go_classifyID" class="selectValue"></p>
                <div class="message-wrapper" v-if="!info.classifyName">
                    <span @click="go_classifyID">请选择</span>
                </div>
            </mt-field>
    		<div class="from-textarea">
                <p class="from-textarea-title">备注</p>
                <textarea class="from-textarea-val" rows="5" v-model="info.remark" placeholder="请输入备注信息"></textarea>
            </div>
            <!-- <div>
                <mt-button size="large" class="mt-button-style" @click="go_Management">完成</mt-button>
            </div> -->
            <div class="btn-wrapper">
                <button class="my-btn" @click="go_Management">保存</button>
            </div>
        </div>
        <mt-popup class="popup tname" v-model="is_show_popup.selectPage" position="right">
            <select-page :selectPageShow="is_show_popup" :selectPageVal="info" position="right"></select-page>
        </mt-popup>
        <mt-popup class="popup" v-model="is_show_popup.selectStatus" position="right">
            <select-status :selectStatusShow="is_show_popup" :selectStatusVal="info" position="right"></select-status>
        </mt-popup>
	</div>
</template>
<script>
    import circleUploadingAdd from '../tools/circleUploading_add'
    import selectPage from './selectPage'
    import selectStatus from './selectStatus'
    import wx from 'weixin-js-sdk'

    export default {
        name: 'addCustomer',
        data () {
            return {
                ishow: true,
                imgUrlList: [],
                info: {
                    name: '',
                    listImg: [],
                    sex: '1',
                    phone: '',
                    birthday: '',
                    company: '',
                    position: '',
                    address: '',
                    email: '',
                    trade_id: '',
                    trade_name: '',
                    classifyID: '',
                    classifyName: '',
                    remark: ''
                    // tagID: '',
                    // tagName: '',
                },
                is_show_popup: {
                    selectPage: false,
                    selectStatus: false
                },
                isShowNotice: false,
                id: 0,
                // 微信图片上传
                previewImgUrl: [],
                serverId: '',
                is_wx: 1,
                popup_sex: false,
                slots: [
                    {
                        flex: 1,
                        values: []
                    }
                ],
                sex_text: '请选择性别',
                bool: false
            }
        },
        mounted () {
            document.body.style.minHeight = '100%';
            if (parseInt(window.uploadtype) === 2) {
                this.is_wx = 2;
            }
            var url = location.href.split('#')[0];
            myFn.ajax('get', {url: url}, apiAddress.wx.config, (res) => {
                console.log(res.data);
                res.data.debug = false;
                wx.config(res.data);
            })
            this.info.birthday = myFn.getToday();
        },
        methods: {
            slelectImg () {
                var imgObj = document.getElementById('selectImg').files[0];
                var imgUrl = window.URL.createObjectURL(imgObj);
                this.imgUrlList[0] = imgUrl;
                this.info.listImg = imgObj;
                console.log(JSON.stringify(imgObj), 111)
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
            },
            go_birth () {
                this.$router.push({name: 'birthdayRemind'})
            },
            go_select () {
                this.is_show_popup.selectPage = true;
                document.body.classList.add('prohibitOverflow')
            },
            go_classifyID () {
                this.is_show_popup.selectStatus = true;
                document.body.classList.add('prohibitOverflow')
                document.documentElement.classList.add('overflow-y')
            },
            go_Management () {
                var form = new FormData();
                form.append('name', this.info.name);
                form.append('id', this.id)
                form.append('sex', this.info.sex)
                form.append('phone', this.info.phone);
                form.append('birthday', this.info.birthday);
                form.append('company', this.info.company);
                form.append('position', this.info.position);
                form.append('address', this.info.address);
                form.append('email', this.info.email);
                form.append('trade_id', this.info.trade_id);
                form.append('remark', this.info.remark);
                form.append('classify_id', this.info.classifyID);
                if (parseInt(this.is_wx) === 1) {
                    form.append('image[]', this.info.listImg);
                    form.append('uploadtype', 1);
                } else {
                    form.append('image[]', this.serverId);
                    form.append('uploadtype', 2);
                }
                if (!this.bool) {
                    this.bool = !this.bool;
                    setTimeout(res => {
                        this.bool = !this.bool;
                    }, 2000)
                    myFn.uploadImg(form, apiAddress.customer.AddCustomer, (res) => {
                        alert('添加成功')
                        localStorage.removeItem('addCustomerData');
                        this.$router.back(-1);
                    });
                }
            }
        },
        watch: {
            'is_show_popup.selectPage': function () {
                if (!this.is_show_popup.selectPage) {
                    document.body.classList.remove('prohibitOverflow')
                }
            },
            'is_show_popup.selectStatus': function () {
                if (!this.is_show_popup.selectStatus) {
                    document.body.classList.remove('prohibitOverflow')
                    document.documentElement.classList.remove('overflow-y')
                }
            }
        },
        components: {
            circleUploadingAdd,
            selectPage,
            selectStatus
        }
    };
</script>

<style>
    .addCustomer .startTime .mint-cell-wrapper {
        border-bottom: none;
        margin-bottom: 0;
        font-size: 15px;
    }
    .prohibitOverflow {
        height: 100%;
    }
    .overflow-y {
        height: 100%;
        overflow: hidden;
    }
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
        color: #000;
        text-align: left;
    }
    .addCustomer .headerImg .mint-cell-wrapper{
        height: 90px;
        background: none;
    }
    .addCustomer .mint-field .mint-cell-title{
        font-size: 15px;
        /* border: 0;
        padding-left: 0; */
        color: #4D4D4D;
    }
    .addCustomer .headerImg .mint-cell-title{
        width: 200px;
    }
    .addCustomer .mint-cell-wrapper {
        /* background-size: 120% 1px; */
        background-position: top;
    }
    .addCustomer .mint-field .mint-cell-value {
        text-align: left;
        position: relative;
        height: 15px;
    }
    .addCustomer .industry .mint-field-core {
        display: none;
    }
    .addCustomer .industry .mint-field-other {
        display: inline-block;
        left: 0;
    }
    .addCustomer .popup {
        height: 100%;
        width: 70%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .addCustomer .mint-popup.sex {
        width: 100%;
    }
    .addCustomer .picker-toolbar {
        box-sizing: border-box;
        padding: 0 15px;
        display: flex;
        border-bottom: 1px solid #d9d9d9;
    }
    .addCustomer .picker-toolbar > div {
        flex: 1;
        line-height: 40px;
    }
    .addCustomer .picker-toolbar > div:last-child {
        text-align: right;
        color: #1b69fe;
    }
    .addCustomer .mint-datetime-cancel {
        text-align: left;
    }
    .addCustomer .mint-datetime-confirm {
        text-align: right;
    }
    .addCustomer .birthday .picker-items > div:first-child {
        display: none;
    }
    .addCustomer .birthday {
        display: inline-block;
    }
    .addCustomer .bg-none .mint-cell-wrapper {
        background: none;
    }
</style>

<style scoped>
    .addCustomer > div {
        background-color: #F7F7F7;
    }
    .inputIOS {
        display: block;
        font-size: 15px;
    }
    .inputAndroid {
        font-size: 15px;
        border: 0;
        padding-right: 10px;
        display: inline-block;
    }
    .cell {
        position: relative;
        line-height: 55px;
        display: flex;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 16px;
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
        width: 105px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        font-size: 15px;
    }
    .cell .sex {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: inherit;
        text-align: right;
        font-size: 15px;
    }
    .selectValue {
        color: #000;
        font-size: 15px;
    }
    .addCustomer{
        background: #fff;
        font-size: 13px;
        color: #4d4d4d;
    }
	.addPic{
		text-align: center;
		width: 40px;
		height: 40px;
		border-radius: 30px;
		background: #f7f7f7;
		border: 1px dashed #ddd;
        display: inline-block;
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
        font-size: 15px;
        color: #000;
    }
    .from-textarea{
        padding: 15px;
        margin-bottom: 40px;
        background: #fff;
    }
    .from-textarea .from-textarea-val {
        width: 100%;
        border: none;
        padding: 15px;
        margin-top: 0px;
        /*border-bottom: 1px #dedede solid;*/
        background: #F2F2F2;
        box-sizing: border-box;
        font-size: 15px;
        border-radius: 5px;
    }
    .from-textarea .from-textarea-title {
        padding: 0;
        margin-bottom: 15px;
        color: #4D4D4D;
        font-size: 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
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
    .my-btn {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 100%;
        height: 42px;
        outline: none;
        display: block;
        margin: auto;
        font-size: 17px;
    }
    .birthday {
        text-align: right;
    }
</style>