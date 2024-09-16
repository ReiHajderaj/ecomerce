<template>
    <form @submit.prevent="submitForm" class="add-product-form">
        <input type="text" class="input-field" v-model="name" placeholder="Product Name"/>
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
        <input type="text" class="input-field" v-model="description" placeholder="Product Description"/>
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
        <input type="number" step="0.01" class="input-field" v-model="price" placeholder="Product Price"/>
        <p v-if="errors.price" class="error">{{ errors.price }}</p>
         <button type="submit" class="submit-btn">Add Product</button>
    </form>
</template>

<script>
import instance from '../axios';


export default {
    data(){
        return{
            name: '',
            description: '',
            price: '',
            errors: {
                
            }
        }
    },
    methods: {
        validateInput(){
            const errors = {};
            if(!this.name) errors.name = 'Name is required';
            if(!this.description) errors.description = 'Description is required';
            if(!this.price || isNaN(this.price)) errors.price = 'Price is required as a number';

            return errors;
        },
        async submitForm(){

            const errors = this.validateInput();
            if(Object.keys(errors).length > 0){
                this.errors = errors;
                return;
                
            }

            try {
                const token = localStorage.getItem('token');
                instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // console.log(instance);
                
                

                await instance.post('/products', {
                    name: this.name,
                    description: this.description,
                    price: this.price,
                })

                this.$router.push('/');
                
            } catch (error) {
                console.error('An error accured while adding product', error);
                
            }
        }
    }
    
}

</script>

<style >
/* General form styles */
.add-product-form {
    width: 100%;
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Input field styles */
.input-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Focused input style */
.input-field:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    outline: none;
}

/* Submit button styles */
.submit-btn {
    padding: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Submit button hover effect */
.submit-btn:hover {
    background-color: #218838;
}

/* Error message styles (uncommented in HTML for use) */
.error {
    color: #dc3545;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
}

/* Responsive design */
@media (max-width: 600px) {
    .add-product-form {
        width: 90%;
    }
}

</style>