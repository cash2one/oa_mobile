
<template>
    <div class="auditor_add">
        <p class="title">审核人</p>
        <div class="no-list" v-show=" personnelList.length == 0 " @click="show_popup">
            <span>姓名</span>
            <span class="val">选择审核人 > </span>
        </div>
        <div class="auditor-list" v-show="personnelList.length > 0">
            <div v-for="(item, index) in personnelList" class="auditor-list-item">
                <img v-if="item.image.length == 0" src="../../assets/icon/head.png" @click="toggleActions(index)"/>
                <img v-else :src='item.image[0]' @click="toggleActions(index)"/>
                <p>{{item.name}}</p>
            </div>
            <div class="auditor-list-add" @click="show_popup">
                <span class="auditor-list-add-text">添加</span>
            </div>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

        <mt-popup v-model="is_show_popup" position="right">
            <contacts-list @close="close_popup"></contacts-list>
        </mt-popup>
    </div>
</template>
<script>
    import contactsList from './contacts_list'
    export default {
        name: 'auditor_add',
        data () {
            return {
                personnelList: [],
                actions: [],
                sheetVisible: false,
                choose: '',
                is_show_popup: false,
                edit_index: '',
                myID: ''
            }
        },
        watch: {
            is_show_popup: function (val, oldval) {
                if (val) {
                    $('html').addClass('prohibitOverflow');
                } else {
                    $('html').removeClass('prohibitOverflow');
                }
            }
        },
        mounted () {
            this.actions = [
                {
                    name: '编辑',
                    method: this.edit
                },
                {
                    name: '删除',
                    method: this.del
                }
            ];
            this.myID = JSON.parse(localStorage.userInfo).id;
        },
        methods: {
            // personnelList 数组存放每个对象的信息
            // list 数组只包含需要发送的id
            del () {
                this.list.splice(this.choose, 1);
                this.personnelList.splice(this.choose, 1);
                this.choose = '';
            },
            edit () {
                this.show_popup();
            },
            show_popup () {
                this.is_show_popup = true;
            },
            close_popup (obj) {
                this.is_show_popup = false;
                if (this.choose !== '') {
                    this.personnelList[this.choose] = {name: obj.name, id: obj.id, image: obj.image};
                    this.list[this.choose] = obj.id;
                    this.choose = '';
                } else {
                    if (parseInt(this.myID) === parseInt(obj.id)) {
                        alert('不能选择自己');
                        return false;
                    }
                    this.personnelList.push({name: obj.name, id: obj.id, image: obj.image});
                    this.list.push(obj.id);
                }
            },
            toggleActions (index) {
                this.choose = index;
                this.sheetVisible = !this.sheetVisible;
            }
        },
        components: {
            contactsList
        },
        props: ['list']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    
    .no-list {
        padding: 0 15px;
        background: #fff;
        height: 55px;
        line-height: 55px;
        color: #b3b3b3;
    }
    .no-list .val {
        float: right;
        color: #000;
        font-size: 15px;
    }

    .auditor-list {
        background: #fff;
        /* border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid; */
        padding: 0px 20px;
    }
    .auditor-list-item {
        width: 40px;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 20px 28px 15px 0px;
    }
    .auditor-list-item::after {
        content: '→';
        width: 40%;
        height: 2px;
        position: absolute;
        bottom: 50%;
        left: 110%;
        color: #ccc;
        line-height: 0;
    }
    .auditor-list-item img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .auditor-list-item p {
        font-size: 13px;
    }
    .auditor-list-add {
        width: 50px;
        padding-bottom: 50px;
        border-radius: 50%;
        border: 1px #e6e6e6 dashed;
        display: inline-block;
        color: #e6e6e6;
        text-align: center;
        background: #F7F7F7;
        vertical-align: super;
        position: relative;
        font-size: 13px;
    }
    .auditor-list-add-text {
        position: absolute;
        height: 1.5em;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
</style>
