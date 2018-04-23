<template>
    <div class="centerData">
        <mt-field label="姓名" type="text" v-model="userInfo.name" disabled></mt-field>
        <mt-field label="性别" type="text" v-model="userInfo.sex" disabled></mt-field>
        <mt-field label="电话" type="tel" v-model="userInfo.mobile" disabled></mt-field>
        <mt-field label="生日" type="text" v-model="userInfo.birthday" disabled></mt-field>
        <mt-field label="入职时间" type="text" v-model="userInfo.entry_time" disabled></mt-field>
        <mt-field label="转正时间" type="text" v-model="userInfo.positive_time" disabled></mt-field>
        <mt-field label="部门" type="text" v-model="userInfo.dname" disabled></mt-field>
        <mt-field label="职位" type="text" v-model="userInfo.pname" disabled></mt-field>
    </div>
</template>

<script>
    export default {
        name: 'center',
        data () {
            return {
                userInfo: {}
            }
        },
        mounted () {
            myFn.ajax('get', {}, apiAddress.center.userInfo, (res) => {
                this.userInfo = res.data;
                res.data.sex === 1 ? res.data.sex = '男' : res.data.sex = '女';
            })
            // console.log(axios)
        }
    }
</script>
<style>
    .centerData .mint-cell-wrapper {
        font-size: 15px;
    }
    .centerData a:first-child .mint-cell-wrapper {
        background-image: none;
    }
    .centerData .mint-field-core {
        background: #fff;
    }
</style>