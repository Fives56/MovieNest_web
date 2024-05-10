<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="!isLogin"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> MovieNest </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      below
      bordered
      :mini="!isExpanded"
      :overlay="isExpanded"
      @mouseover="isExpanded = true"
      @mouseleave="isExpanded = false"
    >
      <q-list>
        <div class="header">
          <div :class="{ icon_img: !isExpanded, expanded_img: isExpanded }">
            <img src="src\assets\Bird.svg" alt="Bird" />
          </div>
          <q-item-label header> Main Navigation</q-item-label>
        </div>

        <!-- User details -->
        <q-item @click="openModal" clickable>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section>
            <q-item-label>User Details</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Serch genre -->
        <q-item v-if="!isExpanded">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
        </q-item>

        <div class="genre_container" v-if="isExpanded">
          <q-expansion-item
            :class="{ open: isOpen && isExpanded, close: !isOpen }"
            expand-separator
            icon="search"
            label="Genres"
            caption="More options"
            @click="toggleOpend()"
          >
            <q-item
              clickable
              v-ripple
              v-for="genre in colors"
              :key="genre.name"
              :name="genre.name"
              @click="
                $router.push({ name: 'feed', params: { genre: genre.name } })
              "
            >
              <q-item-section>{{ genre.name }}</q-item-section>
            </q-item>
          </q-expansion-item>
        </div>

        <!-- Log out -->
        <q-item @click="exit()" clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Log Out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showModal">
    <q-card style="width: max-content; max-width: 80vw">
      <q-card-section class="bg-primary text-white">
        <div class="header_modal">
          Hello
          <strong>{{ user.first_name || user.username }}</strong>
        </div>
      </q-card-section>
      <q-card-section class="inputs_container">
        <div class="inputs">
          <q-input v-model="user.first_name" label="First name" />
          <q-input v-model="user.last_name" label="Last Name" />
        </div>
        <div>
          <q-input v-model="user.email" label="E-mail" />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Edit"
          color="primary"
          @click="
            editUser({
              first_name: user.first_name,
              email: user.email,
              last_name: user.last_name,
              username: user.username,
            })
          "
        />
        <q-btn label="Close" color="primary" @click="showModal = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { colors } from '../utils/constants/genre.color.constant';
import {
  userDetails,
  updateUser,
  logout,
} from 'app/src/utils/services/auth.service';
import { useRoute, useRouter } from 'vue-router';
import { showError } from 'app/src/utils/services/handlerError.service';

defineOptions({
  name: 'MainLayout',
});

const isOpen = ref(false);
const isExpanded = ref(false);
const leftDrawerOpen = ref(false);
const route = useRoute();
const router = useRouter();
const isLogin = ref(false);
const showModal = ref(false);
const user = ref();

watch(isExpanded, (newVal) => {
  if (!newVal) {
    isOpen.value = false;
  }
});

const checkRoute = () => {
  if (route.name === 'login') {
    isLogin.value = true;
  } else {
    isLogin.value = false;
    leftDrawerOpen.value = true;
  }
};

onMounted(checkRoute);
watch(() => route.path, checkRoute);

async function openModal() {
  user.value = await userDetails();
  showModal.value = true;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function editUser(data: any) {
  const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (pattern.test(data.email) || data.email == '') {
    await updateUser(data);
  } else {
    showError('the email is incorrect');
  }
}
async function exit() {
  await logout(router);
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function toggleOpend() {
  isOpen.value = !isOpen.value;
}
</script>

<style>
.openDrawer {
  width: 300px !important;
  transition: width 0.3s ease-in-out;
}
.header_container {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
}
.icon_img {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: 5px;
  height: 44px;
  width: 44px;
}
.expanded_img {
  display: flex;
  justify-content: center;
  height: 200px;
  width: 100%;
}
.genre_container {
  max-height: 300px;
}

.close {
  height: 65px;
}
.open {
  height: 300px;
  overflow-y: auto;
}
.header_modal {
  display: flex;
  justify-content: end;
  gap: 5px;
}
.inputs_container {
  display: flex;
  flex-direction: column;
}
.inputs {
  display: flex;
  width: max-content;
  gap: 30px;
}
</style>
