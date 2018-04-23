<template>
    <div class="sign">
        <div id="myMap"></div>
        <div id="r-result"></div>
        <!-- <mt-search v-model="value" cancel-text="Cancel" placeholder="Search"></mt-search> -->
        <div class="search-bar">
            <span class="mintui mintui-search" :class="[value?'isFocus':'']"></span>
            <input type="text" placeholder="搜索地点或地址" v-model="value"  @keyup.13="search">
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-cell v-for="(item, key) in searchResult" :key="key" :title="item.title" :label="item.address" @click.native="reLocal(item.title)">
                <span v-if="item.isShow" @click.stop="goSign(item.title)">去签到</span>
            </mt-cell>
        </mt-popup>
        <span class="mySign" @click="goPage">我的签到 ></span>
    </div>
</template>

<script>
    export default {
        name: 'sign',
        data () {
            return {
                value: '',
                map: {},
                searchResult: [],
                popupVisible: false,
                addressInfo: {}
            }
        },
        mounted () {
            if (this.$route.params.address) {
                this.value = this.$route.params.address;
            };
            this.map = new BMap.Map('myMap');
            var point = new BMap.Point(114.02597366, 22.54605355);
            this.map.centerAndZoom(point, 13);
            // 坐标转换完之后的回调函数
            var translateCallback = function (data) {
                if (data.status === 0) {
                    var marker = new BMap.Marker(data.points[0]);
                    bm.addOverlay(marker);
                    var label = new BMap.Label('转换后的百度坐标（正确）', {offset: new BMap.Size(20, -10)});
                    marker.setLabel(label); // 添加百度label
                    bm.setCenter(data.points[0]);
                }
            }
            // 添加定位控件
            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener('locationSuccess', (e) => {
                // 定位成功事件
                console.log(e.point)
                this.value = e.addressComponent.province + e.addressComponent.city + e.addressComponent.district + e.addressComponent.street + e.addressComponent.streetNumber;
                this.search()
                // 坐标转换
                setTimeout(function () {
                    var convertor = new BMap.Convertor();
                    var pointArr = [];
                    pointArr.push(e.point);
                    convertor.translate(pointArr, 1, 5, translateCallback)
                }, 500)
            });
            geolocationControl.addEventListener('locationError', (e) => {
                // 定位失败事件
                alert(e.message);
            });
            this.map.addControl(geolocationControl);
            // 定位
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                    geolocationControl.location()
                } else {
                    alert('failed' + this.getStatus());
                }
            }, {enableHighAccuracy: true})
            console.log(translateCallback)
        },
        methods: {
            search () {
                if (this.value === '') return false;
                var self = this;
                self.searchResult = [];
                var options = {
                    onSearchComplete: function (results) {
                        // 判断状态是否正确
                        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var isShow = false;
                                i === 0 ? isShow = true : isShow = false;
                                var data = {
                                    title: results.getPoi(i).title,
                                    address: results.getPoi(i).address,
                                    isShow
                                }
                                self.searchResult.push(data)
                            }
                            self.addressInfo = results.zr[0]
                            // console.log(results)
                            var addressArr = [];
                            for (var j = 0; j < self.searchResult.length; j++) {
                                addressArr[j] = JSON.stringify(self.searchResult[j]);
                            };
                            localStorage.searchResult = addressArr;
                        }
                    },
                    renderOptions: {map: self.map}
                };
                var local = new BMap.LocalSearch(this.map, options);
                local.search(this.value);
                this.popupVisible = true;
                $('.search-bar input').blur();
            },
            reLocal (obj) {
                this.value = obj;
                this.search();
            },
            goSign () {
                var data = {
                    x_coor: this.addressInfo.point.lng,
                    y_coor: this.addressInfo.point.lat,
                    addr: this.addressInfo.title
                }
                localStorage.address = JSON.stringify(data);
                this.$router.push({name: 'signPage', params: data})
            },
            goPage () {
                this.$router.push({name: 'lineLog'})
            }
        }
    }
</script>

<style>
    .sign .BMap_geolocationAddress {
        display: none;
    }
    .sign .mint-popup-bottom {
        width: 100%;
        max-height: 340px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .sign .mint-cell:first-child,
    .sign .mint-cell:last-child {
        background: none;
    }
    .sign .v-modal {
        background: none;
    }
    .sign .mint-cell-value {
        font-size: 14px;
        color: #1B69FE;
    }
    .anchorBL img {
        display: none;
    }
    .sign .BMap_noprint.anchorBL {
        bottom: 15px !important;
        left: 15px !important;
    }
    .sign .mint-cell-wrapper {
        overflow-y: scroll;
        height: auto;
        min-height: 55px;
    }
</style>
<style scoped>
    #myMap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin:0;
        font-family:"微软雅黑";
        position: absolute;
    }
    .mySign {
        position: absolute;
        bottom: 15px;
        right: 15px;
        font-size: 14px;
        display: inline-block;
        padding: 5px 15px;
        background: #fff;
        color: #1b69fe;
        border-radius: 20px;
    }
    .search-bar {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    .search-bar span {
        position: absolute;
        left: 30%;
        top: 21px;
        color: #ccc;
        transition: all 0.2s;
    }
    .search-bar span.isFocus {
        left: 30px;
    }
    .search-bar input {
        width: 100%;
        height: 25px;
        border: 0;
        border-radius: 25px;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
        text-align: center;
        font-size: 14px;
    }
</style>