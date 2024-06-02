<template>
  <nav>
    <div class="navbar-container">
      <div class="navbar-content logo">
        <img src="/DKlontong.svg" alt="Logo" />
      </div>
      <button class="navbar-content logout" @click="logout">
        <span>Logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
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
  background: linear-gradient(90deg, #ffbf00, orange);
  padding: 0 20px;
  width: 100%;
  border-left: solid black;
  border-right: solid black;
  border-bottom: solid black;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.navbar-content {
  color: #ffffff;
}

.logo {
  justify-content: flex-start;
}

.logout {
  justify-content: flex-end;
  background-color: #ff0000;
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
