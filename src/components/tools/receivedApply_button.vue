
<template>
    <div class="receivedApplyButton">
        <mt-button class=" submit" @click="open_popup()">转交</mt-button>
        <mt-button class=" submit" @click="set_static(id, 3)">拒绝</mt-button>
        <mt-button class=" submit agree" @click="set_static(id, 2)">同意</mt-button>
        <mt-popup v-model="is_show_popup" position="right">
            <contacts-list @close="transfer"></contacts-list>
        </mt-popup>
    </div>
</template>
<script>
    import contactsList from './contacts_list'
    export default {
        name: 'auditor_add',
        data () {
            return {
                transferId: [],
                is_show_popup: false
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
            console.log(this.id)
        },
        methods: {
            set_static (id, status) {
                id.status = status;
                myFn.ajax('post', id, apiAddress.receivedApply.applyoperate, (res) => {
                    if (id.status === 2) {
                        console.log('同意成功');
                        this.$router.push('/index/applyList')
                    } else {
                        console.log('拒绝成功');
                        this.$router.push('/index/applyList')
                    }
                });
            },
            open_popup () {
                this.is_show_popup = true;
            },
            transfer (item) {
                if (item.id === undefined || item.id === '') {
                    return false;
                }
                myFn.ajax('post', {id: this.id.id, aid: item.id}, apiAddress.receivedApply.transfer, (res) => {
                    console.log('转移成功');
                });
            }
        },
        components: {
            contactsList
        },
        props: ['id']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     
    .receivedApplyButton {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
    }
    .receivedApplyButton .submit {
        margin: 0;
        padding: 5px 0;
        border-radius: 0;
        font-size: 14px;
        color: #26a2ff;
        display: block;
        flex: 1;
    }
    .title {
        margin: 25px 15px 15px;
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
    }

    .auditor-list {
        background: #fff;
        border-top: 1px #d9d9d9 solid;
        border-bottom: 1px #d9d9d9 solid;
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
