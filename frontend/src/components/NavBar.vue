<template>
    <nav>
        <router-link to="/login" v-if="!isLoggedIn">
        Login
        </router-link>
        <router-link to="/register" v-if="!isLoggedIn">
        Register
        </router-link>
        <router-link to="/add-product" v-if="isLoggedIn">
        Add Product
        </router-link>
        <router-link to="/productlist" v-if="isLoggedIn">
        List Products
        </router-link>
        <a href="#" @click="logout" v-if="isLoggedIn">Logout</a>
    </nav>
    
</template>

<script >
import { mapActions, mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            ...mapState(['isLoggedIn']),

        },
        methods: {
            ...mapActions(['logout']),
            
        },
    }
    
</script>

<style>
    /* General styles for the navbar */
nav {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    background-color: #007bff;  /* Navbar background color */
    padding: 10px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Styling for the links */
nav a, nav .router-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    margin-left: 20px;
    transition: color 0.3s ease;
}

/* Hover effect for the links */
nav a:hover, nav .router-link:hover {
    color: #ffdd57;  /* Change to a bright color on hover */
}

/* Active link styles for router-link */
.router-link-active {
    font-weight: bold;
    border-bottom: 2px solid #ffdd57;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
    nav {
        flex-direction: column;
        align-items: flex-start;
    }
    
    nav a, nav .router-link {
        margin-left: 0;
        margin-top: 10px;
    }
}

</style>