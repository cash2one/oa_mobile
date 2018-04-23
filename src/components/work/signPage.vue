<template>
    <div class="signPage">
        <div class="form">
            <div class="form-group">
                <label class="form-label"> 签到时间</label>
                <div class="form-control" v-html="form.time"></div>
            </div>
            <div class="form-group">
                <label class="form-label">签到地点</label>
                <div class="form-after" @click="goMap">微修改 ></div>
                <div class="form-control" v-html="form.address"></div>
            </div>
        </div>
        <div class="object">
            <!-- <p class="object-title">拜访对象</p> -->
            <mt-field label="拜访对象" placeholder="点击选择拜访对象" disabled v-model="form.customer" @click.native="popupVisible = true"></mt-field>
            <p class="remarks">备注</p>
            <textarea cols="30" rows="8" placeholder="点击输入内容" v-model="form.remarks"></textarea>
            <!-- <div>
                <div class="uploadImg">
                    <img src="#">
                    <img src="../../assets/icon/imgdel.png">
                </div>
                <span>上传图片</span>
            </div> -->
            <upload :list="form.imgList" :serverId="serverId" v-on:increment="uploadChange"></upload>
        </div>
        <mt-button class="submitBtn" @click="submit" >确定</mt-button>
        <div class="btn-group">
            <div class="active"><img src="../../assets/icon/lineLog_active.png"><span>签到</span></div>
            <div @click="goLineLog"><img src="../../assets/icon/sign.png"><span>足迹</span></div>
        </div>
        <mt-popup v-model="popupVisible" position="right">
            <ul>
                <li v-for="item in list" class="list-style" @click="choose(item)">
                    <div class="listImg">
                        <div class="add"><img :src="item.image"></div>
                    </div>
                    <div class="listContent">
                        <p class="name">{{item.name}}</p>
                        <p class="type">{{item.trade_name}}</p>
                    </div>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
    import upload from '../tools/uploadImg_Add'
    export default {
        name: 'signPage',
        data () {
            return {
                form: {
                    time: '',
                    address: '深圳市',
                    customer: '',
                    customerID: '',
                    remarks: '',
                    imgList: []
                },
                serverId: [],
                list: [],
                addressInfo: {},
                popupVisible: false
            }
        },
        mounted () {
            this.addressInfo = JSON.parse(localStorage.address)
            this.form.address = this.addressInfo.addr;
            console.log(this.$route.params)
            this.getTime();
            setInterval(() => {
                this.getTime()
            }, 1000)
            this.get_list();
        },
        methods: {
            uploadChange (list, serverId) {
                this.form.imgList = list;
                this.serverId = serverId;
                // console.log('接收' + this.form.imgList.toString());
                // console.log('接收' + this.serverId.toString());
            },
            goLineLog () {
                this.$router.push({name: 'lineLog'})
            },
            goMap () {
                this.$router.push({name: 'sign', params: {address: this.form.address}})
            },
            getTime () {
                var newDate = new Date();
                var date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
                var time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
                this.form.time = date + ' ' + time;
            },
            get_list () {
                myFn.ajax('get', {}, apiAddress.customer.customerList, (res) => {
                    this.list = res.data.data;
                });
            },
            choose (item) {
                this.form.customer = item.name;
                this.form.customerID = item.id;
                this.popupVisible = false;
            },
            submit () {
                var formData = new FormData()
                formData.append('x_coor', this.addressInfo.x_coor);
                formData.append('y_coor', this.addressInfo.y_coor);
                formData.append('addr', this.form.address);
                formData.append('customer_id', this.form.customerID);
                formData.append('remark', this.form.remarks);
                // formData.append('uploadtype', 1);
                if (parseInt(window.uploadtype) === 1) {
                    for (var i = 0; i < this.form.imgList.length; i++) {
                        formData.append('image[]', this.form.imgList[i]);
                    }
                } else {
                    for (var j = 0; j < this.serverId.length; j++) {
                        formData.append('image[]', this.serverId[j]);
                    }
                }
                formData.append('uploadtype', window.uploadtype);
                myFn.uploadImg(formData, apiAddress.check.signIn, (res) => {
                    this.$router.push({name: 'lineLog'})
                });
            }
        },
        components: {
            upload
        }
    }
