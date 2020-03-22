<template>
  <q-layout>

    <div class="btn-place"></div>

    <q-header class="bg-color-primary q-pa-md">
      <div class="row justify-end btn-place">
        <div class="q-pr-sm">
          <q-btn
            label="Cadastrar"
            flat
          >
          </q-btn>

        </div>
        <div class="q-pr-sm">
          <q-btn
            rounded
            outline
            color=""
            :to="{name: 'login'}"
            class="q-pr-sm"
            label="login"
          >
          </q-btn>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {

    }
  }
}
</script>
