<template>

        <form @submit.prevent="login" class='login-form'>
            <input type="email" v-model="email" placeholder="Email" required/>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Login</button>

            
        </form>

</template>

<script>

import instance from '../axios';
import store from '../store';

    export default {
        data(){
            return {
                email: '',
                password: '',
            };
        },

        methods: {
            async login(){
                
                
                try {
                    const response = await instance.post('/login', {
                        email: this.email,
                        password: this.password,
                    })
                    console.log(response);
                    

                    if(response.data.token){
                        localStorage.setItem('token', response.data.token);
                    }

                    this.$store.commit('LOGIN');
                    console.log(store.state.isLoggedIn);
                    
                    this.$router.push('/')
                } catch (error) {
                    console.error('An error accured' , error);
                    
                }
            }
        },
    }

</script>


<style >
/* General styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
}

/* Form container */
.login-form {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Input fields */
.login-form input {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease;
}

.login-form input:focus {
    border-color: #007bff;
    outline: none;
}

/* Submit button */
.login-form button {
    width: 100%;
    padding: 12px 15px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-form button:hover {
    background-color: #0056b3;
}

/* Optional: Add a slight hover effect to the inputs */
.login-form input:hover {
    border-color: #007bff;
}

/* Media query for mobile responsiveness */
@media (max-width: 600px) {
    .login-form {
        width: 90%;
    }
}

</style>