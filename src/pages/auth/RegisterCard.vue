<template>
  <q-page class="column justify-center">
    <q-card>
      <q-banner class="bg-primary text-white">
        <template v-slot:avatar>
          <q-icon name="menu_book" />
        </template>
        <template v-slot:default>
          <h5 style="margin: 0">Book Of Faces</h5>
        </template>
      </q-banner>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-md">
        <q-input
          filled
          v-model="name"
          label="Your name"
          hint=""
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="email"
          label="Your email"
          hint=""
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) =>
              emailRegEx.test(val) || 'Please type a valid email address',
          ]"
        />

        <q-input
          filled
          v-model="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          label="Your password"
          lazy-rules
          :rules="[]"
        >
          <template #append>
            <q-btn
              @click="isPasswordVisible = !isPasswordVisible"
              :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
              unelevated
              rounded
              dense
            ></q-btn>
          </template>
        </q-input>

        <q-input
          filled
          v-model="coverImgUrl"
          label="Cover Image Link"
          hint=""
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="avatarImgUrl"
          label="Avatar Image Link"
          hint=""
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <Transition>
          <q-card
            flat
            v-if="errorMsg"
            class="row bg-red-7 text-white justify-center q-pa-sm flex-wrap"
          >
            {{ errorMsg }}
          </q-card>
        </Transition>

        <q-separator />
        <div>
          <q-btn
            class="button"
            label="Register"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm button"
          />
          <q-btn
            :to="{ name: RouteNames.login }"
            class="button"
            flat
            text-color="primary"
          >
            Login
          </q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteNames } from 'src/router/routes';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import {emailRegEx} from "src/utils/regex";

const { register } = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const coverImgUrl = ref('');
const avatarImgUrl = ref('');
const errorMsg = ref('');
const isPasswordVisible = ref(false);
const router = useRouter();
const onReset = () => {
  name.value = '';
  email.value = '';
  password.value = '';
  coverImgUrl.value = '';
  avatarImgUrl.value = '';
  errorMsg.value = '';
};

const onSubmit = async () => {
  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
      coverUrl: coverImgUrl.value,
      avatarUrl: avatarImgUrl.value,
    });
    await router.push({ name: RouteNames.home });
    errorMsg.value = '';
  } catch (error: any) {
    console.log(error);
    errorMsg.value = error;
  }
};
</script>

<style scoped>
.button {
  margin: 1vh;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;

  /*transition: transform 2s ease;*/
}
.v-enter-from,
.v-leave-to {
  opacity: 0;

  transform: translateY(-50px);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
