
<template>
    <div>
      <h1>Product List</h1>

      <ul v-if="products.length">
        <li v-for="product in products" :key="product.id" @click="goToProduct(product.id)">
          <div class="product-info">

            <h2>{{ product.name }}</h2>
            <p>Price: ${{ product.price }}</p>
          </div>
          <div class="actions">
            <button class="edit-btn" @click.stop="editProduct(product.id)">Edit</button>
            <button class="delete-btn" @click.stop="deleteProduct(product.id)">Delete</button>
          </div>
        </li>
      </ul>
      <div v-else>
        <p>Loading product list...</p>
      </div>
    </div>
  </template>
  
  <script >
  import { ref, onMounted } from 'vue'; // Import ref and onMounted
  import instance from '../axios'; // Axios instance

  export default {
    data(){
      return{
        products: [],
      }
      
    },
    methods: {
      async deleteProduct(id) {
        try {
          const token = localStorage.getItem('token');
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
          // Fetch products and assign to the products ref
          const response = await instance.delete(`/products/${id}`);

          this.products.forEach((item, index)=>{
            if( item.id === id){
              this.products.slice(index, 1);
            }
          })

          

          

        } catch (error) {
          console.error('An error occurred while deleting products', error);
        }
        
      },

      goToProduct(id){
        
        this.$router.push(`/productlist/${id}`);
      },
      
      async setupProducts() {
        try {
          const token = localStorage.getItem('token');
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
          // Fetch products and assign to the products ref
          const response = await instance.get('/products');
    // Log the products in the console
          console.log(response);
          this.products = response.data;
          console.log(this.products);
           // Assign data to products
        } catch (error) {
          console.error('An error occurred while fetching products', error);
        }
      },
      editProduct(id){
        this.$router.push(`/productlist/${id}/edit`);
      }

    },
    mounted() {
        this.setupProducts();
    },
  }
  
  // Create a ref for products to store the data

  
  
  // Use the onMounted lifecycle to call setupProducts when the component is mounted
  </script>
  
  <style >
  h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

/* Unordered list container */
ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 900px;
}

/* List item styles */
li {
  display: flex;
  max-width: 500px;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-info {
  
  flex: 1;
  width: 100%;
  align-items: center;
  
}

h2 {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: #444;
}

p {
  margin: 8px 0;
  font-size: 16px;
  color: #666;
}

/* Actions container */
.actions {
  display: flex;
  gap: 15px;
}

/* Button base styles */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Edit button styles */
.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

/* Delete button styles */
.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  li {
    flex-direction: column;
    align-items: flex-start;
    text-align: center
  }

  .actions {
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;
  }

  button {
    width: 150px;
    padding: 12px 0;
    margin: auto;
  }
}

  </style>
  