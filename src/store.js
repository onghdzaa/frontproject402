import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
//import VueSession from 'vue-session';
Vue.use(Vuex);
//Vue.use(VueSession);
export default new Vuex.Store({
  state: {
    staff: [],
    bookinghistory: [],
    listcustomer: [],
    calender: [],
    listprice: [],
    listrider:[],
    listtoday:[],
  },
  mutations: {
    set_staff: (state, staff) => (state.staff = staff),
    set_bookinghistory: (state, bookinghistory) =>
      (state.bookinghistory = bookinghistory),
    set_customer: (state, listcustomer) => (state.listcustomer = listcustomer),
    set_calender: (state, calender) => (state.calender = calender),
    set_listprice: (state, listprice) => (state.listprice = listprice),
    set_listrider: (state, listrider) => (state.listrider = listrider),
    set_listtoday: (state, listtoday) => (state.listtoday = listtoday),
  },
  actions: {
    set_staff: ({ commit }) =>
      axios
        .get("https://appcarwashbackend.herokuapp.com/staff")
        .then((res) => commit("set_staff", res.data)),
    set_bookinghistory: ({ commit }, id) =>
      axios
        .get("https://appcarwashbackend.herokuapp.com/apix/apix/"+id)
        .then((res) => commit("set_bookinghistory", res.data)),
    set_customer: ({ commit }) =>
      axios
        .get("https://appcarwashbackend.herokuapp.com/listcustomer")
        .then((res) => commit("set_customer", res.data)),
    set_calender: ({ commit }) =>
      axios
        .get("https://appcarwashbackend.herokuapp.com/calender")
        .then((res) => commit("set_calender", res.data)),
    set_listprice: ({ commit }) =>
      axios
        .get("https://appcarwashbackend.herokuapp.com/listprice")
        .then((res) => commit("set_listprice", res.data)),
        set_listrider: ({ commit }, id) =>
        axios
          .get("https://appcarwashbackend.herokuapp.com/listrider",{ params: { status: "กำลังดำเนินการ" ,id:id}})
          .then((res) => commit("set_listrider", res.data)),
          set_listtoday: ({ commit }) =>
          axios
            .get("https://appcarwashbackend.herokuapp.com/calender/today")
            .then((res) => commit("set_listtoday", res.data)),
  },
});
