<template>
  <section class="edit-product">
    <h2>Edit Product</h2>
    <form @submit.prevent="editProduct">
      <div class="form-group">
        <label for="sku">SKU:</label>
        <input type="text" id="sku" v-model="sku" required />
      </div>
      <div class="form-group">
        <label for="category">Category Name:</label>
        <input type="text" id="category" v-model="categoryName" required />
      </div>
      <div class="form-group">
        <label for="name">Product Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="weight">Weight (g):</label>
        <input type="number" id="weight" v-model="weight" required />
      </div>
      <div class="form-group">
        <label for="dimensions">Dimensions (WxLxH cm):</label>
        <div class="dimension-inputs">
          <input type="number" id="width" v-model="width" required />
          <input type="number" id="length" v-model="length" required />
          <input type="number" id="height" v-model="height" required />
        </div>
      </div>
      <div class="form-group">
        <label for="image">Image URL:</label>
        <input type="url" id="image" v-model="image" required />
      </div>
      <div class="form-group">
        <label for="price">Price (RP.):</label>
        <input type="number" id="price" v-model="price" required />
      </div>
      <button type="submit">Save Changes</button>
    </form>
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
      product: {},
      categories: [],
    };
  },

  created() {
    this.fetchProduct();
  },

  methods: {
    async fetchProduct() {
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:3000/products/${this.$route.params.id}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        const productData = response.data;
        this.sku = productData.sku;
        this.categoryName = productData.categoryName;
        this.name = productData.name;
        this.description = productData.description;
        this.weight = productData.weight;
        this.width = productData.width;
        this.length = productData.length;
        this.height = productData.height;
        this.image = productData.image;
        this.price = productData.price;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    async editProduct() {
      try {
        const response = await axios({
          method: "PUT",
          url: `http://localhost:3000/products/${this.$route.params.id}`,
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

        this.$router.push({
          name: "product-detail",
          params: { id: this.$route.params.id },
        });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.edit-product {
  max-width: 600px;
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

.dimension-inputs {
  display: flex;
}

.dimension-inputs input {
  flex: 1;
  margin-right: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #ccc;
}
</style>
