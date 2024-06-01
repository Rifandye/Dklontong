<template>
  <section class="centered-container">
    <div class="login-container">
      <form @submit.prevent="handleSubmitLogin" class="form-container">
        <div class="header">
          <h1>Welcome</h1>
        </div>
        <div class="input-field">
          <div class="input-email">
            <span>Email</span>
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
            />
          </div>
          <div class="input-password">
            <span>Password</span>
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <p class="p">
              Don't have an account? <span class="span">Sign Up</span>
            </p>
          </div>
        </div>
        <div class="button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    <div class="banner-container">
      <img src="/loginbanner.png" alt="Grocery banner" />
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async handleSubmitLogin() {
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/login",
          data: {
            email: this.email,
            password: this.password,
          },
        });
        localStorage.setItem("access_token", response.data.access_token);

        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  text-align: center;
  height: 500px;
  width: 500px;
  display: flex;
  border: solid #ecedec;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #ffffff;
}

.banner-container {
  height: 500px;
  width: 500px;
  text-align: center;
  position: relative;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.banner-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.form-container {
  flex: 1;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.header {
  text-align: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button button {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button button:hover {
  background-color: #252727;
}

.input-field {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.input-email,
.input-password {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
}

input {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
  width: 100%;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .login-container {
    text-align: center;
    height: 400px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #ecedec;
    background-color: #ffffff;
    border-radius: 20px;
  }

  .banner-container {
    display: none;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .login-container {
    width: 70%;
    border-radius: 20px;
  }
  .banner-container {
    display: none;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .login-container {
    width: 60%;
    border-radius: 20px;
  }
  .banner-container {
    display: none;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .login-container {
    width: 50%;
  }
}
</style>
