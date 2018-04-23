<template>
    <div class="reminderTime">
        <ul>
            <li @click="selectTime(-1)" :class="{'active': isActive == -1}">暂不提醒</li>
            <li v-for="(item, index) in times" :class="{'active': index + 1 == isActive}" @click="selectTime(index)">提前{{item.label}}分钟</li>
        </ul>
        <!-- <p @click="goBack" class="close">
            关闭
        </p> -->
    </div>
</template>

<script>
    export default {
        name: 'reminderTime',
        data () {
            return {
                times: [
                    {value: 1, label: 5},
                    {value: 2, label: 10},
                    {value: 3, label: 15},
                    {value: 4, label: 30},
                    {value: 5, label: 60}
                ],
                isActive: 5,
                id: ''
            };
        },
        mounted () {
            this.id = this.$route.params.id;
            myFn.ajax('get', {id: this.id}, apiAddress.calendar.getAdvance, (res) => {
                this.isActive = res.data.advance_type || -1;
            });
        },
        methods: {
            selectTime (index) {
                var data = {
                    id: this.id
                }
                if (parseInt(index) !== -1) {
                    this.isActive = this.times[index].value;
                    data.advance_type = this.times[index].value;
                } else {
                    this.isActive = -1;
                    data.advance_type = 0;
                }
                myFn.ajax('post', data, apiAddress.calendar.setAdvance, (res) => {
                    this.$router.go(-1);
                })
            },
            goBack () {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped>
    ul, .close {
        border-top: 1px #e6e6e6 solid;
        border-bottom: 1px #e6e6e6 solid;
        padding: 0 15px;
        background: #fff;
        line-height: 50px;
    }
    ul li {
        border-bottom: 1px #e6e6e6 solid;;
    }
    ul li:last-child {
        border: none;
    }
    .close {
        margin-top: 10px;
    }
    .active {
        color: #1b69fe;
    }
</style>