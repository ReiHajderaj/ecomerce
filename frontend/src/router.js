import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import AddProducts from "./components/AddProducts.vue";
import ProductList from "./components/ProductList.vue";
import ProductDetails from "./components/ProductDetails.vue";
import EditProduct from "./components/EditProduct.vue";




const routes = [
    {
        path:'/login',
        name: 'login',
        component: Login,
        meta: {public: true}
    },
    {
        path:'/register',
        name: 'register',
        component: Register,
        meta: {public: true}
    },
    {
        path:'/',
        name: 'dashboard',
        component: Dashboard,
        meta: {public: false}
    },
    {
        path:'/add-product',
        name: 'add-product',
        component: AddProducts,
        meta: {public: false}
    },
    {
        path:'/productlist',
        name: 'productlist',
        component: ProductList,
        meta: {public: false}
    },
    {
        path:'/productlist/:id',
        name: 'ViewProduct',
        component: ProductDetails,
        meta: {public: false}
    },
    {
        path:'/productlist/:id/edit',
        name: 'EditProduct',
        component: EditProduct,
        meta: {public: false}
    },

]


const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to, from, next)=>{
    const isAuthenticated = !!localStorage.getItem('token');
    
    if(!to.meta.public && !isAuthenticated){
        next({name: 'login'});
    }else if (to.meta.public && isAuthenticated){
        next({name: 'dashboard'});
    }else{
        next();
    }


})

export default router;

