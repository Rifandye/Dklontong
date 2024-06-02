<template>
  <section>
    <div class="form-container">
      <h2>Add Product</h2>
      <form @submit.prevent="handleSubmitProduct">
        <div class="form-grid">
          <div class="form-group">
            <label for="sku">SKU:</label>
            <input type="text" id="sku" v-model="sku" placeholder="Enter SKU" />
          </div>
          <div class="form-group">
            <label for="categoryName">Category Name:</label>
            <select id="categoryName" v-model="categoryName" required>
              <option disabled value="">Please select one</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Enter product name"
            />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              v-model="description"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              v-model.number="weight"
              placeholder="Enter product weight"
            />
          </div>
          <div class="form-group">
            <label for="width">Width:</label>
            <input
              type="number"
              id="width"
              v-model.number="width"
              placeholder="Enter product width"
            />
          </div>
          <div class="form-group">
            <label for="length">Length:</label>
            <input
              type="number"
              id="length"
              v-model.number="length"
              placeholder="Enter product length"
            />
          </div>
          <div class="form-group">
            <label for="height">Height:</label>
            <input
              type="number"
              id="height"
              v-model.number="height"
              placeholder="Enter product height"
            />
          </div>
          <div class="form-group">
            <label for="image">Image URL:</label>
            <input
              type="text"
              id="image"
              v-model="image"
              placeholder="Enter A Dummy or Real Url"
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              type="number"
              id="price"
              v-model.number="price"
              placeholder="Enter product price"
            />
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sku: "",
      categoryName: "",
      name: "",
      description: "",
      weight: 0,
      width: 0,
      length: 0,
      height: 0,
      image: "",
      price: 0,
      categories: [],
    };
  },

  methods: {
    async handleSubmitProduct() {
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/products",
          data: {
            sku: this.sku,
            categoryName: this.categoryName,
            name: this.name,
            description: this.description,
            weight: this.weight,
            width: this.width,
            length: this.length,
            height: this.height,
            image: this.image,
            price: this.price,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        console.log(response.data);

        this.$router.push({ name: "home" });
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || "Something went wrong!",
        });
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
  },

  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}

.form-container {
  max-width: 800px;
  margin: 80px auto;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333333;
  font-size: 28px;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #555555;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fdfdfd;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  background-color: black;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
