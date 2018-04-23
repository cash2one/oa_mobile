<template>
    <div class="addFollow">
        <p>内容</p>
        <div class="input-area">
            <textarea placeholder="请输入内容" cols="40" rows="5" v-model="content" @keyup="num"></textarea>
        </div>
        <div class="num" v-html="content.length+'/'+length"></div>
        <button class="my-btn" @click="submit">提交</button>
    </div>
</template>
<script>
    export default {
        name: 'addFollow',
        data () {
            return {
                id: '',
                content: '',
                length: '400'
            }
        },
        mounted () {
            this.id = this.$route.params.id;
        },
        methods: {
            num () {
                console.log(this.content.length)
            },
            submit () {
                myFn.ajax('post', {id: 0, cid: this.id, content: this.content}, apiAddress.customer.addFollow, (res) => {
                    this.$toast({
                        message: '添加成功!',
                        position: 'middle',
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.$router.back(-1)
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped>
    p {
        padding: 15px 15px 10px;
    }
    .input-area {
        position: relative;
        padding: 0 15px;
    }
    .num {
        text-align: right;
        padding-right: 15px;
        color: #BABABA;
    }
    textarea {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        border: 0;
        resize: none;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        word-break:break-word;
        word-wrap:break-word;
        background-color: #F7F7F7;
    }
    .my-btn {
        height: 41px;
        line-height: 41px;
        text-align: center;
        color: #fff;
        background: #1B69FE;
        border: 0;
        width: 100%;
        position: fixed;
        bottom: 0;
        font-size: 18px;
    }
    .addFollow input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:  #ccc;
    }
    .addFollow input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    .addFollow input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    .addFollow input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
</style>