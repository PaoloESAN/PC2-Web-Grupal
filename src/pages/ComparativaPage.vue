<template>
  <q-page class="q-pa-lg bg-slate-50">
    <div class="max-width-container q-mx-auto">
      <div
        class="row items-center justify-between q-mb-xl hero-section q-pa-xl text-white rounded-2xl shadow-6"
      >
        <div class="col-12 col-md-8">
          <h1 class="text-h3 text-weight-bold q-my-none text-shadow flex items-center gap-sm">
            <q-icon name="compare_arrows" class="q-mr-sm" size="50px" />
            Comparativa de Colaboradores
          </h1>
          <p class="text-subtitle1 q-mt-md q-mb-none opacity-90 font-light">
            Seleccione dos colaboradores para comparar sus datos personales, laborales y físicos de
            forma detallada.
          </p>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12 col-md-6">
          <q-card class="selector-card shadow-3 rounded-xl">
            <q-card-section class="bg-teal-700 text-white q-pa-md rounded-t-xl">
              <div class="text-h6 text-weight-bold flex items-center">
                <q-icon name="person" class="q-mr-sm" />
                Colaborador A
                <q-chip
                  v-if="user1"
                  size="sm"
                  color="white"
                  text-color="teal-700"
                  class="q-ml-sm text-weight-bold"
                >
                  #{{ user1.id }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <q-input
                v-model="search1"
                outlined
                dense
                placeholder="Buscar por nombre, cargo o empresa..."
                class="search-input"
                color="teal-7"
                bg-color="white"
                :loading="searching1"
                debounce="400"
                @update:model-value="(val) => onSearch(val, 1)"
              >
                <template v-slot:append>
                  <q-icon
                    v-if="search1"
                    name="clear"
                    class="cursor-pointer"
                    @click="clearUser(1)"
                  />
                  <q-icon name="search" color="teal-7" />
                </template>
              </q-input>

              <q-list
                v-if="results1.length > 0 && !user1"
                bordered
                separator
                class="q-mt-sm search-results rounded-lg"
              >
                <q-item
                  v-for="u in results1"
                  :key="u.id"
                  clickable
                  v-close-popup
                  class="search-result-item"
                  @click="selectUser(u, 1)"
                >
                  <q-item-section avatar>
                    <q-avatar size="36px">
                      <img :src="u.image" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >{{ u.firstName }} {{ u.lastName }}</q-item-label
                    >
                    <q-item-label caption class="text-grey-6"
                      >{{ u.company?.title }} — {{ u.company?.name }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-chip
                      size="sm"
                      :color="u.gender === 'female' ? 'pink-4' : 'blue-4'"
                      text-color="white"
                    >
                      {{ u.gender === 'female' ? 'F' : 'M' }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </q-list>

              <div v-if="user1Loading" class="q-mt-md text-center">
                <q-spinner-dots color="teal-7" size="30px" />
                <div class="text-caption text-grey-6 q-mt-xs">Cargando datos...</div>
              </div>

              <div
                v-if="user1"
                class="q-mt-md selected-user-card rounded-lg bg-teal-50 border-teal-200 q-pa-md"
              >
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-auto">
                    <q-avatar size="56px" class="shadow-2">
                      <img :src="user1.image" />
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-weight-bold text-teal-900 text-subtitle1">
                      {{ user1.firstName }} {{ user1.lastName }}
                    </div>
                    <div class="text-caption text-teal-700">@{{ user1.username }}</div>
                  </div>
                  <div class="col-auto">
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      color="teal-7"
                      size="sm"
                      @click="clearUser(1)"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="selector-card shadow-3 rounded-xl">
            <q-card-section class="bg-indigo-700 text-white q-pa-md rounded-t-xl">
              <div class="text-h6 text-weight-bold flex items-center">
                <q-icon name="person" class="q-mr-sm" />
                Colaborador B
                <q-chip
                  v-if="user2"
                  size="sm"
                  color="white"
                  text-color="indigo-700"
                  class="q-ml-sm text-weight-bold"
                >
                  #{{ user2.id }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <q-input
                v-model="search2"
                outlined
                dense
                placeholder="Buscar por nombre, cargo o empresa..."
                class="search-input"
                color="indigo-7"
                bg-color="white"
                :loading="searching2"
                debounce="400"
                @update:model-value="(val) => onSearch(val, 2)"
              >
                <template v-slot:append>
                  <q-icon
                    v-if="search2"
                    name="clear"
                    class="cursor-pointer"
                    @click="clearUser(2)"
                  />
                  <q-icon name="search" color="indigo-7" />
                </template>
              </q-input>

              <q-list
                v-if="results2.length > 0 && !user2"
                bordered
                separator
                class="q-mt-sm search-results rounded-lg"
              >
                <q-item
                  v-for="u in results2"
                  :key="u.id"
                  clickable
                  v-close-popup
                  class="search-result-item"
                  @click="selectUser(u, 2)"
                >
                  <q-item-section avatar>
                    <q-avatar size="36px">
                      <img :src="u.image" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >{{ u.firstName }} {{ u.lastName }}</q-item-label
                    >
                    <q-item-label caption class="text-grey-6"
                      >{{ u.company?.title }} — {{ u.company?.name }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-chip
                      size="sm"
                      :color="u.gender === 'female' ? 'pink-4' : 'blue-4'"
                      text-color="white"
                    >
                      {{ u.gender === 'female' ? 'F' : 'M' }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </q-list>

              <div v-if="user2Loading" class="q-mt-md text-center">
                <q-spinner-dots color="indigo-7" size="30px" />
                <div class="text-caption text-grey-6 q-mt-xs">Cargando datos...</div>
              </div>

              <div
                v-if="user2"
                class="q-mt-md selected-user-card rounded-lg bg-indigo-50 border-indigo-200 q-pa-md"
              >
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-auto">
                    <q-avatar size="56px" class="shadow-2">
                      <img :src="user2.image" />
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-weight-bold text-indigo-900 text-subtitle1">
                      {{ user2.firstName }} {{ user2.lastName }}
                    </div>
                    <div class="text-caption text-indigo-700">@{{ user2.username }}</div>
                  </div>
                  <div class="col-auto">
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      color="indigo-7"
                      size="sm"
                      @click="clearUser(2)"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-slide-transition>
        <div v-if="user1 && user2">
          <q-card class="comparison-card shadow-4 rounded-2xl overflow-hidden q-mb-lg">
            <q-card-section class="bg-white q-pa-lg">
              <div class="text-h6 text-weight-bold text-slate-800 flex items-center">
                <q-icon name="table_chart" class="q-mr-sm" color="primary" />
                Tabla Comparativa
              </div>
            </q-card-section>

            <q-separator />

            <q-table
              :rows="comparisonRows"
              :columns="comparisonColumns"
              row-key="label"
              flat
              square
              hide-pagination
              hide-bottom
              class="comparison-table"
              :rows-per-page-options="[0]"
            >
              <template v-slot:body-cell-label="props">
                <q-td :props="props" class="text-weight-bold text-slate-700 label-cell">
                  <q-icon :name="props.row.icon" class="q-mr-sm" color="primary" size="18px" />
                  {{ props.row.label }}
                </q-td>
              </template>

              <template v-slot:body-cell-user1="props">
                <q-td :props="props" class="user1-cell">
                  <span class="text-weight-medium">{{ props.row.user1 }}</span>
                </q-td>
              </template>

              <template v-slot:body-cell-user2="props">
                <q-td :props="props" class="user2-cell">
                  <span class="text-weight-medium">{{ props.row.user2 }}</span>
                </q-td>
              </template>

              <template v-slot:body-cell-match="props">
                <q-td :props="props" class="text-center match-cell">
                  <q-icon
                    v-if="props.row.match === true"
                    name="check_circle"
                    color="green-6"
                    size="22px"
                  >
                    <q-tooltip>Coinciden</q-tooltip>
                  </q-icon>
                  <q-icon
                    v-else-if="props.row.match === false"
                    name="cancel"
                    color="red-4"
                    size="22px"
                  >
                    <q-tooltip>Difieren</q-tooltip>
                  </q-icon>
                  <span v-else class="text-grey-4 text-caption">—</span>
                </q-td>
              </template>
            </q-table>
          </q-card>

          <div class="text-center q-mb-lg">
            <q-btn
              color="negative"
              outline
              icon="refresh"
              label="Nueva Comparativa"
              no-caps
              class="text-weight-bold q-px-lg"
              @click="resetAll"
            />
          </div>
        </div>
      </q-slide-transition>

      <div v-if="!user1 || !user2" class="text-center text-grey-5 q-py-xl">
        <q-icon name="compare_arrows" size="80px" class="q-mb-md block" />
        <div class="text-h6 text-weight-medium">Seleccione dos colaboradores para compararlos</div>
        <div class="text-subtitle2">
          Use los buscadores de arriba para encontrar y elegir cada colaborador
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const search1 = ref('')
const search2 = ref('')
const results1 = ref([])
const results2 = ref([])
const searching1 = ref(false)
const searching2 = ref(false)
const user1 = ref(null)
const user2 = ref(null)
const user1Loading = ref(false)
const user2Loading = ref(false)

let searchTimeout1 = null
let searchTimeout2 = null

function slotState(slot) {
  return slot === 1
    ? {
        search: search1,
        results: results1,
        searching: searching1,
        user: user1,
        userLoading: user1Loading,
        searchTimeout: 'searchTimeout1',
      }
    : {
        search: search2,
        results: results2,
        searching: searching2,
        user: user2,
        userLoading: user2Loading,
        searchTimeout: 'searchTimeout2',
      }
}

function onSearch(val, slot) {
  const s = slotState(slot)

  if (!val || val.trim().length < 2) {
    s.results.value = []
    return
  }

  if (slot === 1 && searchTimeout1) clearTimeout(searchTimeout1)
  if (slot === 2 && searchTimeout2) clearTimeout(searchTimeout2)

  const newTimeout = setTimeout(async () => {
    s.searching.value = true
    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${encodeURIComponent(val)}&limit=6`,
      )
      if (response.ok) {
        const data = await response.json()
        s.results.value = data.users
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      s.searching.value = false
    }
  }, 400)

  if (slot === 1) searchTimeout1 = newTimeout
  else searchTimeout2 = newTimeout
}

async function selectUser(user, slot) {
  const s = slotState(slot)

  s.results.value = []
  s.search.value = `${user.firstName} ${user.lastName}`

  s.userLoading.value = true
  try {
    const response = await fetch(`https://dummyjson.com/users/${user.id}`)
    if (response.ok) {
      const data = await response.json()
      s.user.value = data
    } else {
      throw new Error('Error fetching user details')
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    $q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: 'No se pudo cargar la información del colaborador.',
      icon: 'report_problem',
    })
  } finally {
    s.userLoading.value = false
  }
}

function clearUser(slot) {
  const s = slotState(slot)
  s.user.value = null
  s.search.value = ''
  s.results.value = []
}

function resetAll() {
  clearUser(1)
  clearUser(2)
}

function getVal(obj, path, fallback = '—') {
  const keys = path.split('.')
  let result = obj
  for (const key of keys) {
    if (result == null) return fallback
    result = result[key]
  }
  return result != null ? result : fallback
}

function translateGender(g) {
  if (g === 'female') return 'Femenino'
  if (g === 'male') return 'Masculino'
  return g || '—'
}

const comparisonColumns = [
  { name: 'label', label: 'Campo', field: 'label', align: 'left', style: 'width: 200px' },
  { name: 'user1', label: 'Colaborador A', field: 'user1', align: 'center' },
  { name: 'user2', label: 'Colaborador B', field: 'user2', align: 'center' },
  { name: 'match', label: '¿Coinciden?', field: 'match', align: 'center', style: 'width: 120px' },
]

const comparisonRows = computed(() => {
  const u1 = user1.value
  const u2 = user2.value
  if (!u1 || !u2) return []

  const fields = [
    {
      label: 'Nombre Completo',
      icon: 'badge',
      val: () => `${u1.firstName} ${u1.lastName}`,
      val2: () => `${u2.firstName} ${u2.lastName}`,
    },
    { label: 'Edad', icon: 'cake', val: () => `${u1.age} años`, val2: () => `${u2.age} años` },
    {
      label: 'Género',
      icon: 'wc',
      val: () => translateGender(u1.gender),
      val2: () => translateGender(u2.gender),
    },
    {
      label: 'Empresa',
      icon: 'business',
      val: () => getVal(u1, 'company.name'),
      val2: () => getVal(u2, 'company.name'),
    },
    {
      label: 'Cargo',
      icon: 'badge',
      val: () => getVal(u1, 'company.title'),
      val2: () => getVal(u2, 'company.title'),
    },
    {
      label: 'Universidad',
      icon: 'school',
      val: () => u1.university || '—',
      val2: () => u2.university || '—',
    },
    {
      label: 'Ciudad',
      icon: 'location_city',
      val: () => getVal(u1, 'address.city'),
      val2: () => getVal(u2, 'address.city'),
    },
    {
      label: 'País',
      icon: 'flag',
      val: () => getVal(u1, 'address.country'),
      val2: () => getVal(u2, 'address.country'),
    },
    {
      label: 'Altura',
      icon: 'straighten',
      val: () => `${u1.height} cm`,
      val2: () => `${u2.height} cm`,
    },
    {
      label: 'Peso',
      icon: 'monitor_weight',
      val: () => `${u1.weight} kg`,
      val2: () => `${u2.weight} kg`,
    },
    {
      label: 'Grupo Sanguíneo',
      icon: 'bloodtype',
      val: () => u1.bloodGroup || '—',
      val2: () => u2.bloodGroup || '—',
    },
  ]

  return fields.map((f) => {
    const v1 = f.val()
    const v2 = f.val2()
    const normalized1 = v1.replace(' años', '').replace(' cm', '').replace(' kg', '').trim()
    const normalized2 = v2.replace(' años', '').replace(' cm', '').replace(' kg', '').trim()
    const match = normalized1 === normalized2 ? true : false

    return {
      label: f.label,
      icon: f.icon,
      user1: v1,
      user2: v2,
      match,
    }
  })
})
</script>

<style lang="scss" scoped>
.max-width-container {
  max-width: 1300px;
}

.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f766e 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 10px 25px -5px rgba(15, 118, 110, 0.3),
    0 8px 10px -6px rgba(15, 118, 110, 0.3);

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

.gap-sm {
  gap: 12px;
}

.selector-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.12);
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 10px;
  }
}

.search-results {
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
}

.search-result-item {
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f1f5f9;
  }
}

.selected-user-card {
  border: 1px solid;

  .bg-teal-50 & {
    border-color: #b2dfdb;
  }

  .bg-indigo-50 & {
    border-color: #c5cae9;
  }
}

.comparison-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background-color: white;
}

.comparison-table {
  :deep(thead tr th) {
    font-weight: 700;
    color: #475569;
    background-color: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
    padding: 16px;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  :deep(tbody tr) {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8fafc;
    }
  }

  :deep(tbody td) {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
  }

  .label-cell {
    font-size: 0.95rem;
  }

  .user1-cell {
    color: #0d9488;
    font-size: 0.95rem;
  }

  .user2-cell {
    color: #4338ca;
    font-size: 0.95rem;
  }

  .match-cell {
    font-size: 0.85rem;
  }
}

.block {
  display: block;
}

.rounded-t-xl {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
