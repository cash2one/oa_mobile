<template>
    <div class="customerPage">
        <div class="header">
            <img class="headerImg" :src="headImg" />
            <div class="info">
                <p class="department">姓名</p>
            </div>
            <img class="gender" :src="sex == 1 ? require('../../assets/icon/maleIcon.png') : require('../../assets/icon/femaleIcon.png')" />
        </div>
        <mt-field label="电话"  type="tel" v-model="mobile"></mt-field>
        <mt-field label="生日" class="birthday" v-model="birthdayTime[0]" disabled @click.native="openPicker('birthdayTime')">
            <div class="message-wrapper">
                <span v-if="!birthdayTime">请选择生日日期></span>
                <span v-show="birthdayTime" @click="go_birth">生日提醒></span>
            </div>
        </mt-field>
        <mt-field label="公司"  v-model="company"></mt-field>
        <mt-field label="职位" v-model="position"></mt-field>
        <mt-field label="地址" v-model="address"></mt-field>
        <mt-field label="邮箱"  type="email" v-model="email"></mt-field>
        <mt-field label="所在行业"  v-model="industry" disabled>
            <div class="message-wrapper">
                <span @click="go_select">选择所在行业></span>
            </div>
        </mt-field>
        <mt-field label="标签" disabled v-model="tag">
            <div class="message-wrapper">
                <span>选择标签></span>
            </div>
        </mt-field>
        <div class="from-textarea"  disabled>
            <p class="from-textarea-title">备注</p>
            <textarea class="from-textarea-val" rows="5" v-model="remark"></textarea>
        </div>
        <div class="buttonStyle">
            <span class="buttonStyle-first"><mt-button size="large" class="first-button">删除</mt-button></span>
            <span class="buttonStyle-second"><mt-button size="large" class="second-button">保存</mt-button></span>
        </div>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" @confirm="set_Time"></mt-datetime-picker>
    </div>
</template>
<script>
    import circleUploadingAdd from '../tools/circleUploading_add'

    export default {
        name: 'customerPage',
        data () {
            return {
                headImg: require('../../assets/icon/applyAvatar.png'),
                sex: '1',
                birthdayTime: '',
                isShowNotice: false,
                username: '',
                mobile: '',
                company: '',
                address: '',
                position: '',
                email: '',
                industry: '',
                tag: '',
                remark: '',
                examineList: [],
                listImg: [],
                pickerValue: new Date(),
                // 当前要设置的data
                thisTimeSelect: ''
            }
        },
        mounted () {
        },
        methods: {
            // submit () {
            //     var form = new FormData();
            //     form.append('aid[]', this.examineList);
            //     form.append('payer', this.name);
            //     form.append('pay_method', this.type);
            //     form.append('reason', this.reason);
            //     form.append('money', this.number);
            //     form.append('collection_time', this.proceedsTime[1]);
            //     for (var i = 0; i < this.listImg.length; i++) {
            //         form.append('images[]', this.listImg[i]);
            //     }
            //     form.append('uploadtype', 1);
            //     myFn.uploadImg(form, apiAddress.apply.proceeds, (res) => {
            //         this.$router.push({name: 'centerMyApply'});
            //     });
            // },
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
            go_birth () {
                this.$router.push({name: 'birthdayRemind'})
            },
            go_select () {
                this.$router.push({name: 'selectPage'})
            },
            go_Management () {
                this.$router.push({name: 'customerManagement'})
            }
        },
        components: {
            circleUploadingAdd
        }
    };
</script>
<style>
    .customerPage .mint-field .mint-field-core {
        text-align: left;
        font-size: 13px;
    }
    .customerPage > .top-content + .mint-field .mint-cell-wrapper{
        background: none;
        color: red;
    }
    .mint-field .mint-cell-title{
        font-size: 13px;
        color: #4d4d4d;
    }
    .mint-field:nth-child(1) .mint-cell-title{
        width: 150px;
    }
</style>

<style scoped>
    .customerPage{
        background: #fff;
        font-size: 13px;
    }
    
    .header {
        background: #fff;
        padding: 10px 0;
        margin-bottom: 10px;
        text-align: center;
        position: relative;
    }
    .header .headerImg {
        width: 85px;
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
        color: #b3b3b3;
        font-size: 14px;
    }
    /*
    .top-content{
        position: relative;
        background: #fff;
        box-sizing: border-box;
        padding:10px;
        height: 170px;
        text-align: center;
    }
    .right_icon {
        position: absolute;
        top: 20px;
        right: 15%;
    }
    .top-content span{
        display: block;
    }
    .top-pic{
        margin: 0 auto;
        width: 100px;
        height: 100px;
        border-radius:50px;
        border:1px solid #ddd;
    }
    .title-style{
        margin-top:20px;
    }*/
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
        padding: 0 15px;
        margin-top: 0px;
        /*border-bottom: 1px #dedede solid;*/
        background: #fff;
        box-sizing: border-box;
        font-size: 16px;
    }
     .from-textarea-title{
        color: #4d4d4d;
    }
    .buttonStyle{
        display: flex;
        flex-direction: row;
        text-align: center;
        border-bottom: none;
    }
    .buttonStyle-first {
        flex: 0 1 165px;
        padding: 0;
    }
    .buttonStyle-second{
        flex: 1;
        padding: 0;
    }
    .first-button{
        font-size: 16px;
        background: #fff;
        border-radius: 0;
    }
    .second-button{
        font-size: 16px;
        background: #1b69fe;
        border-radius: 0;
        color: #fff;
    }
</style>