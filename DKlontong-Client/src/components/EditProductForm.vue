<template>
  <section class="edit-product">
    <h2>Edit Product</h2>
    <form @submit.prevent="editProduct">
      <div class="form-group">
        <label for="sku">SKU:</label>
        <input type="text" id="sku" v-model="sku" />
      </div>
      <div class="form-group">
        <label for="category">Category Name:</label>
        <input type="text" id="category" v-model="categoryName" />
      </div>
      <div class="form-group">
        <label for="name">Product Name:</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label for="weight">Weight (g):</label>
        <input type="number" id="weight" v-model="weight" />
      </div>
      <div class="form-group">
        <label for="dimensions">Dimensions (WxLxH cm):</label>
        <div class="dimension-inputs">
          <input type="number" id="width" v-model="width" />
          <input type="number" id="length" v-model="length" />
          <input type="number" id="height" v-model="height" />
        </div>
      </div>
      <div class="form-group">
        <label for="image">Image URL:</label>
        <input id="image" v-model="image" />
      </div>
      <div class="form-group">
        <label for="price">Price (RP.):</label>
        <input type="number" id="price" v-model="price" />
      </div>
      <div class="form-group">
        <label for="imageFile">Upload Image:</label>
        <input
          type="file"
          id="imageFile"
          @change="handleImageUpload"
          accept="image/*"
        />
      </div>
      <div class="form-actions">
        <button type="button" @click="uploadImage">Upload Image</button>
        <button type="submit">Save Changes</button>
      </div>
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
      uploadedImage: null,
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
          method: "PATCH",
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

        this.$router.push({ name: "home-cms" });
      } catch (error) {
        console.log(error.response.data);
      }
    },

    handleImageUpload(event) {
      this.uploadedImage = event.target.files[0];
    },

    async uploadImage() {
      try {
        this.$swal({
          title: "Uploading...",
          text: "Please wait while the image is being uploaded.",
          icon: "info",
          showConfirmButton: false,
        });

        const formData = new FormData();
        formData.append("img", this.uploadedImage);

        const response = await axios({
          method: "PATCH",
          url: `http://localhost:3000/products/uploud/${this.$route.params.id}`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        this.$swal.close();

        this.$swal({
          title: "Success",
          text: "Image uploaded successfully",
          icon: "success",
        });

        this.image = response.data.image;
      } catch (error) {
        this.$swal.close();

        this.$swal({
          title: "Error",
          text: "Failed to upload the image. Please try again.",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.edit-product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

form {
  max-width: 800px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="number"],
textarea,
button {
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 10px;
}

textarea {
  resize: vertical;
}

.dimension-inputs {
  display: flex;
  gap: 10px;
}

.dimension-inputs input {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
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
