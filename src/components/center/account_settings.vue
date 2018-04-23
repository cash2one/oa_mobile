<template>
    <div class="accountSettings">
        <mt-cell title="修改手机号" is-link to="/index/center/phone"></mt-cell>
        <mt-cell title="修改密码" is-link to="/index/center/password"></mt-cell>
    </div>
</template>

<style>
    .accountSettings {
        height: 100%;
    }
    .accountSettings .mint-cell-title {
        color: #333333;
    }
    .accountSettings .mint-cell:last-child {
        background-image: none; 
    }
    .accountSettings .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .accountSettings .mint-cell-wrapper {
        background-position: bottom left;
    }
</style>

