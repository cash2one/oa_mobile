<template>
    <div class="yearlistDetail">
        <div class="classify-title">
            <div v-html="className">学习成长</div>
            <div v-if="list.length" class="add" @click="addTarget">+</div>
        </div>
        <div class="creatTarget" v-if="!list.length">
            <div style="display:inline-block" @click="addTarget"><span>+</span>新建目标</div>
        </div>
        <div class="list">
            <ul>
                <li class="content" v-for="(item,index) in list" @click="goEdit(item.id, item.is_success)">
                    <div class="left">
                        <span @click.stop="finish(index, item.id)" :class="{active: item.is_success}">
                            <i style="font-style: normal" v-if="!item.is_success">完成</i>
                            <img v-if="item.is_success" src="../../assets/icon/yes_check.png" width="15">
                        </span>
                    </div>
                    <div class="right"><span @click.stop="delItem(index, item.id)">X</span></div>
                    <div class="middle">
                        <p class="title" v-html="item.content">看一本经典书看一本经典书看一本经典书看一本经典书</p>
                        <p class="time"><span v-html="item.start_time"></span>——<span v-html="item.end_time"></span></p>
                        <p class="per" v-html="item.method">———— 每天2小时</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'yearlistDetail',
        data () {
            return {
                id: '',
                list: [],
                className: ''
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.className = this.$route.params.name;
            this.getdetail();
        },
        methods: {
            getdetail () {
                myFn.ajax('get', {cate_id: this.id}, apiAddress.plan.yearPlanList, (res) => {
                    this.list = res.data.data;
                })
            },
            addTarget () {
                this.$router.push({name: 'yearPlanAddPerson'})
            },
            delItem (index, id) {
                MessageBox.confirm('确定删除该目标?').then(action => {
                    myFn.ajax('get', {model_type: 4, id: id}, apiAddress.plan.del, (res) => {
                        this.list.splice(index, 1);
                    })
                }, cancel => {
                    console.log(2)
                });
            },
            goEdit (id, isSuccess) {
                if (isSuccess) {
                    this.$router.push({name: 'yearPlanPersonDetails', params: {id: id, name: this.className}})
                } else {
                    this.$router.push({name: 'yearPlanPersonEdit', params: {id: id, name: this.className}})
                }
            },
            finish (index, id) {
                myFn.ajax('get', {model_type: 4, id: id}, apiAddress.plan.finish, (res) => {
                    this.list[index].is_success = !this.list[index].is_success;
                })
            }
        }
    }
</script>

<style scoped>
    .list .content .left span.active {
        border-color: #1B69FE;
    }
    .classify-title {
        padding: 20px 15px;
        position: relative;
    }
    .classify-title > div {
        display: inline-block;
        font-size: 24px;
    }
    .classify-title > div.add {
        position: absolute;
        width: 25px;
        height: 25px;
        border: 1px solid #999;
        right: 15px;
        font-size: 25px;
        text-align: center;
        line-height: 21px;
        color: #999;
        border-radius: 50%;
        bottom: 25px;
    }
    .list {
        padding: 15px;
    }
    .list ul {
        padding-left: 0;
    }
    .list .content {
        padding-top: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
        list-style: none;
    }
    .list .content .left {
        float: left;
        width: 60px;
    }
    .list .content .left span {
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #999;
        border-radius: 50%;
        font-size: 12px;
    }
    .list .content .right {
        float: right;
        width: 30px;
        text-align: right;
    }
    .list .content .middle {
        padding-left: 60px;
        padding-right: 30px;
        font-size: 14px;
    }
    .list .content .middle p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 5px 0;
    }
    .list .content .middle p.time {
        color: #999;
        margin-bottom: 10px;
        font-size: 12px;
    }
    .list .content .middle p.per {
        color: #999;
    }
    .creatTarget {
        color: #9cbf3f;
        margin: 0 15px 0px;
        padding-top: 20px;
    }
    .creatTarget span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-width: 1px;
        border-style: dashed;
        vertical-align: bottom;
        margin-right: 10px;
        line-height: 18px;
        font-size: 20px;
        text-align: center;
        border-radius: 3px;
    }
</style>