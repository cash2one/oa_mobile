<template>
    <div class="assessment">
        <div class="header">
            <div class="picker" @click="popupVisible=true">
                <span>第 </span>
                <span v-html="value?value:'0'"></span>
                <span> 期</span>
            </div>
            <div class="score">
                <span v-html="dataInfo.id?dataInfo.score:'0'"></span>分
                <p>本期考核得分</p>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" showToolbar @change="onValuesChange">
                <span style="float:left" @click="popupVisible = false">取消</span>
                <span style="float:right" @click="handleConfirm">确认</span>
            </mt-picker>
        </mt-popup>
        <div class="content">
            <p class="classify" v-html="dataInfo.id?'考核类型':'无考核数据'"></p>
            <mt-cell v-for="item in dataInfo.assess_rule" :title="item.rule_name" :value="item.this_score"></mt-cell>
            <!-- <p class="title">备注</p>
            <p class="remark">231231231321654564654</p> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'assessment',
        data () {
            return {
                slots: [
                    {
                        flex: 1,
                        values: [''],
                        className: 'slot',
                        textAlign: 'center'
                    }
                ],
                popupVisible: false,
                dataInfo: [],
                list: [],
                sendData: {
                    id: ''
                },
                value: ''
            }
        },
        mounted () {
            // this.getlist();
            this.getSureAssessList();
            setTimeout(() => {
                this.slots[0].defaultIndex = 1;
            }, 100)
        },
        methods: {
            getlist (id) {
                myFn.ajax('get', {aid: id}, apiAddress.assessment.list, (res) => {
                    this.dataInfo = res.data;
                })
            },
            getSureAssessList () {
                myFn.ajax('get', {}, apiAddress.assessment.surelist, (res) => {
                    this.list = res.data;
                    for (var i = 0; i < res.data.length; i++) {
                        this.slots[0].values[i] = i + 1;
                    };
                })
            },
            onValuesChange (picker, values) {
                // console.log(values[0])
                for (var i = 0; i < this.slots[0].values.length; i++) {
                    if (parseInt(this.slots[0].values[i]) === parseInt(values[0])) {
                        this.sendData.id = this.list[i].id;
                        this.value = i + 1;
                    };
                };
            },
            handleConfirm () {
                this.getlist(this.sendData.id);
                this.popupVisible = false;
            }
        }
    }
</script>

<style>
    /* .assessment .picker-items > div:nth-child(3) {
        display: none;
    } */
    .assessment .picker-toolbar {
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
        padding: 0 15px;
    }
    .assessment .mint-popup.mint-popup-bottom .picker {
        padding: 0;
    }
    .assessment .picker-slot-wrapper {
        transform: translate(0px, 72px) translateZ(0px);
    }
    .assessment .mint-cell-wrapper {
        background-position: bottom left;
        background-origin: border-box;
    }
    .assessment .mint-cell-value {
        font-size: 14px;
    }
    .assessment .mint-popup-bottom {
        width: 100%;
    }
</style>

<style scoped>
    .header {
        padding-bottom: 20px;
        border-bottom: 1px solid #d9d9d9;
    }
    .picker {
        padding: 15px;
        text-align: center;
        color: #1b69fe;
        position: relative;
        font-size: 15px;
        overflow: visible;
    }
    .picker > img {
        display: inline-block;
        position: absolute;
        top: 70px;
        width: 8px;
        z-index: 2;
    }
    .picker > img.left-btn {
        left: 20%;
    }
    .picker > img.right-btn {
        right: 20%;
    }
    .score {
        font-size: 16px;
        text-align: center;
        padding: 10px;
    }
    .score span {
        font-size: 32px;
        margin-right: 5px;
    }
    .score p {
        font-size: 14px;
        margin-top: 20px;
    }
    .content .classify {
        padding: 30px 15px;
        font-size: 14px;
        text-align: center;
    }
    .content .title {
        font-size: 16px;
        padding: 5px 15px;
    }
    .content .remark {
        color: #888;
        min-height: 60px;
        padding: 5px 15px;
        border-bottom: 1px solid #d9d9d9;
    }
</style>