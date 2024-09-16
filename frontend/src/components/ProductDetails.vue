<template>
    <div class="product-details" v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <div class="actions">
            <button class="edit-btn" @click.stop="editProduct()">Edit</button>
            <button class="delete-btn" @click.stop="deleteProduct()">Delete</button>
          </div>
  </div>
  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script >
import instance from '../axios';

    export default {
        name: 'Dashboard',
        data(){
            return{
                id: this.$route.params.id,
                product: null,
            }
            
        },
        methods: {
            async setupItem(){
                try {
                    const token = localStorage.getItem('token');
                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // console.log(instance);
                    
                    

                    const response = await instance.get(`/products/${this.id}`);
                    this.product = response.data;

                   
                    
                } catch (error){
                    console.error("An error accured during getting product info: ", error);
                }
            },
            async deleteProduct() {
                try {
                const token = localStorage.getItem('token');
                instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
                // Fetch products and assign to the products ref
                const response = await instance.delete(`/products/${this.id}`);
                this.$router.replace('/productlist')

            } catch (error) {
                console.error('An error occurred while deleting products', error);
                }
                
            },
            editProduct(){
              this.$router.push(`/productlist/${this.id}/edit`);
            }
        },
        mounted() {
            this.setupItem();
        },
    }
</script>

<style scoped>
    .product-details {
  max-width: 600px;
  width: 80%;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #666;
  margin: 10px 0;
}

/* Loading state style */
div p {
  text-align: center;
  font-size: 18px;
  color: #999;
}

/* Actions container */
.actions {
  display: flex;
  gap: 15px;
}
button{
    width: 150px;
    padding: 12px 0;
    margin: auto;
}

/* Button base styles */


</style>