<template>
    <div class="noTagAdd">
        <img src="../../assets/icon/noTagAdd.png" />
        <p class="title">还没有添加标签哦</p>
        <p class="noTagAdd-addTag"> + 创建标签</p>
        <p class="title-bottom">添加标签,让管理更方便快捷</p>
    </div>
</template>
<script>
    // export default {
    //     name: noTagAdd,
    //     data () {
    //         return {
    //             data: ''
    //         }
    //     },
    //     methods: {

    //     }
    // }
</script>
<style scoped>
    .noTagAdd {
        background: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
    img {
        width: 250px;
        display: block;
        margin: auto;
        margin-top: 20%;
    }
    .title {
        text-align: center;
        margin-top: 10px;
        color: #B1B9C9;
    }
    .noTagAdd-addTag {
        width: 100%;
        color: #38A1E4;
        position: absolute;
        text-align: center;
        bottom: 80px;
    }
    .title-bottom {
        position: absolute;
        text-align: center;
        width: 100%;
        color: #B1B9C9;
        bottom: 20px;
    }
</style>