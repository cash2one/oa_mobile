<template>
    <div class="selectStatus">
        <mt-radio align="right" v-model="value" :options="options">
        </mt-radio>    
    <!-- <div class="go_Add" @click="go_AddCustomer">关闭</div> -->
    </div>
</template>
<script>
    export default{
        data () {
            return {
                options: [],
                value: '',
                name: '',
                isChange: false
            }
        },
        mounted () {
            this.getStatusList();
            setTimeout(() => {
                // this.name = this.selectStatusVal.classify_id
                this.value = this.selectStatusVal.classify_id + '';
            }, 3000)
        },
        watch: {
            value: function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return false;
                }
                this.select(newVal);
                this.selectStatusShow.selectStatus = false;
            }
        },
        methods: {
            getStatusList () {
                myFn.ajax('get', {}, apiAddress.customer.classfiy, (res) => {
                    for (var i = 0; i < res.data.data.length; i++) {
                        this.options.push({label: res.data.data[i].name, value: res.data.data[i].id + ''})
                    };
                })
            },
            go_AddCustomer () {
                this.selectStatusShow.selectStatus = false;
            },
            select (value) {
                for (var i = 0; i < this.options.length; i++) {
                    if (value === this.options[i].value) {
                        this.selectStatusVal.classifyName = this.options[i].label;
                        this.selectStatusVal.classifyID = this.options[i].value
                    }
                }
                var data = {
                    classify_id: this.selectStatusVal.classifyID,
                    id: this.selectStatusVal.id
                }
                if (this.selectStatusVal.id && this.selectStatusShow.selectStatus) {
                    myFn.ajax('post', data, apiAddress.customer.AddCustomer, (res) => {
                        console.log('111111')
                    })
                };
            }
        },
        props: ['selectStatusShow', 'selectStatusVal']
    }
</script>
<style>
    .selectStatus .mint-radiolist-title {
        display: none;
    }
    .selectStatus .mint-cell:first-of-type .mint-cell-wrapper {
        background: none;
    }
    .selectStatus .mint-radiolist-label {
        padding: 0;
    }
    .selectStatus .mint-radio-label {
        margin-left: 0;
    }
</style>
<style scoped>
    .selectStatus {
        background: #f7f7f7;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
    .go_Add{
        margin-top:30px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 55px;
        line-height: 55px;
        padding: 0 15px;
        background: #fff;
    }
</style>