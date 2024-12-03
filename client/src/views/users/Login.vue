<script>
  import useUserStore from '../../store/useUserStore';
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'Login',
    setup() {
      const email = ref("");
      const password = ref("");
      const submitting = ref(false);

      const validatedEmail = (value) => String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      const login = async () => {
        if (validatedEmail(email.value)) {
          submitting.value = true;
          const response = await useUserStore.getState().login(email.value, password.value);
          if (response && !response.success) alert(response.message || "can't access you account");
          submitting.value = false;
        } else alert('invalid email address');
      }
      return { email, password, submitting, login }
    }
  });
</script>

<template>
  <div class="layout">
    <div class="container">
      <div class="logo">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
      </div>
      <div class="login-form">
        <div class="form">
          <div class="form-section">
            <label>Username</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required>
          </div>
          <div class="form-section">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
          </div>
          <div class="form-section">
            <button class="btn" @click="login"
              :disabled="submitting || !(email && email.trim() && password && password.trim())">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  height: 100%;
  min-height: 90vh;
  display: grid;
  grid-template-rows: 35% 60%;
  gap: 5%;
}

.container > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  min-width: 250px;
}

.logo img {
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
}

.form {
  gap: 1em;
  display: grid;
  min-width: 250px;
  width: 30%;
}

.form-section {
  display: grid;
}

.form-section:has(.btn) {
  grid-template-columns: 70%;
  justify-content: center;
  align-items: center;
}

input {
  height: 35px;
  border: 1px solid #e7e4e4;
  border-radius: 3px;
  padding: 1em;
}

.btn {
    height: 35px;
    border: none;
    font-weight: 700;
    background-color: #cacccc;
    color: #000000;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;
}

.btn:disabled {
    color: #898f8f;
}


</style>