<template>
  <nav>
    <div class="navbar-container">
      <div class="navbar-content logo">
        <span>Logo</span>
      </div>
      <button class="navbar-content logout" @click="logout">
        <span>Logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #ffac1c;
  padding: 0 20px;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.navbar-content {
  color: #ffffff;
}

.logo {
  justify-content: flex-start;
}

.logout {
  justify-content: flex-end;
  background-color: red;
  height: 45px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
