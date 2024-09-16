<template>

    <form @submit.prevent="submitUpdateForm" class="edit-product-form">
      <input type="text" class="input-field" v-model="product.name" placeholder="Product Name" />
      <p v-if="product.errors.name" class="error">{{ product.errors.name }}</p>
  
      <input type="text" class="input-field" v-model="product.description" placeholder="Product Description" />
      <p v-if="product.errors.description" class="error">{{ product.errors.description }}</p>
  
      <input type="number" step="0.01" class="input-field" v-model="product.price" placeholder="Product Price" />
      <p v-if="product.errors.price" class="error">{{ product.errors.price }}</p>
  
      <button type="submit" class="submit-btn">Update Product</button>
    </form>
  </template>
  

<script>
import instance from '../axios';

    export default {
        name: 'Dashboard',
        data(){
            return{
                id: this.$route.params.id,
                product: {
                    name: '',
                    description: '',
                    price: '',
                    errors: {
                        
                    }
                }
            }
            
        },
        methods: {
            async fetchData(){
                try{
                    const token = localStorage.getItem('token');
                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    const response = await instance.get(`/products/${this.id}`);
                    const product = response.data;
                    // Pre-fill form fields with the product data
                    this.product.name = product.name;
                    this.product.description = product.description;
                    this.product.price = product.price;
                } catch (error) {
                    console.error('An error occurred while fetching product: ', error);
                }
            },
            validateInput(){
            const errors = {};
            if(!this.product.name) errors.name = 'Name is required';
            if(!this.product.description) errors.description = 'Description is required';
            if(!this.product.price || isNaN(this.product.price)) errors.price = 'Price is required as a number';
            console.log(errors);
            

            return errors;
        },
            async submitUpdateForm(){
                let errors = this.validateInput();
                if(Object.keys(errors).length > 0){
                    this.product.errors = errors;
                    return;
                    
                }

                try {
                    const token = localStorage.getItem('token');
                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    const response = await instance.put(`/products/${this.id}`,{
                        name: this.product.name,
                        description: this.product.description,
                        price: this.product.price,

                        
                    });

                    this.$router.push('/productlist');
                    
                } catch (error) {
                    console.error('An error accured when updating product: ', error);
                    
                }


                
            }
            
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<style scoped>
    /* Similar styles to the Add Product form */
.edit-product-form {
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

.input-field {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.error {
  color: #dc3545;
  font-size: 14px;
}

.submit-btn {
  padding: 12px 15px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>