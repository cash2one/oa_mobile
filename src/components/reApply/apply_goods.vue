
<template>
    <div class="workApplyGoods workApply">
        <!-- <mt-field label="类型" class="selectInput selectInputRight" >
            <select v-model="type" @change="toggleType(type)">
                <option value="-1">< 请选择类型</option>
                <option value="0">其他</option>
                <option v-for="item in typeList" :value="item.id">{{item.name}}</option>
            </select>
        </mt-field> -->
        <mt-field label="类型">
            <p v-html="goodsname"></p>
        </mt-field>

        <mt-field v-show="isShowOtherName" label="名称" placeholder="请输入物品名称" type="text" v-model="otherName"></mt-field>
        <mt-field label="数量" placeholder="请输入需要数量" type="number" v-model="number"></mt-field>
        <div class="from-textarea">
            <p class="from-textarea-title">原因用途</p>
            <textarea class="from-textarea-val" rows="7" v-model="purpose"></textarea>
        </div>

        <div class="button-Group">
            <mt-button class=" submit" size="large" type="primary" @click="submit">提交</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'workApplyGoods',
        data () {
            return {
                type: -1,
                otherName: '',
                number: '',
                purpose: '',
                typeList: [],
                isShowOtherName: false,
                receivedID: '',
                goodsname: '',
                gid: ''
            }
        },
        mounted () {
            myFn.ajax('get', {}, apiAddress.apply.goodsList, (res) => {
                this.typeList = res.data
            });
            if (this.$route.params.id) {
                this.receivedID = this.$route.params.id;
            };
            this.getDetails();
        },
        methods: {
            submit () {
                var data = {
                    gid: this.gid,
                    num: this.number,
                    remark: this.purpose
                }
                if (data.gid === '0') {
                    data.goodsname = this.otherName
                }
                myFn.ajax('post', data, apiAddress.apply.goods, (res) => {
                    this.$router.back(-1);
                });
            },
            getDetails: function () {
                myFn.ajax('get', {id: this.receivedID}, apiAddress.center.applyDetails, (res) => {
                    this.gid = res.data.gid;
                    this.type = res.data.type;
                    this.number = res.data.num;
                    this.purpose = res.data.remark;
                    this.goodsname = res.data.goodsname;
                })
            },
            toggleType (type) {
                type === '0' ? this.isShowOtherName = true : this.isShowOtherName = false;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .upload-img {
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
    }
    .submit {
        width: 125px;
        height: 36px;
        color: #fff;
        font-size: 15px;
        background: #1B69FE;
    }
    .button-Group {
        margin-top: 40px;
    }
</style>

