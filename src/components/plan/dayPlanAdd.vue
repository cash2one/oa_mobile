<template>
    <div class="dayPlanAdd">
        <mt-field label="日期" type="date" v-model="startTime"></mt-field>
        <mt-field label="开始时间" type="time" v-model="pickerValue1"></mt-field>
        <mt-field label="结束时间" type="time" v-model="pickerValue2"></mt-field>
        <p class="title">事项</p>
        <div class="from-textarea">
            <textarea class="from-textarea-val" rows="7" v-model="content" placeholder="请输入事由"></textarea>
        </div>
        <mt-field label="优先级" class="selectInput" >
            <select v-model="selectedValue">
                <option v-for="(item, key) in priority" :value="key">{{item}}</option>
            </select>
        </mt-field>

        <button class="my-btn" @click="submit">提交</button>

    </div>
</template>

<script>
    export default {
        name: 'dayPlanAdd',
        data () {
            return {
                pickerValue1: '',
                pickerValue2: '',
                content: '',
                date: '',
                selectedValue: 0,
                priority: []
            }
        },
        mounted () {
            this.getPriority();
            this.startTime = myFn.getToday();
        },
        methods: {
            getPriority () {
                myFn.ajax('get', {}, apiAddress.plan.priority, (res) => {
                    this.priority = res.data;
                })
            },
            submit () {
                var data = {
                    day: this.date,
                    detail_time_start: this.pickerValue1,
                    detail_time_end: this.pickerValue2,
                    content: this.content,
                    prior_code: this.selectedValue
                }
                if (!this.content) return;
                myFn.ajax('post', data, apiAddress.plan.dayPlanAdd, (res) => {
                    // this.$router.push({name: 'dayPlan'})
                    this.$router.back(-1);
                })
            }
        }
    }
</script>

<style>
    .dayPlanAdd .mint-cell-wrapper {
        border-top: none;
        background: none;
        margin-top: 0;
        font-size: 15px;
    }
    .dayPlanAdd .mint-cell-wrapper,
    .dayPlanAdd .selectInput select {
        font-size: 15px;
    }
    .dayPlanAdd .mint-cell {
        margin-bottom: 10px;
    }

</style>

<style scoped>
    textarea {
        margin-top: 0;
        resize: none;
        padding: 0;
        margin-bottom: 10px;
    }
    .title {
        margin: 25px 0 15px 15px;
        border-left: 3px solid #1B69FE;
        line-height: 1.0;
        padding-left: 6px;
    }
    .my-btn {
        background: #1b69fe;
        position: fixed;
        left: 10%;
        bottom: 5%;
        color: #fff;
        border: 0;
        width: 80%;
        height: 42px;
        border-radius: 4px;
        outline: none;
        font-size: 17px;
    }
</style>
