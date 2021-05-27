
<template>
  <div class="register ">
     
              <!-- รูปโลโก้ -->
              <img src="/img/logoo.png" alt="Logo" class="img-logo">
              <!-- การ์ดทั้งใบ -->
      <div class="card" > 
          <h1 class="card-header" style="margin-top:0% !important;">
            LOGIN
          </h1>
          <div class="card-body" style="margin-left: 15% !important;
    margin-right: 15% !important;" >
                <form 
                @submit.prevent="onsubmit()">
                    <!-- ชื่อผู้ใช้งาน -->
                    <div class="form-group">
                        <label for="">ชื่อผู้ใช้งาน</label>
                        <input type="text" 
                          name="username"
                          v-validate="{required: true}"
                          v-model.trim = form.username 
                          :class="{ 'is-invalid' : errors.has('username')}" 
                          class="form-control" >
                        <span>{{ errors.first('username') }}</span>
                    </div>
                        <br>
                    <!-- รหัสผ่าน -->
                   <div class="form-group">
                        <label for="">รหัสผ่าน</label>
                        <input type="password" 
                            name="password"
                             v-validate="{required: true}"
                            v-model.trim = form.password 
                            :class="{ 'is-invalid' : errors.has('password')}" 
                        class="form-control">
                        <span>{{ errors.first('password') }}</span>
                        <br>
                    </div>
                    
                     <!--ปุ่มเข้าสู่ระบบ --> 
                     <div class="form-group">
                        <button type="submit" v-on:click="login"
                        class="btn btn-info" 
                        style="background-color: #17A2BB; width: 100%;
                        color : #fff ">เข้าสู่ระบบ
                        </button>
                    </div>
                   <br>
                     <!-- ปุ่มไปหน้า ลงทะเบียน  สร้าง@click -->
                     <div class="form-group">
                        <button type="button" 
                        @click="gotoRegister()" 
                        class="btn btn-secondary" 
                        style="margin-top: -27px;width: 100%; margin-bottom: 4%">ลงทะเบียน
                        <br>
                        </button>
                    </div>
                       <div>{{showui()}}</div>
               
                   
                    
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '../firebase'
export default {
    data(){
        return {
            form:{
                username:"",
                password:"",
            },
            users:[]
            
        };
    },
      created () {
  this.requestPermission()
 // firebase.messaging
//    this.messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // Update the UI to include the received message.
//    // appendMessage(payload);
//   });
//    firebase.messaging.onMessage((payload) => {
//        console.log("asdasd");
//     console.log('Message received. ', payload);
//     // Update the UI to include the received message.
//    // appendMessage(payload);
//   });
  },
    methods: {
          showui(){
             firebase.messaging
            // console.log("success");
//return messaging
        },
        
        resetUI() {
    // clearMessages();
    // showToken('loading...');
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    firebase.messaging.getToken({vapidKey: 'BCvtgZGHS60_Ea2BhAzxroi9z8Xkwrf_mt6RYvsl81BTdY-faFjfO2YbQnAMnLq7n_eP0wMHctQOk2nr5FCCjMU'}).then((currentToken) => {
      if (currentToken) {
          console.log(currentToken);
          this.$session.set('key',currentToken);
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    //   showToken('Error retrieving registration token. ', err);
    //   setTokenSentToServer(false);
    });
  },
          requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.resetUI();
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  },
        onsubmit(){
           this.$validator.validateAll().then(valid => {
               console.log(valid);
            const parameters={"username":this.form.username,"password":this.form.password};
            axios.post('https://appcarwashbackend.herokuapp.com/logins',parameters).then(res=>{
                //console.log(res.data.result);
                console.log("ss*");
                console.log(res.data.result)
                this.users=res.data.results;
                if(res.data.result==="successful"&&res.data.type!=1&&res.data.type!=2){
                    
                    this.$router.push({name :"customer-booking"});
                    //console.log(parameters+"sdsddsdsasda");
                      axios.post('https://appcarwashbackend.herokuapp.com/logindata',parameters).then(res=>{
                     console.log(res.data[0].name);
                      const parameterkey={"key":this.$session.get('key'),"id":res.data[0].numid};
                     if(this.$session.get('key')!=undefined){
                         axios.put('https://appcarwashbackend.herokuapp.com/setkey',parameterkey).then(resz=>{
                             console.log(resz.status)
    //console.log(res.data[0].status)
            })
            .catch(error =>{ 
                console.error(error);
            });  
                   // console.log(this.$session.get('key'));
                     }
                   //  const parameters={"username":this.form.username,"password":this.form.password}
              this.$session.start();
            this.$session.set('user',res.data[0].numid);
          // this.$session.set('numcar',res.data[0].numcar);

            })
            .catch(error =>{ 
                console.error(error);
            });
            
                }else if(res.data.result==="successful"&&res.data.type!=2){
            this.$router.push({name :"equipment-list"});
                }else if(res.data.result==="error"){
                  
              axios.post('https://appcarwashbackend.herokuapp.com/loginstaff',parameters).then(ress=>{
                  if(ress.data.result==="successful"){
                        this.$session.start();
                    //console.log(ress.data.id);
                     this.$session.set('user',ress.data.id);
                      this.$router.push({name :"rider-WorkCalendar"});
                  }
            
            })
            .catch(error =>{ 
                console.error(error);
            });

             
                }
           
                
            })
            .catch(error =>{ 
                console.error(error);
            });
               //console.log(this.form);
           });
        },
        gotoRegister(){
            this.$router.push({name :"register"})
        },
        login(){
            // console.log("s");
            // const parameters={"username":this.form.username,"password":this.form.password};
            // axios.post('http://localhost:5000/logins',parameters).then(res=>{
            //     console.log(res.data.result);
            //     console.log("ss");
            //     this.users=res.data.results;
            //     if(res.data.result==="successful"){
            //          console.log("ss");
            //        this.$router.push({name :"register"})
            //     }
                
            // })
            // .catch(error =>{ 
            //     console.error(error);
            // });
        }
        
    }
}
</script>

<style scope>
.login {
    max-width: 600px;
    margin: 3% auto;
}
.img-logo {
    /* โลโก้ */
    width: 100%;
    display: block;
    margin: auto;
    
    margin-bottom: 10px;
}
h1{
   /* แต่งฟ้อนท์ */
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 5px;
}
.card .card-body{
    /* ขอบซ้ายขวาของการ์ด */
    margin-left: 15% ;
    margin-right: 15% ;
}
.form-group{
    /* ขนาด,สีของชื่อฟอร์ม */
    color: dimgray;
    font-size: 18px;
}

.btn{
    width: 100%;
    font-size: 16px;
   
}
.btn:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

@media screen and (max-width: 575.98px) {
 
 .card  .card-body{
    /* ขอบซ้ายขวาของการ์ด */
    margin-left: 10px ;
    margin-right: 10px ;
}
.login {
    /* padding-left: 10px;
    padding-right: 10px; */
    margin-left: 10px !important;
    margin-right: 10px !important;
    /* max-width: 600px;
    margin: 3% auto; */
}
.img-logo {
    /* โลโก้ */
    width: 100%;
    /* margin-top: 0% !important; */
    /* display: block;
    margin: auto;
    
    margin-bottom: 10px; */
}
.card-header{
    margin-top:0% !important;
}

  
}
</style>