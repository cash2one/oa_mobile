<template>
	<div class="customer">
		<span class="title">您还没有客户喔</span>
		<div class="middle" @click="go_add">
            <div class="middle-content">
                <!-- <i class="icon-style iconfont">&#xe605;</i> -->
                <span>添加</span>
            </div>
		</div>
	</div>
</template>
<script>
    export default {
        name: 'home',
        data () {
            return {
            };
        },
        methods: {
            go_add () {
                this.$router.push({name: 'addCustomer'})
            }
        }
    };
</script>

<style scoped>
	.customer{
        position: absolute;
        top: 0;
        background: #fff;
		width: 100%;
		height: 100%;
		text-align: center;
        font-size: 18px;
	}
	.title{
		display: block;
		padding-top: 40%;
        color: #4d4d4d;
	}
	.middle{
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;/*指定垂直居中*/
		margin: 30% auto;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: #1b69fe;
        color: #fff;
		border: 1px solid #ddd;
        font-size: 16px;
	}
    .middle-content{
        flex: 1;
    }
    .icon-style{
        display: block;
        font-size: 30px;
    }
</style>