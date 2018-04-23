<template>
    <div class="customerPage">
        <div > <!-- v-show="!is_show_popup.selectPage && !is_show_popup.selectStatus && !is_show_popup.selectTag" -->
            <div class="header">
                <img v-if="userInfo.image" class="headerImg" :src="userInfo.image" />
                <img v-if="!userInfo.image" class="headerImg" src="../../assets/icon/head.png" />
                <div class="info">
                    <p class="department" v-html="userInfo.name">姓名</p>
                </div>
                <img class="gender" :src="userInfo.sex == 1 ? require('../../assets/icon/maleIcon.png') : require('../../assets/icon/femaleIcon.png')" />
            </div>
            
            <ul class="customerInfo">
                <li><span class="key">电话</span><span class="val" v-html="userInfo.phone"></span></li>
                <li><span class="key">公司</span><span class="val" v-html="userInfo.company"></span></li>
                <li><span class="key">职位</span><span class="val" v-html="userInfo.position"></span></li>
                <li><span class="key">地址</span><span class="val" v-html="userInfo.address"></span></li>
                <li><span class="key">邮箱</span><span class="val" v-html="userInfo.email"></span></li>
                <li><img class="rightBlueIcon" src="../../assets/icon/right_link.png" @click="go_edit(4)" /></li>
            </ul>

            <mt-field label="生日" class="birthday" v-model="userInfo.birthday" disabled>
                <span v-html="birthdayWarn[userInfo.is_warn]" @click="go_edit(5)"></span>
                <!-- <img src="../../assets/icon/right_link.png" height="25px" width="15px"> -->
            </mt-field>
            <mt-field label="客户跟进" class="progress" disabled >
                <img src="../../assets/icon/right_link.png" width="10px" @click="go_edit(6)">
            </mt-field>
            
            <mt-field label="所在行业" class="industry" disabled>
                <span v-html="userInfo.trade_name" v-if="userInfo.trade_name" @click="go_select"></span>
                <p v-if="!userInfo.trade_name" @click="go_select">选择所在行业</p>&nbsp
                <img src="../../assets/icon/right_link.png" width="10px" @click="go_select">
            </mt-field>
            <mt-field label="标签" class="tage" disabled>
                <span class="label-list" v-if="userInfo.label.length != 0" @click="selectTag">
                    <i v-for="(item, index) in userInfo.label">
                        <span v-html="item.name"></span>
                        <span v-if="userInfo.label.length-1 != index">、</span>
                    </i>&nbsp
                    <img src="../../assets/icon/right_link.png" width="10px">
                </span>
                <p v-if="!userInfo.label.length" @click="selectTag">选择标签 &nbsp <img src="../../assets/icon/right_link.png" width="10px" @click="selectTag"></p>
            </mt-field>
            <mt-field label="分类" class="classification" disabled>
                <span v-html="userInfo.classifyName" v-if="userInfo.classify" @click="go_classifyID"></span>
                <p v-if="!userInfo.classify" @click="go_classifyID">选择分类</p>&nbsp
                <img src="../../assets/icon/right_link.png" width="10px" @click="go_classifyID">
            </mt-field>

            <!-- <mt-field label="备注" class="remarks" disabled type="textarea" v-model="userInfo.remark">
                <span v-html="userInfo.remark"></span>
            </mt-field> -->

            <p class="title">备注</p>
            <div class="from-textarea">
                <textarea class="from-textarea-val" rows="7" v-model="userInfo.remark" disabled></textarea>
            </div>

            <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_Time"></mt-datetime-picker>
        </div>
        
        <div class="my-btn"><span @click="delItem">删除</span></div>

        <mt-popup class="popup" v-model="is_show_popup.selectPage" position="right">
            <select-page :selectPageShow="is_show_popup" :selectPageVal="userInfo" position="right"></select-page>
        </mt-popup>
        <mt-popup class="popup" v-model="is_show_popup.selectStatus" position="right">
            <select-status :selectStatusShow="is_show_popup" :selectStatusVal="userInfo" position="right"></select-status>
        </mt-popup>
        <mt-popup class="popup" v-model="is_show_popup.selectTag" position="right">
            <select-tag :selectTagShow="is_show_popup" :selectTagVal="userInfo"></select-tag>
        </mt-popup>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import circleUploadingAdd from '../tools/circleUploading_add'
    import selectPage from './selectPage'
    import selectStatus from './selectStatus'
    import selectTag from './selectTag'

    export default {
        name: 'customerPage',
        data () {
            return {
                userID: '',
                userInfo: {
                    label: []
                },
                followUpInfo: {},
                isShowNotice: false,
                examineList: [],
                listImg: [],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: '',
                birthdayWarn: {
                    0: '设置生日提醒',
                    6: '提前一天提醒',
                    7: '提前3天提醒',
                    8: '提前7天提醒'
                },
                is_show_popup: {
                    selectPage: false,
                    selectStatus: false,
                    selectTag: false
                }
            }
        },
        mounted () {
            this.userID = this.$route.params.id;
            this.getUserInfo();
        },
        methods: {
            getUserInfo () {
                myFn.ajax('get', {id: this.userID}, apiAddress.customer.customerInfo, (res) => {
                    this.userInfo = res.data;
                    console.log(this.userInfo)
                    this.userInfo.classifyName = this.userInfo.classify;
                    this.userInfo.trade_name = this.userInfo.trade_name;
                    if (this.userInfo.image.length) {
                        this.userInfo.image = this.userInfo.image[0];
                    } else {
                        this.userInfo.image = '';
                    }
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
            delItem () {
                var self = this;
                MessageBox.confirm('是否删除客户？').then(action => {
                    myFn.ajax('post', {id: this.userID}, apiAddress.customer.delCustomer, res => {
                        self.$router.back();
                    })
                });
            },
            go_select () {
                this.is_show_popup.selectPage = true;
            },
            go_classifyID () {
                this.is_show_popup.selectStatus = true;
                document.documentElement.classList.add('overflow-y')
                document.body.classList.add('prohibitOverflow')
            },
            selectTag () {
                this.is_show_popup.selectTag = true;
                document.documentElement.classList.add('overflow-y')
                document.body.classList.add('prohibitOverflow')
            },
            go_birth () {
                this.$router.push({name: 'birthdayRemind'})
            },
            go_edit (tag) {
                var goName = '';
                switch (parseInt(tag)) {
                    case 1:
                        goName = 'selectPage';
                        break;
                    case 2:
                        goName = 'selectTag';
                        break;
                    case 3:
                        goName = 'selectStatus';
                        break;
                    case 4:
                        goName = 'editCustomer';
                        break;
                    case 5:
                        goName = 'setBirthday';
                        break;
                    case 6:
                        goName = 'followUp';
                        break;
                }
                this.$router.push({name: goName})
            }
        },
        watch: {
            'is_show_popup.selectStatus': function () {
                if (!this.is_show_popup.selectStatus) {
                    document.documentElement.classList.remove('overflow-y')
                    document.body.classList.remove('prohibitOverflow')
                }
            },
            'is_show_popup.selectTag': function () {
                if (!this.is_show_popup.selectTag) {
                    document.documentElement.classList.remove('overflow-y')
                    document.body.classList.remove('prohibitOverflow')
                }
            }
        },
        components: {
            circleUploadingAdd,
            selectPage,
            selectStatus,
            selectTag
        }
    };
</script>
<style>
    .overflow-y {
        height: 100%;
        overflow-y: hidden;
    }
    .customerPage .mint-cell-wrapper {
        font-size: 15px;
    }
    .customerPage .birthday .mint-cell-wrapper,
    .customerPage .remarks .mint-cell-wrapper,
    .customerPage .industry .mint-cell-wrapper {
        background-image: none;
        /* border-top: 1px #dedede solid; */
    }
    .customerPage .progress, 
    .customerPage .remarks, 
    .customerPage .classification {
        margin-bottom: 10px;
        /* border-bottom: 1px #dedede solid; */
    }
    .customerPage .industry input,
    .customerPage .target input,
    .customerPage .classification input,
    .customerPage .tage input{
        display: none;
    }
    .customerPage .mint-field.birthday .mint-field-core{
        text-align: left;
        background-color: #fff;
    }
    .customerPage .mint-field-other {
        line-height: 1.6;
        width: 100%;
        text-align: right;
    }
    .customerPage .mint-field-other img {
        width: 15px;
    }
    .customerPage .birthday input {
        position: absolute;
    }
    .customerPage .mint-cell-value {
        text-align: right;
    }
    .customerPage .remarks input {
        text-align: left;
        display: inline-block;
        width: inherit;
    }
    .customerPage .popup {
        height: 100%;
        width: 70%;
        overflow-x: hidden;
    }
    .customerPage .mint-field-other p {
        text-align: right;
    }
    .customerPage .mint-cell-wrapper {
        background-image: linear-gradient(180deg, #DEDEDE, #DEDEDE 50%, transparent 50%);
    }
    .customerPage .mint-cell-text {
        color: #949494;
    }
    .customerPage .mint-field .mint-cell-title {
        border-left: 0;
        padding-left: 0;
    }
    /* .customerPage .mint-field .mint-field-core {
        text-align: left;
    } */
</style>
<style scoped>
    .title {
        margin: 25px 0 15px 15px;
        /* border-left: 3px solid #1B69FE; */
        line-height: 1.0;
        /* padding-left: 6px; */
        color: #949494;
    }
    .customerPage{
        font-size: 13px;
    }
    
    .header {
        background: #fff;
        padding: 20px 0;
        margin-bottom: 10px;
        text-align: center;
        position: relative;
    }
    .header .headerImg {
        width: 85px;
        height: 85px;
        margin-top: 10px;
        border-radius: 50%;
    }
    .header .gender {
        position: absolute;
        right: 35px;
        top: 25px;
        width: 15px;
    }
    .header .info  p {
        margin: 10px 0;
    }
    .header .info .department {
        font-size: 15px;
    }
    .message-wrapper{
        font-size: 15px;
    }
    .customerInfo {
        background: #fff;
        line-height: 30px;
        padding: 10px;
        padding-left: 20px;
        margin: 10px 0px;
        font-size: 15px;
        position: relative;
        /* border-top: 1px #dedede solid;
        border-bottom: 1px #dedede solid; */
    }
    .customerInfo .key {
        color: #949494;
        margin-right: 20px;
    }
    .customerInfo .rightBlueIcon {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        height: 26px;
        margin: auto;
    }
    .label-list {
        display: inline-block;
        width: 180px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: right;
    }
    .label-list i {
        font-style: normal;
    }
    .my-btn {
        box-sizing: border-box;
        padding: 15px;
    }
    .my-btn span {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 80%;
        height: 42px;
        line-height: 42px;
        font-size: 17px;
        border-radius: 4px;
        outline: none;
        display: block;
        margin: auto;
        text-align: center;
    }
</style>