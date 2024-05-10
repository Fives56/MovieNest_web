<template>
  <h3 class="title">Log-In</h3>
  <q-form @submit.prevent="onSubmit" @reset="onReset" class="container_form">
    <q-input
      filled
      v-model="name"
      label="Name"
      lazy-rules
      :rules="[(val) => !!val || 'Campo requerido']"
    />
    <q-input
      filled
      v-model="password"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      lazy-rules
      :rules="[(val) => !!val || 'Campo requerido']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </q-input>
    <div class="action">
      <q-btn label="Enviar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { logIn } from 'app/src/utils/services/auth.service';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },

  data() {
    return {
      name: '',
      password: '',
      isPasswordVisible: false,
    };
  },
  methods: {
    onSubmit() {
      logIn(
        {
          username: this.name,
          password: this.password,
        },
        this.router
      );
    },

    onReset() {
      name.value = '';
      password.value = '';
      error.value = '';
    },
  },
};
</script>

<style>
.title {
  text-align: center;
  color: #1976d2;
  padding: 15px;
}
.container_form {
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: auto;
}
.action {
  display: flex;
  justify-content: center;
}
</style>
