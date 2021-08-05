<template>
    <!-- <van-area class="addressList" title="地址列表" item-height="28" :area-list="areaList"
     :columns-num="2" @confirm="pickArea" />
     <table class="addressTable" style="width:100%">
         <thead>
            <tr>
                 <th width="">名稱/類別</th>
                 <th>地址</th>
                 <th>營業時間</th>
            </tr>
         </thead>
         <tbody>
             <tr class="list-tr" v-for="item in tableData" :key="item.address">
                <td>{{item.name}}</td>
                <td>{{item.address}}</td>
                <td>{{item.time}}</td>
            </tr>
         </tbody> -->
     <!-- </table> -->

    <van-tabs v-model="active">
        <van-tab class="tab_content" title="九龍" name="kowloon" v-model="isFirstLoad">
            <div class="addressBox" v-for="item in kwAddress" :key="item.address">
                <p>名稱/類別：{{item.name}}</p>
                <p>地址：{{item.address}}</p>
                <p>營業時間：{{item.time}}</p>
            </div>
        </van-tab>
        <van-tab title="港島" name="hongkongIsland"  > 
            <div class="addressBox"  v-for="item in hkAddress" :key="item.address">
                <p>名稱/類別：{{item.name}}</p>
                <p>地址：{{item.address}}</p>
                <p>營業時間：{{item.time}}</p>
            </div></van-tab>
        <van-tab title="新界" name="newTerritories" >
             <div class="addressBox"  v-for="item in ntAddress" :key="item.address">
                <p>名稱/類別：{{item.name}}</p>
                <p>地址：{{item.address}}</p>
                <p>營業時間：{{item.time}}</p>
            </div>
        </van-tab>
    </van-tabs>
</template>


<script>
import VueCookies from 'vue-cookies'
import axios from "axios";
// import {Toast} from "vant";
var arrayKW=[];
var arrayHK=[];
var arrayNT=[];
export default({
    name:'AddressList',
    beforeMount(){
        // console.log(VueCookies.get("LoginStatus"));
        // if(VueCookies.get("LoginStatus")==null){
        // window.location.href = "./";
        // }
        const aresheaders = {
            "Content-Type" : "application/json; charset=utf-8",
        }
        var instance=axios.create({
            baseURL:''
        });
        instance.get("./address.json",{aresheaders})
        .then((response) => {
        let data=response.data;
        for(var i=0;i<data.length; i++){
            if(data[i].type=="kowloon"){
                arrayKW.push(data[i]);
            }else if(data[i].type=="hongkong"){
                arrayHK.push(data[i]);

            }else{
                arrayNT.push(data[i]);
            }
        }
        this.isFirstLoad=true;
        console.log(data);
        }).catch(error => {
                console.log(error);
        })

    },
    setup() {
        // const areaList={
        //     province_list: {
        //         110000: '香港特別行政區',
                
        //     },
        //     city_list: {
        //         110100: '九龍',
        //         110200: '香港島',
        //         110300: '新界',
        //     },
        //     county_list: {
        //         110101: '东城区',
        //         110102: '西城区',
                
        //     },
        // };
        // return{
        //     hkAddress:arrayHK,
        //     kwAddress:arrayKW,
        //     ntAddress:arrayNT
        // }
        
        
    },
    data(){
        return{
            LoginStatus:VueCookies.get("LoginStatus"),
            isFirstLoad:false,
            hkAddress:arrayHK,
            kwAddress:arrayKW,
            ntAddress:arrayNT
        }
    },
    methods:{
       
    }
})
</script>
<style scoped>
.addressList{
    background:#F0F8FF ;
}
.container .addressTable{
    text-align: center;
    word-break: break-all;
    border-spacing: 0;
    border-collapse: collapse;
}
.addressTable thead tr{
    background: #F0F8FF;
}
.addressTable tr th{
    border: 1px solid #fff;
}
.addressTable tr td{
    border: 1px solid #ebebeb
}
.addressBox{
    width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 5px 5px #f0f0f0;
    margin-top: 20px;
    padding: 15px;
    background: #ffffff;
}
.addressBox p{
    margin: 10px 0;
}
.van-tabs{
    padding-bottom: 30px;
}
</style>