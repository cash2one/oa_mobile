
<template>
    <div class="workApplyGoods workApply">
        <!-- <p class="title">名称</p> -->
        <mt-field label="名称" class="selectInput" >
            <select v-model="type" @change="toggleType(type)">
                <option value="0">其他</option>
                <option v-for="item in typeList" :value="item.id">{{item.name}}</option>
            </select>
        </mt-field>
        <!-- <p v-if="isShowOtherName" class="title">物品名称</p> -->
        <mt-field label="名称" v-if="isShowOtherName" placeholder="请输入物品名称" type="text" v-model="otherName"></mt-field>
        <!-- <p class="title">数量</p> -->
        <mt-field label="数量" placeholder="请输入需要数量" type="number" v-model="number"></mt-field>

        <p class="title">原因用途</p>
        <div class="from-textarea">
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
                type: 0,
                otherName: '',
                number: '',
                purpose: '',
                typeList: [],
                isShowOtherName: true
            }
        },
        mounted () {
            myFn.ajax('get', {}, apiAddress.apply.goodsList, (res) => {
                this.typeList = res.data
            });
        },
        methods: {
            submit () {
                var data = {
                    gid: this.type,
                    num: this.number,
                    remark: this.purpose
                }
                if (parseInt(data.gid) === 0) {
                    data.goodsname = this.otherName;
                }
                myFn.ajax('post', data, apiAddress.apply.goods, (res) => {
                    this.$router.push({name: 'centerMyApply'});
                });
            },
            toggleType (type) {
                parseInt(type) === 0 ? this.isShowOtherName = true : this.isShowOtherName = false;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .selectInput select {
        font-size: 15px;
    }
    .workApplyGoods {
        /* padding: 0 15px; */
    }
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    .upload-img {
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
    }
    .submit {
        background: #1b69fe;
        color: #fff;
        border: 0;
        width: 85%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
    }
    .button-Group {
        margin-top: 40px;
    }
</style>

