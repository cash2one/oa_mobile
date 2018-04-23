
<template>
    <div class="uploadImg_add">
        <!-- <p class="title">上传图片:</p> -->
        <div v-if="is_wx == 1">
            <span class="uploadImgGroup" v-for="(item, index) in imgUrlList">
                <img src="../../assets/icon/imgdel.png" class="delImg" @click="delImg(index)">
                <img :src="item" @click="slelectImg(index)" />
            </span>
            <!-- <span class="uploadImgGroup" v-for="(item, key) in list" v-if="id != ''">
                <img src="../../assets/icon/imgdel.png" class="delImg" @click="delImg(key)">
                <img :src="'/public' + item" />
            </span> -->
            <img @click="openWindow" src="../../assets/icon/uploadImg.png" class="uploadImgIcon"/>
            <!-- <span>无</span> -->
            <input type="file" multiple id="selectImg" @change="slelectImg"/>
        </div>
        <div v-if="is_wx == 2">
            <img @click="chooseImage" src="../../assets/icon/uploadImg.png" class="uploadImgIcon" v-if="!list.length" />
            <span v-if="list.length" class="uploadImgGroup" v-for="(item, index) in list">
                <img src="../../assets/icon/imgdel.png" class="delImg" @click="delChooseImg(index)">
                <img :src="item" @click="chooseImage(index)" />
            </span>
            <!-- <input type="file" multiple id="selectImg" @change="slelectImg"/> -->
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk'
    export default {
        name: 'uploadImg_add',
        data () {
            return {
                id: '',
                imgUrlList: [],
                isShow: false,
                // 微信上传图片
                is_wx: 1
            }
        },
        mounted () {
            if (this.$route.params.id) {
                this.id = this.$route.params.id;
            }
            if (parseInt(window.uploadtype) === 2) {
                this.is_wx = 2;
            }
            var url = location.href.split('#')[0];
            myFn.ajax('get', {url: url}, apiAddress.wx.config, (res) => {
                res.data.debug = false;
                wx.config(res.data);
            })
        },
        methods: {
            chooseImage (index) {
                var chooseCount = 3
                if (typeof index === 'object') {
                    chooseCount = 3;
                } else {
                    chooseCount = 1;
                }
                var self = this;
                wx.chooseImage({
                    // 默认9
                    count: chooseCount,
                    // 可以指定是原图还是压缩图，默认二者都有
                    sizeType: ['original', 'compressed'],
                    // 可以指定来源是相册还是相机，默认二者都有
                    sourceType: ['album', 'camera'],
                    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    success: function (res) {
                        if (window.__wxjs_is_wkwebview) {
                            self.localImgData(index, res.localIds, 0);
                        } else {
                            if (typeof index === 'object') {
                                for (var j = 0; j < res.localIds.length; j++) {
                                    self.list.push(res.localIds[j]);
                                };
                            } else {
                                self.list.splice(index, 1, res.localIds[0]);
                            }
                        }
                        self.wxUpload(res.localIds, index);
                    }
                });
            },
            localImgData (index, imgArray, x) {
                var self = this;
                wx.getLocalImgData({
                    localId: imgArray[x],
                    success: function (result) {
                        if (typeof index === 'object') {
                            self.list.push(result.localData);
                        } else {
                            self.$set(self.list, index, result.localData);
                        }
                        if (x < imgArray.length) {
                            self.localImgData(index, imgArray, x + 1);
                        }
                    }
                });
            },
            wxUpload (localIds, index) {
                var imageIdsArr = localIds;
                var localId = imageIdsArr.shift();
                var self = this;
                wx.uploadImage({
                    // 需要上传的图片的本地ID，由chooseImage接口获得
                    localId: localId + '',
                    // 默认为1，显示进度提示
                    isShowProgressTips: 1,
                    success: function (res) {
                        if (typeof index === 'object') {
                            self.serverId.push(res.serverId);
                        } else {
                            // self.$set(self.serverId, index, res.serverId);
                            self.serverId.splice(index, 1, res.serverId)
                        }
                        if (imageIdsArr.length > 0) {
                            self.wxUpload(imageIdsArr, index);
                        };
                    }
                })
            },
            // 微信
            delChooseImg (index) {
                this.list.splice(index, 1);
                this.serverId.splice(index, 1);
            },
            // 普通
            delImg (index) {
                // 预览
                this.imgUrlList.splice(index, 1);
                // 普通
                this.list.splice(index, 1);
            },
            // 选择图片
            slelectImg (index) {
                var file = document.getElementById('selectImg').files;
                for (var i = 0; i < file.length; i++) {
                    this.imgUrlList.push(window.URL.createObjectURL(document.getElementById('selectImg').files[i]))
                    this.list.push(document.getElementById('selectImg').files[i])
                };
            },
            openWindow () {
                if (this.readonly !== undefined) {
                    return false;
                }
                document.getElementById('selectImg').click();
            }
        },
        props: ['list', 'serverId']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .uploadImg_add {
        background: #fff;
        padding: 20px 15px;
        color: #b3b3b3;
        /* border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid; */
    }
    .title {
        margin-bottom:21px;
    }
    .uploadImgGroup {
        position: relative;
        display: inline-block;
        margin-bottom: 12px;
        width: 76px;
        height: 76px;
        margin-right: 15px;
    }
    .uploadImgGroup .delImg {
        position: absolute;
        right: -5px;
        top: -5px;
        width: 20px;
        height: 20px;
    }
    .uploadImgGroup img {
        width: 100%;
        height: 100%;
    }
    .uploadImgIcon {
        width: 76px;
    }
    #selectImg {
        display: none;
    }
</style>
