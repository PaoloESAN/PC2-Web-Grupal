<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-slate-900 text-white">
      <q-toolbar>
        <q-btn flat round icon="business" class="q-mr-sm" />
        <q-toolbar-title class="text-weight-bold"> Portal Corporativo </q-toolbar-title>

        <div class="row q-gutter-xs">
          <q-btn
            flat
            :to="{ path: '/' }"
            icon="contacts"
            label="Directorio"
            no-caps
            class="text-weight-medium"
            :color="$route.path === '/' ? 'teal-4' : 'white'"
            :text-color="$route.path === '/' ? 'teal-4' : 'white'"
          />
          <q-btn
            flat
            :to="{ path: '/comparativa' }"
            icon="compare_arrows"
            label="Comparativa"
            no-caps
            class="text-weight-medium"
            :color="$route.path === '/comparativa' ? 'teal-4' : 'white'"
            :text-color="$route.path === '/comparativa' ? 'teal-4' : 'white'"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineOptions({
  name: 'MainLayout',
})

const $route = useRoute()
</script>
