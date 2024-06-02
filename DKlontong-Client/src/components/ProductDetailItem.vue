<template>
  <section class="product-detail">
    <div class="product-card">
      <div class="product-image">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-category">{{ product.categoryName }}</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-specs">
          <div class="spec">
            <span class="label">SKU:</span>
            <span class="value">{{ product.sku }}</span>
          </div>
          <div class="spec">
            <span class="label">Weight:</span>
            <span class="value">{{ product.weight }} g</span>
          </div>
          <div class="spec">
            <span class="label">Dimensions:</span>
            <span class="value"
              >{{ product.width }}x{{ product.length }}x{{
                product.height
              }}
              cm</span
            >
          </div>
          <div class="spec">
            <span class="label">Price:</span>
            <span class="value">{{ formatPrice(product.price) }}</span>
          </div>
          <div class="product-buttons">
            <button class="edit-button">Edit</button>
            <button class="delete-button" @click="deleteProduct(product._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {},
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

        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product:", error.response.data);
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

        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error.response.data);
      }
    },

    formatPrice(price) {
      // Assuming price is in cents
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
.product-detail {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.product-card {
  display: flex;
  max-width: 800px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  flex: 1;
}

.product-image img {
  width: 100%;
  border-radius: 10px 0 0 10px;
}

.product-info {
  flex: 1;
  padding: 20px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-category {
  font-size: 18px;
  color: #666;
}

.product-description {
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
}

.product-specs {
  display: flex;
  flex-wrap: wrap;
}

.spec {
  margin-right: 20px;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
}

.product-buttons {
  margin-top: 20px;
}

.edit-button,
.delete-button {
  background-color: black;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: darkblue;
}

.delete-button:hover {
  background-color: darkred;
}
</style>
