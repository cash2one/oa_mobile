
<template>
    <div class="uploadImg_add">
        <span class="uploadImgGroup" v-for="item in imgUrlList">
            <img :src="item">
        </span>
        <div @click="openWindow" v-show="ishow" class="addPic"><i class="iconfont addPic-icon">&#xe60a;</i></div>
        <input type="file" id="selectImg" @change="slelectImg"/>
    </div>
</template>

<script>
    export default {
        name: 'uploadImg_add',
        data () {
            return {
                ishow: true,
                imgUrlList: []
            }
        },
        mounted () {
        },
        methods: {
            slelectImg () {
                var imgObj = document.getElementById('selectImg').files[0];
                var imgUrl = window.URL.createObjectURL(imgObj);
                this.imgUrlList.push(imgUrl);
                this.list.push(imgObj);
                this.ishow = false;
            },
            openWindow () {
                if (this.readonly !== undefined) {
                    return false;
                }
                document.getElementById('selectImg').click();
            }
        },
        props: ['list', 'readonly']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
        content: '+';
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size:20px;
    }
</style>
