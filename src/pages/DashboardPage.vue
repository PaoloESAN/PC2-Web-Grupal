<template>
  <q-page class="q-pa-lg bg-slate-50">
    <div class="max-width-container q-mx-auto">
      <div class="row items-center q-mb-xl hero-section q-pa-xl text-white rounded-2xl shadow-6">
        <div class="col-12">
          <h1 class="text-h3 text-weight-bold q-my-none text-shadow flex items-center gap-sm">
            <q-icon name="dashboard" class="q-mr-sm" size="50px" />
            Dashboard General
          </h1>
          <p class="text-subtitle1 q-mt-md q-mb-none opacity-90 font-light">
            Indicadores generales obtenidos a partir de la información de todos los colaboradores.
          </p>
        </div>
      </div>

      <div v-if="loading" class="row justify-center q-py-xl">
        <q-spinner-gears size="60px" color="primary" />
      </div>

      <div v-else class="row q-col-gutter-lg">
        <div class="col-12 col-sm-6 col-md-4" v-for="card in cards" :key="card.label">
          <q-card class="stat-card shadow-2 rounded-xl" :style="card.borderStyle">
            <q-card-section class="row items-center justify-between q-py-md">
              <div>
                <div class="text-grey-6 text-caption text-uppercase text-weight-bold letter-spacing-1">
                  {{ card.label }}
                </div>
                <div class="text-h4 text-weight-bold text-slate-800 q-mt-xs">
                  {{ card.value }}
                </div>
              </div>
              <div class="stat-icon-wrapper rounded-lg q-pa-sm" :class="card.iconBg">
                <q-icon :name="card.icon" size="30px" :color="card.iconColor" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const users = ref([])

const cards = computed(() => [
  {
    label: 'Total Usuarios',
    value: users.value.length,
    icon: 'groups',
    iconBg: 'bg-blue-50',
    iconColor: 'blue-6',
    borderStyle: 'border-left: 5px solid #1976d2'
  },
  {
    label: 'Cantidad de Hombres',
    value: users.value.filter(u => u.gender === 'male').length,
    icon: 'male',
    iconBg: 'bg-blue-50',
    iconColor: 'blue-6',
    borderStyle: 'border-left: 5px solid #1976d2'
  },
  {
    label: 'Cantidad de Mujeres',
    value: users.value.filter(u => u.gender === 'female').length,
    icon: 'female',
    iconBg: 'bg-pink-50',
    iconColor: 'pink-6',
    borderStyle: 'border-left: 5px solid #e91e63'
  },
  {
    label: 'Promedio de Edad',
    value: `${Math.round(users.value.reduce((s, u) => s + u.age, 0) / users.value.length) || 0} años`,
    icon: 'analytics',
    iconBg: 'bg-teal-50',
    iconColor: 'teal-6',
    borderStyle: 'border-left: 5px solid #009688'
  },
  {
    label: 'Empresas Distintas',
    value: new Set(users.value.map(u => u.company?.name).filter(Boolean)).size,
    icon: 'business',
    iconBg: 'bg-orange-50',
    iconColor: 'orange-6',
    borderStyle: 'border-left: 5px solid #ff9800'
  },
  {
    label: 'Ciudades Distintas',
    value: new Set(users.value.map(u => u.address?.city).filter(Boolean)).size,
    icon: 'location_city',
    iconBg: 'bg-purple-50',
    iconColor: 'purple-6',
    borderStyle: 'border-left: 5px solid #9c27b0'
  }
])

async function fetchAllUsers() {
  loading.value = true
  try {
    const response = await fetch('https://dummyjson.com/users?limit=250')
    if (response.ok) {
      const data = await response.json()
      users.value = data.users
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAllUsers)
</script>

<style lang="scss" scoped>
.max-width-container {
  max-width: 1300px;
}

.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0284c7 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.3), 0 8px 10px -6px rgba(2, 132, 199, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.stat-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.15);
  }
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.gap-sm {
  gap: 12px;
}
</style>
