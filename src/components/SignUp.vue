<template>
  <h2>Log-In</h2>
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
      v-model="password1"
      label="Password"
      :type="isPassword1Visible ? 'text' : 'password'"
      lazy-rules
      :rules="[(val) => !!val || 'Campo requerido']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPassword1Visible ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPassword1Visible = !isPassword1Visible"
        />
      </template>
    </q-input>
    <q-input
      filled
      v-model="password2"
      label="Confirm Password"
      :type="isPassword2Visible ? 'text' : 'password'"
      lazy-rules
      :rules="[(val) => !!val || 'Campo requerido']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPassword2Visible ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPassword2Visible = !isPassword2Visible"
        />
      </template>
    </q-input>

    <div class="action">
      <q-btn label="Enviar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { singUp } from 'app/src/utils/services/auth.service';
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
      password1: '',
      password2: '',
      isPassword1Visible: false,
      isPassword2Visible: false,
    };
  },

  methods: {
    onSubmit() {
      singUp(
        {
          username: this.name,
          password1: this.password1,
          password2: this.password2,
        },
        this.router
      );
    },

    onReset() {
      this.name = '';
      this.password1 = '';
      this.password2 = '';
    },
  },
};
</script>

<style>
.container_form {
  display: flex;
  flex-direction: column;
}
.action {
  display: flex;
  justify-content: center;
}
</style>
