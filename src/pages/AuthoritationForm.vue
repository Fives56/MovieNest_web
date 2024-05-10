<template>
  <div class="container">
    <div class="img_container">
      <img src="src\assets\Bird.svg" alt="imagen" />
    </div>
    <div class="auth_container">
      <div class="login" v-if="showLogin">
        <LogIn />
        <q-btn label="You don't have an account?" @click="showLogin = false" />
      </div>
      <div class="singup" v-else>
        <SignUp />
        <q-btn
          label="You have an account?"
          @click="showLogin = true"
          class="btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import LogIn from 'components/LogIn.vue';
import SignUp from 'components/SignUp.vue';

export default {
  components: {
    LogIn,
    SignUp,
  },
  setup() {
    const showLogin = ref(true);

    return {
      showLogin,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100vh; /* Ajusta la altura al 100% del viewport */
  background-color: #6ab0f587;
  overflow: hidden;
}

.img_container {
  flex: 2;
}

img {
  max-width: 900px;
  width: 100%;
  height: auto;
}

.auth_container {
  flex: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  background-color: #daedfbfa;
  border-left: 2px outset #042849;
}

.login,
.singup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
}

@media (max-width: 890px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Ajusta la altura al 100% del viewport */
    background-color: #6ab0f587;
    overflow: hidden;
  }

  .img_container {
    flex: 1;
  }

  img {
    flex: 1;
    width: 100%;
    height: auto;
  }

  .auth_container {
    flex: 2;
  }

  .login,
  .singup {
    gap: 10px;
    margin-bottom: 80px;
  }
}
</style>
