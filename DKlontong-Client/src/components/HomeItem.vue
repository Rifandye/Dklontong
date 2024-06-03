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
        <div class="product-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Width</th>
                <th>Length</th>
                <th>Height</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td class="product-image">
                  <img
                    :src="product.image"
                    alt="Product Image"
                    @click="navigateToProductDetail(product._id)"
                  />
                </td>
                <td>{{ product.sku }}</td>
                <td class="product-name">{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td class="product-category">{{ product.categoryName }}</td>
                <td class="product-price">{{ formatPrice(product.price) }}</td>
                <td>{{ product.weight }}</td>
                <td>{{ product.width }}</td>
                <td>{{ product.length }}</td>
                <td>{{ product.height }}</td>
                <td class="product-button">
                  <button
                    class="edit-button"
                    @click="navigateToEditProduct(product._id)"
                  >
                    Edit
                  </button>
                  <button
                    class="delete-button"
                    @click="deleteProduct(product._id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="page <= 1">Previous</button>
          <span>Page {{ page }} of {{ totalPage }}</span>
          <button @click="nextPage" :disabled="page >= totalPage">Next</button>
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

.product-table {
  margin: 30px;
  width: 100%;
}

.product-table table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.product-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

img {
  width: 60px;
  height: 60px;
  cursor: pointer;
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

.product-name {
  font-size: 17px;
  font-weight: bold;
  color: #333;
}

.product-category {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
}

.product-price {
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

  .product-table {
    margin: 15px;
    width: 100%;
  }

  .product-table table {
    font-size: 12px;
  }

  .product-table td .product-image img {
    width: 40px;
    height: 40px;
  }

  .product-button button {
    font-size: 12px;
    height: 30px;
    width: 80px;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .product-table {
    margin: 20px;
  }

  .product-table td .product-image img {
    width: 45px;
    height: 45px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .product-table {
    margin: 30px;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .product-table {
    margin: 40px;
  }

  .product-table td .product-image img {
    width: 50px;
    height: 50px;
  }
}

@media screen and (min-width: 1201px) and (max-width: 1400px) {
  .product-table {
    margin: 50px;
  }
}

@media screen and (min-width: 1401px) and (max-width: 1600px) {
  .product-table {
    margin: 60px;
  }
}
</style>
