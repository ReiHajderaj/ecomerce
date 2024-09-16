import { createStore } from "vuex";
import router from "./router";
const store = createStore({
    state:{
        isLoggedIn: !!localStorage.getItem('token'),
    },
    mutations: {
        LOGIN(state){
            state.isLoggedIn = true;
        },
        LOGOUT(state){
            state.isLoggedIn = false;
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
        },
    },
    actions: {
        login({ commit }){
            commit('LOGIN');
        },
        logout({ commit, dispatch }){
            commit('LOGOUT');
            dispatch('navigateToLogin');
        },
        navigateToLogin(){
            router.push({name: 'login'})
        }
    },

})


export default store;