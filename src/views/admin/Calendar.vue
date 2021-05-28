<template>
  <Layout>
  
     <div slot="buttons" class="form-group">
      <router-link
        class="btn"
        style="
          background-color: #17a2bb;
          color: #fff;
          margin-right: 10px;
          width: 15%;
          font-size: 17px;
          border-radius: 4px;
          margin-bottom: 15px;
          min-width: 130px;
        "
        to="/admin/Calendar"
        >ตารางงานพนักงาน</router-link
      >
      <!-- ปุ่มรีเซ็ทข้อมูล -->
      <div
        class="btn"
        style="
          background-color: #ed2939;
          color: #fff;
          margin-right: 10px;
          width: 15%;
          font-size: 17px;
          border-radius: 4px;
          margin-bottom: 15px;
          min-width: 130px;
        "
         @click="reset()" 
        >รีเซ็ตข้อมูล</div
      >
      
    </div>
    <div class="card">

      <div
        class="card-body"
        style="
          padding-left: 9%;
          padding-right: 9%;
          margin-left: 0%;
          margin-right: 0%;
          text-align: left;
          font-size: 22px;
        "
      >
        <br />
        <header class="mb-4" >
          <i class="fa fa-calendar"> </i>
            แสดงตารางงานของพนักงาน
         
                    
        </header>
        
        <div class="table-responsive">
   <table class="table" style="font-size: 17px;white-space: nowrap">
          <thead>
            <tr >
              <th  >รูป</th>
              <th>เวลา</th>
              <th>ชื่อ-นามสกุล</th>
              <th>เบอร์ติดต่อ</th>
              <th>ทะเบียนรถ</th>
              <th>ที่อยู่</th>
              <th>รหัส</th>
              
              <th>สถานะ</th>
              <th>ยกเลิกงาน</th>
              <hr />
              <!-- <th></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in calender" :key="employee.id">
              <td>
                 <div class="help" style="font-size:1px;color:#fff">================</div>
                <div class="img-container">
                  <expandable-image v-bind:src="employee.img" alt="employee" />
                </div>
                <!-- <div class="help" style="font-size:1px;color:#fff">================</div> -->
              </td>
               <td>{{employee.time}}</td>
              <td>{{employee.name_member}} </td>
                    <td>{{employee.tel_member}}</td>
                     <td>{{employee.numcar}}</td>
                       <td>{{employee.address}}</td>
                     <td>{{employee.id}}</td>
                   <td> 
                     
                    <label class="badge badge-success" style="color:black" v-if="employee.status == 'เสร็จสิ้น'">
                        <i class="fa fa-check-square-o" style="color:black"></i> {{employee.status}}
                     </label>
                      <label class="badge badge-warning"  style="width:100%; background-color:#FFCC33;" v-if="employee.status != 'เสร็จสิ้น'">
                        <i class="fa fa-hourglass" style="color:black"></i> {{employee.status}}
                     </label> </td>
                   <td class="text-right">
                <!-- <i  
                 @click="gotoEdit()"
                  class="pointer fa fa-pencil-square"
                  style="padding-right: 19%; color: #17a2bb"
                >
                </i> -->
                  <button type="submit" @click="cancelButton(employee.id)" class="btn btn-info btn-block" style=" margin-top: 10px;  background-color: #ed2939;color:#fff;">
                  ยกเลิกงาน
                </button>
                <!-- <i @click="onDelete(sv)" class="fa fa-arrow-circle-right" style="background-color: #ed2939"> ทำเลย</i> -->
              </td>
                     <!-- เชื่อมกับสถานะเพื่อเปลี่ยนไอคอน -->
                       <!-- <label class="badge badge-success" v-if="item.bk_status == 'allowed'">
                                    <i class="fa fa-check-square-o"></i> อนุมัติแล้ว
                                </label>

                                <label class="badge badge-danger" v-if="item.bk_status == 'not allowed'">
                                    <i class="fa fa-window-close"></i> ไม่สำเร็จ
                                </label> -->

                    
              
             
            </tr>
          </tbody>
        </table>
         </div>
 
      </div>
    </div>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import {mapState} from "vuex";
import axios from "axios";
export default {
components: { Layout },
computed:{
    ...mapState(["calender"])
  },
  created(){
this.$store.dispatch("set_calender");
  },

  methods: {
    cancelButton(id){
 this.alertify.confirm('<em> แจ้งเตือน ! </em>', 'คุณต้องการจะลบข้อมูลนี้ใช่หรือไม่ ?', function(){
        
         axios.delete('https://appcarwashbackend.herokuapp.com/deletelistcustomer',{params:{id:id}}).then(res=>{
        console.log(res.status);
            })
            .catch(error =>{ 
                console.error(error);
           });
            }, function(){});


    },
   
    reset(){
         axios.put('https://appcarwashbackend.herokuapp.com/reset').then(res=>{
                  console.log(res.status);
            })
            .catch(error =>{ 
                console.error(error);
           });
    }
    
  },
 data() {
        return {
            employees: [
                { time:'08.00-09.00', name: 'Frank phy', tel: '0908801234', numcar:'กข123',address:'14/53 มหาวิทยาลัยธรรมศาสตร์.',id: '01' },
                { time:'09.00-10.00',name: 'Vic Reynolds', tel: '0908801234' , numcar:'กข123', address:'14/53 มธ.',id: '02'},
                { time:'10.00-11.00', name: 'Gina Jabowski', tel: '0908801234' ,  numcar:'กข123',address:'14/53 มธ.',id: '03'},
                
            ]
        };
    },
}
</script>

<style>

</style>