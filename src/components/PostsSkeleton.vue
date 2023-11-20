<template>
  <q-card
    :key="n"
    v-for="n in [1, 2]"
    class="column card-container justify-center q-ma-md"
  >
    <q-list>
      <q-item clickable v-ripple>
        <q-item-section side>
          <q-skeleton type="circle" size="64px" />
        </q-item-section>
        <q-item-section>
          <q-skeleton width="100px" class="q-mb-sm" />
          <q-item-label caption>
            <q-skeleton width="70px" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-skeleton height="50px" width="100%" />
      </q-item>
      <q-item class="row justify-between">
        <q-skeleton width="100px" />

        <q-skeleton width="100px" />
      </q-item>
      <q-separator />

      <q-item class="row justify-between">
        <q-skeleton width="100px" />
        <q-skeleton width="100px" />
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts"></script>
<style scoped>
.card-container {
  width: 90vh;
}
</style>