</script>

<style>
    .signPage .mint-cell-wrapper {
        background-position: bottom left;
        padding: 0;
    }
    .signPage .mint-field .mint-cell-title {
        width: auto;
        margin-right: 10px;
    }
    .signPage .mint-field .mint-field-core {
        text-align: left;
        color: #999;
        font-size: 14px;
    }
    .signPage .mint-field .mint-cell-title {
        color: #000;
    }
    .signPage .mint-popup-right {
        width: 70%;
        height: 100%;
    }
    .signPage input::-webkit-input-placeholder, .signPage textarea::-webkit-input-placeholder {
        color:  #999;
    }
    .signPage input:-moz-placeholder, .signPage textarea:-moz-placeholder {
        color: #999;
    }
    .signPage input::-moz-placeholder, .signPage textarea::-moz-placeholder {
        color: #999;
    }
    .signPage input:-ms-input-placeholder, .signPage textarea:-ms-input-placeholder {
        color: #999;
    }
    .signPage .submitBtn {
        width: 90%;
        margin: auto;
        margin-top: 10px;
        display: block;
        font-size: 17px;
        color: #fff;
        background: #1b69fe;
        margin-bottom: 70px;
        height: 36px;
        line-height: 36px;
    }
    .signPage .mint-field .mint-field-core {
        color: #444;
    }
</style>

<style scoped>
    .form {
        padding: 0 15px;
        background: #fff;
        border-bottom: 1px solid #d9d9d9;
    }
    .form-group {
        padding: 15px 0;
        border-bottom: 1px solid #d9d9d9;
    }
    .form-label {
        float: left;
    }
    .form-control {
        padding-left: 15px;
        border: 0;
        color: #999;
        box-sizing: border-box;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .form-after {
        float: right;
        color: #1b69fe;
        font-size: 14px;
    }
    .form-group:last-child {
        border-bottom: 0;
    }
    .object {
        margin-top: 10px;
        background-color: #fff;
        padding: 15px;
        padding-top: 0;
        font-size: 14px;
        border-top: 1px solid #d9d9d9;
    }
    .object-title {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 5px;
    }
    .remarks {
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .object textarea {
        width: 100%;
        border: 0;
        resize: none;
        font-size: 14px;
        color: #666;
    }
    .object > div img {
        width: 60px;
        height: 60px;
        vertical-align: top;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .object .uploadImg {
        display: inline-block;
        position: relative;
    }
    .object .uploadImg img:last-child {
        position: absolute;
        width: 20px;
        height: 20px;
        right: -8px;
        top: -8px;
    }
    .object > div span {
        width: 58px;
        height: 58px;
        color: #666;
        border: 1px dashed #ccc;
        display: inline-block;
        color: #999;
        font-size: 12px;
        line-height: 55px;
        text-align: center;
        vertical-align: top;
    }
    .btn-group {
        position: fixed;
        width: 100%;
        height: 41px;
        bottom: 0;
        border-top: 1px solid #ededed;
        display: flex;
        background-color: #fff;
        padding: 5px 0;
    }
    .btn-group > div {
        flex: 1;
        text-align: center;
        font-size: 0;
        color: #999;
    }
    .btn-group > div img {
        width: 20px;
        margin-top: 3px;
    }
    .btn-group > div span {
        width: 100%;
        display: inline-block;
        text-align: center;
        font-size: 12px;
    }
    .btn-group > div.active span {
        color: #1b69fe;
    }
    .list-style{
        display: flex;
        flex-direction: row;
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #ededed;
        font-size: 14px;
    }
    .listImg{
        padding: 15px 20px;
    }
    .listContent{
        position: relative;
        flex: 1;
        padding-top: 18px;
        line-height: 25px;
    }
    .listContent .name {
        font-size: 15px;
    }
    .listContent .type {
        color: #BDBDBD;
    }
    .add{
        width: 50px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #ddd;
        background: #fff;
        overflow: hidden;
    }
    .add img {
        width: 100%;
        height: 100%;
    }
</style>