Copy code
<template>
  <div class="test">
    <section>
      <div class="product-container">
        <div class="bar-container">
          <div class="add-product">
            <router-link to="/add-product">
              <button>Add Product</button>
            </router-link>
          </div>
          <div class="search-bar">
            <input
              type="search"
              v-model="searchTerm"
              @input="searchProducts"
              placeholder="Search products..."
            />
          </div>
          <div class="dropdown">
            <select v-model="selectedCategory" @change="filterByCategory">
              <option value="">All Categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="product-card">
          <div v-for="product in products" :key="product._id" class="product">
            <div
              class="product-image"
              @click="navigateToProductDetail(product._id)"
            >
              <img :src="product.image" alt="Product Image" />
            </div>
            <div class="product-name">
              <span class="name">{{ product.name }}</span>
            </div>
            <div class="product-category">
              <span class="category">{{ product.categoryName }}</span>
            </div>
            <div class="product-price">
              <span class="price">{{ formatPrice(product.price) }}</span>
            </div>
            <div class="product-button">
              <button
                class="edit-button"
                @click="navigateToEditProduct(product._id)"
              >
                Edit
              </button>
              <button class="delete-button" @click="deleteProduct(product._id)">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="page <= 1">Previous</button>
          <span>Page {{ page }} of {{ totalPage }}</span>
          <button @click.stop="nextPage" :disabled="page >= totalPage">
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      page: 1,
      dataPerPage: 10,
      totalPage: 1,
      searchTerm: "",
      selectedCategory: "",
      categories: [],
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/products",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          params: {
            page: this.page,
            search: this.searchTerm,
            filter: this.selectedCategory,
          },
        });

        console.log(response.data);
        this.products = response.data.data;
        this.page = response.data.page;
        this.totalPage = response.data.totalPage;
        this.dataPerPage = response.data.dataPerPage;
      } catch (error) {
        console.error("Error fetching products:", error.response.data);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/categories",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        this.categories = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    async deleteProduct(id) {
      try {
        const response = await axios({
          method: "DELETE",
          url: `http://localhost:3000/products/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        this.$swal({
          title: "Success",
          text: response.data.message,
          icon: "success",
          button: "OK",
        });

        this.products = this.products.filter((product) => product._id !== id);
      } catch (error) {
        console.log(error.response.data);
      }
    },

    filterByCategory() {
      this.fetchProducts();
    },

    nextPage() {
      if (this.page < this.totalPage) {
        this.page++;
        this.fetchProducts();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchProducts();
      }
    },
    searchProducts() {
      this.fetchProducts();
    },

    navigateToProductDetail(id) {
      this.$router.push({
        name: "product-detail",
        params: { id: id },
      });
    },

    navigateToEditProduct(id) {
      this.$router.push({
        name: "product-edit",
        params: { id: id },
      });
    },

    formatPrice(price) {
      const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return rupiah;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.bar-container {
  display: flex;
  justify-content: space-between;
  margin: 35px;
  align-items: center;
}

.add-product button {
  background-color: #ffbf00;
  border: black 1px solid;
  color: black;
  font-size: 15px;
  font-weight: 500;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  cursor: pointer;
}

.search-bar {
  width: 30%;
  margin: 0 10px;
  flex: 1;
}

.search-bar input[type="search"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid black;
  border-radius: 20px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.search-bar input[type="search"]:focus {
  border-color: #007bff;
  outline: none;
}

.product-container {
  height: 100%;
  display: grid;
  margin: 100px;
  grid-template-rows: auto 1fr auto;
}

.product-card {
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.product {
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 300px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.product-name {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}

.product-category {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}

.product-price {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}

.product-button {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
}

.product-button button {
  background-color: white;
  border: solid #ffbf00 1px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 40px;
  width: 100px;
  cursor: pointer;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

button:hover {
  transition: 0.2s ease-in-out;
}

span {
  margin-left: 10px;
}

.product-name .name {
  font-size: 17px;
  font-weight: bold;
  color: #333;
}

.product-category .category {
  font-size: 0.7em;
  font-weight: normal;
  color: white;
  background-color: #666;
  height: 20px;
  width: auto;
  border-radius: 20px;
  padding: 0 10px;
}

.product-price .price {
  font-size: 1rem;
  font-weight: bold;
  color: black;
}

.edit-button:hover {
  background-color: #007bff;
}

.delete-button:hover {
  background-color: #dc3545;
}

.dropdown {
  position: relative;
  display: inline-block;
  border-radius: 10px;
}

.dropdown select {
  appearance: none;
  background-color: #ffbf00;
  border: solid black 1px;
  padding: 8px 24px 8px 8px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  color: black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown .arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  pointer-events: none;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
}

.pagination button {
  background-color: transparent;
  border: none;
  color: #007bff;
  font-size: 15px;
  cursor: pointer;
  outline: none;
}

.pagination button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  color: #0056b3;
}

.pagination span {
  margin: 0 20px;
  font-size: 16px;
  font-weight: bold;
}

.pagination i {
  margin: 0 5px;
}

@media screen and (max-width: 480px) {
  .product-container {
    justify-items: center;
  }
  .bar-container {
    margin: 15px;
  }

  .search-bar {
    width: 50%;
    margin: 0 5px;
  }

  .dropdown select {
    padding: 8px;
    font-size: 12px;
  }

  .product-card {
    margin: 15px;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }

  .product {
    margin: 5px;
  }

  .product-image {
    height: 200px;
  }

  .product-name .name {
    font-size: 1em;
  }

  .product-category .category {
    font-size: 0.6em;
    padding: 0 5px;
  }

  .product-price .price {
    font-size: 1em;
  }

  .product-button button {
    font-size: 12px;
    height: 30px;
    width: 80px;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .product-card {
    margin: 20px;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .product-card {
    margin: 30px;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .product-card {
    margin: 40px;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  @media screen and (min-width: 1201px) and (max-width: 1400px) {
    .product-card {
      margin: 50px;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
  }

  @media screen and (min-width: 1401px) and (max-width: 1600px) {
    .product-card {
      margin: 60px;
      grid-template-columns: repeat(5, 1fr);
      gap: 35px;
    }
  }
}
</style>
